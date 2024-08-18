const mongoose = require("mongoose");

const investSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  { timestamps: true }
);

const Invest = mongoose.model("Invest", investSchema);
module.exports = Invest;
