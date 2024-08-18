const express = require("express");
const isAuthenticate = require("../middleware/auth.middleware");
const {
  updateUser,
  updateImage,
  showeKYC,
  updateEkyc,
  addBank,
  addNominee,
  termsAndConditions,
  signOut,
} = require("../controllers/account.controller");

const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload=multer({storage:storage})

router.post("/updateUsername", isAuthenticate, updateUser);
router.post("/updateImage", isAuthenticate,upload.single("file"), updateImage);

//ekyc
router.post('/ekyc',isAuthenticate,showeKYC)
router.put('/updatekyc',isAuthenticate,updateEkyc)

//bank
router.post('/bank',isAuthenticate,addBank)

//nominne
router.post('/nominne',isAuthenticate,addNominee)

//terms and conditions
router.post('/terms',isAuthenticate,termsAndConditions)

//signout
router.post('/signout',isAuthenticate,signOut)

module.exports = router;
