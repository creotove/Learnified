const mongoose = require("mongoose");

const walletDetailsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    accountNumber: {
      type: String,
    },
    accountHolderName: {
      type: String,
    },
    bankName: {
      type: String,
    },
    ifscCode: {
      type: String,
    },
    payPalEmail: {
      type: String,
    },
    stripeEmail: {
      type: String,
    },
    phonePeNumber: {
      type: Number,
    },
    gpayNumber: {
      type: Number,
    },
    upiId: {
      type: String,
    },
    paytmNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

const WalletDetailsModel = mongoose.model("WalletDetail", walletDetailsSchema);
module.exports = WalletDetailsModel;
