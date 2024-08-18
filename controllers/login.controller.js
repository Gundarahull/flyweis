const generateOTP = require("../functions/generateOtp.function");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const accountSID = process.env.accountSID;
const authToken = process.env.authToken;

const client = require("twilio")(accountSID, authToken);

const login = async (req, res) => {
  const { mobileNumber, deviceId } = req.body;
  try {
    const otp = generateOTP(6);
    const expiry = new Date(new Date().getTime() + 10 * 60 * 1000); //10 represnts 10 minutes of time for expiry

    console.log("expirty time>>>>", expiry);

    const loginParams = {
      otp: otp,
      expiryTime: expiry,
      deviceId: deviceId,
      mobileNumber: mobileNumber,
    };
    const newUser = await UserModel.create(loginParams);

    let msgOptions = {
      //the number at trial version
      from: process.env.trailNumber,
      to: mobileNumber, //its a free trial version the otp goes to verified persons only!
      body: otp,
    };
    const message = await client.messages.create(msgOptions);
    return res.status(200).json({
      status: true,
      message: `OTP sent successfully to ${mobileNumber}`,
      result: newUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
      error: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  const { mobileNumber, deviceId, otp } = req.body;
  try {
    const checkOtp = await UserModel.findOne({
      $and: [{ mobileNumber: mobileNumber }, { deviceId: deviceId }],
    }).sort({ createdAt: -1 });
    console.log("db otp>>>>>", checkOtp.otp);

    if (otp !== checkOtp.otp) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
        results: [],
      });
    }
    const now = new Date();
    if (checkOtp.expiryTime <= now) {
      return res.status(400).json({
        status: false,
        message: "OTP expired",
        results: [],
      });
    }
    // Update the user document with the verified status
    const otpVerificationUpdate = await UserModel.findOneAndUpdate(
      {
        $and: [{ mobileNumber: mobileNumber }, { deviceId: deviceId }],
      },
      {
        $set: { isOtpVerified: true, isSignedIn: true },
      },
      {
        new: true, // Return the updated document
      }
    );
    const token = jwt.sign(
      {
        userId: otpVerificationUpdate._id,
        mobileNumber: otpVerificationUpdate.mobileNumber,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      status: true,
      message: "OTP verified successfully",
      token: token,
      results: otpVerificationUpdate,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  verifyOtp,
};
