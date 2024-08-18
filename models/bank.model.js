const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema(
  {
    AccountHolderName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    IFSCcode: {
      type: String,
      required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
    },

  },
  { timestamps: true }
);
const Bank = mongoose.model("Bank", bankSchema);
module.exports = Bank;
