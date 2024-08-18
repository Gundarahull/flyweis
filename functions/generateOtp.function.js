const crypto = require("crypto");

const generateOTP = (length) => {
  const otp = crypto
    .randomInt(0, Math.pow(10, length)) //getting random integer upto 1,given powered number normally we give 6 digits OTp so 0-100000
    .toString()
    .padStart(length, "0");
  return otp;
};

module.exports=generateOTP

