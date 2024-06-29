const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    paymentType: {
      type: String,
      enum: ["paypal", "stripe", "paytm", "gpay", "bank", "phonePe", "upi"],
      required: true,
    },
    paymentId: {
      type: String,
    },
    paymentDate: {
      type: Date,
    },
    cancelledDate: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const PayoutModel = mongoose.model("PayoutRequest", payoutSchema);
module.exports = PayoutModel;
