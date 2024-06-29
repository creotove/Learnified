const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    commission: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    purchasedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    coverImage: {
      type: String,
      required: true,
    },
    promoCodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PromoCode",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const PackageModel = mongoose.model("Package", packageSchema);
module.exports = PackageModel;
