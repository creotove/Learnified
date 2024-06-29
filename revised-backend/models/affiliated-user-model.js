const mongoose = require("mongoose");

const refferedUserSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Refered To user id is required"],
  },
  name: {
    type: String,
    required: [true, "User Name is required"],
  },
  signedUped: {
    type: Boolean,
    default: false,
  },
  purchasedPackage: {
    type: Boolean,
    default: false,
  },
  purchaseDate: {
    type: Date,
  },
  packageRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
  },
});

const affiliatedUserSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    earnings: {
      type: Number,
      default: 0,
    },
    referralCode: {
      type: String,
      unique: true,
      required: [true, "Referral code is required"],
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    referredUsersIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    eduvinceCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    referredUsers: [refferedUserSchema],
    currentPackageName: {
      type: String,
      required: [true, "Current package name is required"],
    },
    currentPackageRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
    wallet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WalletDetail",
    },
  },
  { timestamps: true }
);

const AffiliatedUserModel = mongoose.model(
  "AffiliatedUser",
  affiliatedUserSchema
);
module.exports = AffiliatedUserModel;
