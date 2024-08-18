const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      unique: false,
    },
    otp: {
      type: String,
      required: true,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    expiryTime: {
      type: Date,
    },
    deviceId: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    aadharNumber: {
      type: String,
      default: "",
    },
    panNumber: {
      type: String,
      default: "",
    },
    permantAddress: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    occuputaion: {
      type: String,
      default: "",
    },
    isSignedIn:{
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
