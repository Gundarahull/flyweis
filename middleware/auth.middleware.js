const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const isAuthenticate = async (req, res, next) => {
  try {
    if (typeof req.headers.authorization !== "undefined") {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log("decoded>>>>>", decoded);

      const user = await UserModel.findById(decoded.userId);
      if (user) {
        console.log("user in the middleware", user);
        req.tokenData = user;
        next();
      } else {
        return res.status(404).json({
          status: false,
          message: "User not found",
          code: "USER_NOT_FOUND",
        });
      }
    } else {
      return res.status(403).json({
        status: false,
        message: "User unauthorized to access",
        code: "UN_AUTHORIZED",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = isAuthenticate;
