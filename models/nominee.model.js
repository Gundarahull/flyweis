const mongoose = require("mongoose");

const nomineeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    releation: {
      type: String,
      enum: ["Father", "Mother", "Brother", "Sister", "Husband", "Wife"],
      required: true,
    },
    aadharNumber: {
      type: String,
      required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
  },
  { timestamps: true }
);

const Nominee=mongoose.model('Nominee',nomineeSchema)
module.exports = Nominee;