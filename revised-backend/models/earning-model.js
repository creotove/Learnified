const mongoose = require("mongoose");
const earningSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    earnedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    earnedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
  },
  {
    timestamps: true,
  }
);
const EarningModel = mongoose.model("Earning", earningSchema);
module.exports = EarningModel;
