const Bank = require("../models/bank.model");
const Nominee = require("../models/nominee.model");
const UserModel = require("../models/user.model");
const uploadOnCloudinary = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const Terms = require("../models/terms.model");

const updateUser = async (req, res) => {
  const { fullName } = req.body;

  //LINK:https://docs.google.com/document/d/1QxcPXw9weIsayYNcr46_sKHSYB0eH07lpQDgwBSbzwI/edit#heading=h.6jynaot9cbnq

  try {
    // // const userCheck = await UserModel.findById(req.tokenData._id);
    // // if (userCheck && userCheck.isSignedIn) {
    // //   const updatedUser = await UserModel.(
    // //     req.tokenData._id,
    // //     { $set: { fullname: fullName } },
    // //     { new: true }
    // //   );
    //   return res.status(200).json({
    //     status: true,
    //     message: "User updated successfully",
    //     results: updatedUser,
    //   });
    // }

    // if (!userCheck || !userCheck.isSignedIn) {
    //   return res.status(404).json({
    //     status: false,
    //     message: "User not found ot not SignedIn",
    //   });
    // }
    const One=await UserModel.findOne({_id:req.tokenData._id})
    const userCheck = await UserModel.findOneAndUpdate(
      { _id: req.tokenData._id, isSignedIn: true },
      { $set: { fullname: fullName } }
    );
    return res.status(200).json({
      status: true,
      message: "User updated successfully",
      results: One,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const updateImage = async (req, res) => {
  const path = req.file.path;
  try {
    const imageUrl = await uploadOnCloudinary(path);
    console.log("Response from clodinary", imageUrl.url);
    const uploadImage = await UserModel.findOneAndUpdate(
      { _id: req.tokenData._id, isSigned: true },
      {
        $set: { image: imageUrl.url },
      },
      { new: true }
    );
    return res.status(200).json({
      status: true,
      message: "Image uploaded successfully",
      results: uploadImage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const showeKYC = async (req, res) => {
  try {
    const user = await UserModel.findById(req.tokenData._id);
    console.log("user>>>", user);

    if (!user || !user.isSignedIn) {
      return res.status(404).json({
        status: false,
        message: "User not found or Not SignedIN",
        results: [],
      });
    }
    return res.status(200).json({
      status: true,
      message: "KYC details found",
      results: {
        aadharNumber: user.aadharNumber,
        panNumber: user.panNumber,
        permantAddress: user.permantAddress,
        dob: user.dob,
        gender: user.gender,
        occuputaion: user.occuputaion,
        mobileNumber: user.mobileNumber,
        fullname: user.fullname,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const updateEkyc = async (req, res) => {
  const { aadharNumber, panNumber, permantAddress, dob, gender, occuputaion } =
    req.body;
  try {
    const userId = String(req.tokenData._id);
    console.log("converted string");
    const userCheck = await UserModel.findByIdAndUpdate(userId);
    if (userCheck && userCheck.isSignedIn) {
      const user = await UserModel.findByIdAndUpdate(
        {
          _id: req.tokenData._id.toString(),
          isSigned: true,
        },
        {
          $set: {
            aadharNumber: aadharNumber,
            panNumber: panNumber,
            permantAddress: permantAddress,
            dob: dob,
            gender: gender,
            occuputaion: occuputaion,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        status: true,
        message: "EKYC details updated",
        results: user,
      });
    }

    return res.status(404).json({
      status: false,
      message: "User not found",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//manage Bank we can do CRUD operations here but i am just using Create
const addBank = async (req, res) => {
  const { AccountHolderName, accountNumber, IFSCcode } = req.body;
  try {
    if (!AccountHolderName || !accountNumber || !IFSCcode) {
      return res.status(400).json({
        status: false,
        message: "Please fill all the fields",
        results: "Enter required Fields",
      });
    }
    const addBank = await Bank.create({
      AccountHolderName: AccountHolderName,
      accountNumber: accountNumber,
      IFSCcode: IFSCcode,
      userId: req.tokenData._id,
    });
    return res.status(200).json({
      status: true,
      message: "Bank Added Successfully!",
      results: addBank,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//manage Nominne we can do CRUD operations here but i am just using Create
const addNominee = async (req, res) => {
  const { name, email, phoneNumber, releation, aadharNumber } = req.body;
  try {
    if (!name || !email || !phoneNumber || !releation || !aadharNumber) {
      return res.status(400).json({
        status: false,
        message: "Please fill all the fields",
        results: "Enter required Fields",
      });
    }
    const nominee = await Nominee.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      releation: releation,
      aadharNumber: aadharNumber,
      userId: req.tokenData._id,
    });
    return res.status(200).json({
      status: true,
      message: "Nominee Added Successfully!",
      results: nominee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const signOut = async (req, res) => {
  try {
    const singOut = await UserModel.findByIdAndUpdate(req.tokenData._id, {
      $set: { isSignedIn: false },
    });
    return res.status(200).json({
      status: true,
      message: "Sign out successfully",
      results: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//Basically the termns and conditions will be in the hands of the SuperAdmin
const termsAndConditions = async (req, res) => {
  try {
    const sample_01 = path.join(
      __dirname,
      "../public/terms_and_conditions/sample_01.txt"
    );
    const sample_02 = path.join(
      __dirname,
      "../public/terms_and_conditions/sample_02.txt"
    );
    const sample_03 = path.join(
      __dirname,
      "../public/terms_and_conditions/sample_03.txt"
    );
    const dataInSample = fs.readFileSync(sample_01, "utf-8").trim();
    const dataInSample02 = fs.readFileSync(sample_02, "utf-8").trim();
    const dataInSample03 = fs.readFileSync(sample_03, "utf-8").trim();
    const terms = await Terms.create({
      term_01: dataInSample,
      term_02: dataInSample02,
      term_03: dataInSample03,
    });
    return res.status(200).json({
      status: true,
      message: "Terms and Conditions",
      results: terms,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  updateUser,
  updateImage,
  showeKYC,
  updateEkyc,
  addBank,
  addNominee,
  signOut,
  termsAndConditions,
};
