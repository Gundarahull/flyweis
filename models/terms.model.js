const mongoose = require("mongoose");

const termSchema = new mongoose.Schema(
  {
    term_01: { type: String, required: true },
    term_02: { type:String , required: true },
    term_03: { type:String , required: true },
  },
  { timestamps: true }
);

const Terms = mongoose.model("Terms", termSchema);
module.exports=Terms
