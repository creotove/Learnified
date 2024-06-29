const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const AffiliatedUserModel = require("../models/affiliated-user-model.js");
const PackageModel = require("../models/package-model.js");
const UserModel = require("../models/user-model.js");
const EarningModel = require("../models/earning-model.js");
const PayoutModel = require("../models/payout-model.js");
const WalletDetailsModel = require("../models/wallet-details-model.js");
const moment = require("moment");

const {
  getAffiliatedUserBasedOnRefreshToken,
} = require("../utils/getAffiliatedUserBasedOnRefreshToken.js");
const {
  getUserBasedOnRefreshToken,
} = require("../utils/getUserBasedOnRefreshToken.js");
const { default: mongoose } = require("mongoose");
const CourseModel = require("../models/course-model.js");

const withdrawEarnings = asyncHandler(async (req, res) => {
  const { amount, id, type } = req.body;
  if (!id) throw new ApiError(400, "User id is required");
  if (!amount) throw new ApiError(400, "Amount is required");
  if (!type) throw new ApiError(400, "Payment type is required");

  const walletDetails = await WalletDetailsModel.findOne({ user_id: id });
  if (!walletDetails) throw new ApiError(404, "Wallet details not found");

  if (type === "bank") {
    if (!walletDetails.accountNumber)
      throw new ApiError(400, "Bank details not found");
  } else if (type === "paypal") {
    if (!walletDetails.payPalEmail)
      throw new ApiError(400, "Paypal details not found");
  } else if (type === "stripe") {
    if (!walletDetails.stripeEmail)
      throw new ApiError(400, "Stripe details not found");
  } else if (type === "phonePe") {
    if (!walletDetails.phonePeNumber)
      throw new ApiError(400, "PhonePe details not found");
  } else if (type === "gpay") {
    if (!walletDetails.gpayNumber)
      throw new ApiError(400, "GPay details not found");
  } else if (type === "upi") {
    if (!walletDetails.upiId) throw new ApiError(400, "UPI details not found");
  } else if (type === "paytm") {
    if (!walletDetails.paytmNumber)
      throw new ApiError(400, "Paytm details not found");
  } else {
    throw new ApiError(400, "Payment type not found");
  }
  const user = await AffiliatedUserModel.findOne({ user_id: id });
  if (!user) throw new ApiError(404, "User not found");

  if (user.earnings < amount)
    throw new ApiError(400, "Cannot withdraw more than your earnings");

  const newPayout = await PayoutModel.create({
    user_id: id,
    amount,
    paymentType: type,
  });
  if (!newPayout) throw new ApiError(500, "Error while saving payout");

  user.earnings -= amount;
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newPayout, "Payout saved successfully"));
});

const addWalletDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "User id is required");

  const {
    accountNumber,
    accountHolderName,
    bankName,
    ifscCode,
    paypal,
    stripe,
    phonePe,
    gpay,
    upi,
    paytm,
  } = req.body;
  let walletDetails;

  const existingWalletDetails = await WalletDetailsModel.findOne({
    user_id: id,
  });
  if (existingWalletDetails) {
    walletDetails = existingWalletDetails;
  } else {
    walletDetails = await WalletDetailsModel.create({
      user_id: id,
    });
    const affiliateUser = await AffiliatedUserModel.findOne({ user_id: id });
    affiliateUser.wallet_id = walletDetails._id;
    await affiliateUser.save();
  }

  if (accountNumber) {
    if (!accountHolderName && !bankName && !ifscCode) {
      throw new ApiError(
        400,
        "Account Holder Name, Bank Name, IFSC Code are required"
      );
    }
  } else if (accountHolderName) {
    if (!accountNumber && !bankName && !ifscCode) {
      throw new ApiError(
        400,
        "Account Number, Bank Name, IFSC Code are required"
      );
    }
  } else if (bankName) {
    if (!accountHolderName && !accountNumber && !ifscCode) {
      throw new ApiError(
        400,
        "Account Holder Name, Account Number, IFSC Code are required"
      );
    }
  } else if (ifscCode) {
    if (!accountHolderName && !bankName && !accountNumber) {
      throw new ApiError(
        400,
        "Account Holder Name, Bank Name, Account Number are required"
      );
    }
  }

  if (accountNumber) walletDetails.accountNumber = accountNumber;
  if (accountHolderName) walletDetails.accountHolderName = accountHolderName;
  if (bankName) walletDetails.bankName = bankName;
  if (ifscCode) walletDetails.ifscCode = ifscCode;
  if (paypal) walletDetails.payPalEmail = paypal;
  if (stripe) walletDetails.stripeEmail = stripe;
  if (phonePe) walletDetails.phonePeNumber = phonePe;
  if (gpay) walletDetails.gpayNumber = gpay;
  if (upi) walletDetails.upiId = upi;
  if (paytm) walletDetails.paytmNumber = paytm;
  walletDetails.save();
  if (!walletDetails)
    throw new ApiError(500, "Error while saving wallet details");
  return res
    .status(201)
    .json(new ApiResponse(201, walletDetails, "Wallet details saved"));
});

const becomeAnAffiliate = asyncHandler(async (req, res) => {
  const { packageId, userId } = req.query;
  if (!packageId) throw new ApiError(400, "User id is required");
  if (!userId) throw new ApiError(400, "Package id is required");

  const user = await UserModel.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const isAffiliatedAlready = await AffiliatedUserModel.findOne({
    user_id: userId,
  });
  // const affiliatedUsercurrentPackage = await PackageModel.findById(
  //   isAffiliatedAlready.currentPackageRef
  // );

  // const pack1 = await PackageModel.find({});
  // pack1.forEach((pack) => {
  //   if (pack.price > affiliatedUsercurrentPackage.price) {
  //     return res
  //       .status(400)
  //       .json(
  //         new ApiResponse(
  //           400,
  //           {},
  //           "Your current package is lower than the selected package"
  //         )
  //       );
  //   }
  // });
  if (isAffiliatedAlready)
    throw new ApiError(400, "Your are already an affiliate");

  const pack = await PackageModel.findById(packageId);
  if (!pack) throw new ApiError(404, "Package not found");

  if (user.referredBy) {
    const referedBy = await AffiliatedUserModel.findOne({
      user_id: user.referredBy,
    });
    if (!referedBy) throw new ApiError(404, "Referrer not found");

    const pack = await PackageModel.findById(packageId);
    if (!pack) throw new ApiError(404, "Package not found");

    referedBy.earnings += pack.commission;
    const indexOfReferedUser = referedBy.referredUsersIds.indexOf(userId);
    referedBy.referredUsers[indexOfReferedUser].purchasedPackage = true;
    referedBy.referredUsers[indexOfReferedUser].purchaseDate = Date.now();
    referedBy.referredUsers[indexOfReferedUser].packageRef = packageId;

    const referalCode = await user.generateReferralCode();
    const newAffiliateUser = await AffiliatedUserModel.create({
      user_id: userId,
      referralCode: referalCode,
      referredBy: user.referredBy,
      currentPackageName: pack.name,
      currentPackageRef: packageId,
    });
    if (!newAffiliateUser)
      throw new ApiError(500, "Error while becoming affiliate");
    user.isAffiliated = true;
    user.referralCode = referalCode;
    await referedBy.save();
    await user.save();
    const earnings = await EarningModel.create({
      earnedUser: user.referredBy,
      earnedFrom: user._id,
      amount: pack.commission,
      package: packageId,
    });
    if (!earnings) {
      const deletedUser = await UserModel.findByIdAndDelete(user._id);
      const deleteAffiliatedUser = await AffiliatedUserModel.findOneAndDelete({
        user_id: user._id,
      });
      throw new ApiError(500, "Error while saving earnings");
    }
  } else {
    const referalCode = await user.generateReferralCode();
    const newAffiliateUser = await AffiliatedUserModel.create({
      user_id: userId,
      referralCode: referalCode,
      currentPackageName: pack.name,
      currentPackageRef: packageId,
    });
    if (!newAffiliateUser) {
      throw new ApiError(500, "Error while becoming affiliate");
    }
    user.isAffiliated = true;
    user.referralCode = referalCode;
    await user.save();
  }

  pack.purchasedBy.push(user._id);
  await pack.save();

  return res.status(201).json(new ApiResponse(201, {}, "User is an affiliate"));
});

const getMyReferedUsers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "User id is required");

  const affiliatedUser = await AffiliatedUserModel.findOne({ user_id: id });
  if (!affiliatedUser) throw new ApiError(404, "User not found");
  const referedUsers = affiliatedUser.referredUsers;
  return res
    .status(200)
    .json(new ApiResponse(200, referedUsers, "Refered users fetched"));
});

const getMyEarnings = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "User id is required");

  const earnings = await EarningModel.find({ earnedUser: id }).populate(
    "earnedFrom package"
  );
  if (!earnings) throw new ApiError(404, "Earnings not found");

  return res
    .status(200)
    .json(new ApiResponse(200, earnings, "Earnings fetched"));
});

const getUserEarnings = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "User id is required");

  const today = moment().startOf("day");
  const last7Days = moment().subtract(7, "days").startOf("day");
  const startOfMonth = moment().startOf("month").startOf("day");

  // Fetch earnings and sum amounts for each period
  const todaysEarnings = await EarningModel.aggregate([
    {
      $match: {
        earnedUser: id,
        createdAt: { $gte: today.toDate() },
      },
    },
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
  ]);

  const last7DaysEarnings = await EarningModel.aggregate([
    {
      $match: {
        earnedUser: new mongoose.Types.ObjectId(id),
        createdAt: { $gte: last7Days.toDate() },
      },
    },
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
  ]);

  const monthlyEarnings = await EarningModel.aggregate([
    {
      $match: {
        earnedUser: new mongoose.Types.ObjectId(id),
        createdAt: { $gte: startOfMonth.toDate() },
      },
    },
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
  ]);

  const totalEarnings = await EarningModel.aggregate([
    {
      $match: {
        earnedUser: new mongoose.Types.ObjectId(id),
      },
    },
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
  ]);

  const earningsSummary = {
    todaysEarnings: todaysEarnings.length ? todaysEarnings[0].totalAmount : 0,
    last7DaysEarnings: last7DaysEarnings.length
      ? last7DaysEarnings[0].totalAmount
      : 0,
    monthlyEarnings: monthlyEarnings.length
      ? monthlyEarnings[0].totalAmount
      : 0,
    totalEarnings: totalEarnings.length ? totalEarnings[0].totalAmount : 0,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, earningsSummary, "Earnings fetched"));
});

const getWalletDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "User id is required");

  const walletDetails = await WalletDetailsModel.findOne({ user_id: id });
  if (!walletDetails) throw new ApiError(404, "Wallet details not found");

  if (walletDetails.accountNumber)
    return res
      .status(200)
      .json(new ApiResponse(200, { type: "bank" }, "Wallet details fetched"));
  if (walletDetails.payPalEmail)
    return res
      .status(200)
      .json(new ApiResponse(200, { type: "paypal" }, "Wallet details fetched"));
  if (walletDetails.stripeEmail)
    return res
      .status(200)
      .json(new ApiResponse(200, { type: "stripe" }, "Wallet details fetched"));
  if (walletDetails.phonePeNumber)
    return res
      .status(200)
      .json(
        new ApiResponse(200, { type: "phonePe" }, "Wallet details fetched")
      );
  if (walletDetails.gpayNumber)
    return res
      .status(200)
      .json(new ApiResponse(200, { type: "gpay" }, "Wallet details fetched"));
  if (walletDetails.upiId)
    return res
      .status(200)
      .json(new ApiResponse(200, { type: "upi" }, "Wallet details fetched"));
  if (walletDetails.paytmNumber)
    return res
      .status(200)
      .json(new ApiResponse(200, { type: "paytm" }, "Wallet details fetched"));

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Wallet details fetched"));
});

const checkWalletDetailsAvailability = asyncHandler(async (req, res) => {
  const { id, type } = req.query;
  console.log("here");
  if (!id) throw new ApiError(400, "User id is required");
  if (!type) throw new ApiError(400, "Type is required");

  const walletDetails = await WalletDetailsModel.findOne({ user_id: id });
  if (!walletDetails) throw new ApiError(404, "Wallet details not found");

  if (type === "bank") {
    if (walletDetails.accountNumber)
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Wallet details fetched"));
    else throw new ApiError(400, "No wallet details found");
  } else if (type === "paypal") {
    if (walletDetails.payPalEmail)
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Wallet details fetched"));
    else throw new ApiError(400, "No wallet details found");
  } else if (type === "stripe") {
    if (walletDetails.stripeEmail)
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Wallet details fetched"));
    else throw new ApiError(400, "No wallet details found");
  } else if (type === "phonePe") {
    if (walletDetails.phonePeNumber)
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Wallet details fetched"));
    else throw new ApiError(400, "No wallet details found");
  } else if (type === "gpay") {
    if (walletDetails.gpayNumber)
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Wallet details fetched"));
    else throw new ApiError(400, "No wallet details found");
  } else if (type === "upi") {
    if (walletDetails.upiId)
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Wallet details fetched"));
    else throw new ApiError(400, "No wallet details found");
  } else if (type === "paytm") {
    if (walletDetails.paytmNumber)
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Wallet details fetched"));
    else throw new ApiError(400, "No wallet details found");
  } else {
    throw new ApiError(400, "No wallet details found");
  }
});

const getPayoutRequests = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "User id is required");
  const payouts = await PayoutModel.find({ user_id: id });
  if (!payouts) throw new ApiError(404, "Payouts not found");

  return res.status(200).json(new ApiResponse(200, payouts, "Payouts fetched"));
});

const getPackages = asyncHandler(async (req, res) => {
  console.log(req.cookies.refreshToken);
  const packages = await PackageModel.find().select(
    "name price description coverImage purchasedBy commission"
  );
  const affiliatedUser = await getAffiliatedUserBasedOnRefreshToken(
    req.cookies.refreshToken
  );

  if (packages.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, packages, "No packages found"));
  }
  const packagestoBeSent = packages.map((pack) => {
    const alreadyPurchased = pack.purchasedBy.includes(affiliatedUser.user_id);
    return {
      _id: pack._id,
      name: pack.name,
      price: pack.price,
      description: pack.description,
      coverImage: pack.coverImage,
      purchasedBy: pack.purchasedBy.length,
      commission: pack.commission,
      alreadyPurchased,
    };
  });

  return res
    .status(200)
    .json(new ApiResponse(200, packagestoBeSent, "Packages found"));
});

const getProfile = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const user = await getUserBasedOnRefreshToken(refreshToken);
  if (!user) throw new ApiError(404, "User not found");
  console.log(user._id);

  const affiliatedUseruser = await UserModel.aggregate([
    {
      $match: {
        _id: user._id,
      },
    },
    {
      $lookup: {
        from: "affiliatedusers",
        localField: "_id",
        foreignField: "user_id",
        as: "affiliate",
      },
    },
    {
      $project: {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
        isAffiliated: 1,
        affiliate: {
          referralCode: 1,
          earnings: 1,
          referredUsers: 1,
          currentPackageName: 1,
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, affiliatedUseruser, "User found"));
});

const getMyCourses = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "User id is required");

  const user = await UserModel.findById(id);
  if (!user) throw new ApiError(404, "User not found");

  const pack = await PackageModel.findOne({
    purchasedBy: user._id,
  });
  if (!pack) throw new ApiError(404, "No courses found");

  const courses = await CourseModel.find({
    includedIn: pack._id,
  }).select("name description instructor thumbnail");

  if (courses.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, { courses }, "No courses found"));
  }
  return res.status(200).json(new ApiResponse(200, courses, "Courses"));
});

const getCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new ApiError(400, "Course id is required");

  const course = await CourseModel.findById(id).populate("playList");
  if (!course) throw new ApiError(404, "Course not found");

  return res.status(200).json(new ApiResponse(200, course, "Course found"));
});
getMyCourses,
  (module.exports = {
    becomeAnAffiliate,
    withdrawEarnings,
    getMyReferedUsers,
    getMyEarnings,
    getUserEarnings,
    addWalletDetails,
    getWalletDetails,
    checkWalletDetailsAvailability,
    getPayoutRequests,
    getPackages,
    getProfile,
    getMyCourses,
    getCourse,
  });
