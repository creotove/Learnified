const mongoose = require("mongoose");

const promoCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
    expiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const PromoCodeModel = mongoose.model("PromoCode", promoCodeSchema);
module.exports = PromoCodeModel;
