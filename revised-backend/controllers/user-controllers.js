const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const AffiliatedUserModel = require("../models/affiliated-user-model.js");
const PackageModel = require("../models/package-model.js");
const UserModel = require("../models/user-model.js");
const EarningModel = require("../models/earning-model.js");
const CourseModel = require("../models/course-model.js");
const {
  getUserBasedOnRefreshToken,
} = require("../utils/getUserBasedOnRefreshToken.js");
const InstructorModel = require("../models/instructor-model.js");
const LiveWebinarModel = require("../models/live-webinar-model.js");

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message || "Error while generating tokens");
  }
};

const logoutUser = asyncHandler(async (req, res) => {
  const user = await getUserBasedOnRefreshToken(req.cookies.refreshToken);
  await UserModel.findByIdAndUpdate(
    user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const signUpUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, city, state } =
    req.body;
  const { referral } = req.query;
  console.log("Referral Code: ", referral);

  if (
    [firstName, lastName, email, password, phoneNumber, city, state].some(
      (field) => field?.trim() === ""
    )
  )
    throw new ApiError(400, "All fields are required");

  const existedUser = await UserModel.findOne({
    $or: [{ phoneNumber }, { email }],
  });
  if (existedUser)
    throw new ApiError(
      400,
      "Phone Number or Email is already registered with us. Please login to continue."
    );
  console.log("Creating User...");
  const newUser = await UserModel.create({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    city,
    state,
  });
  if (!newUser) throw new ApiError(500, "Error while signing up");

  if (referral !== "null") {
    const referredBy = await AffiliatedUserModel.findOne({
      referralCode: referral,
    });
    if (!referredBy) {
      const deletedUser = await UserModel.findByIdAndDelete(newUser._id);
      throw new ApiError(400, "Invalid referral code");
    } else {
      // Affiliated User
      referredBy.referredUsersIds.push(newUser._id);
      referredBy.referredUsers.push({
        user_id: newUser._id,
        signedUped: true,
        name: `${newUser.firstName} ${newUser.lastName}`,
      });
      await referredBy.save();
      // User
      newUser.referredBy = referredBy.user_id;
      await newUser.save();
    }
  }
  return res.status(201).json(new ApiResponse(201, {}, "User Created"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password)
    throw new ApiError(400, "Email/Phone number and password are required");

  let user = await UserModel.findOne({
    $or: [{ email: identifier }, { phoneNumber: identifier }],
  });
  if (!user) throw new ApiError(404, "User is not registered with us.");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await UserModel.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken })
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await UserModel.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "User id is required");

  const user = await UserModel.findById(id).select("-password -refreshToken");
  if (!user) throw new ApiError(404, "User not found");

  return res.status(200).json(new ApiResponse(200, { user }, "User profile"));
});

const getPackages = asyncHandler(async (req, res) => {
  const packages = await PackageModel.find().select(
    "name price tagLine coverImage purchasedBy commission"
  );

  if (packages.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, packages, "No packages found"));
  }
  const packagestoBeSent = packages.map((pack) => {
    return {
      _id: pack._id,
      name: pack.name,
      price: pack.price,
      coverImage: pack.coverImage,
      purchasedBy: pack.purchasedBy.length,
      commission: pack.commission,
      tagLine: pack.tagLine,
    };
  });

  return res
    .status(200)
    .json(new ApiResponse(200, packagestoBeSent, "Packages found"));
});

const getPackage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "Package id is required");

  const pack = await PackageModel.findOne({
    _id: id,
    isActive: true,
  }).select(
    "name price description tagLine priceWithPromoCode coverImage languages certification courses"
  );
  if (!pack) throw new ApiError(404, "Package not found");

  return res.status(200).json(new ApiResponse(200, pack, "Package details"));
});

const getEarningsOfUser = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // pageNumber
  const limit = parseInt(req.query.limit) || 10; // limit
  const id = req.query.id || req.params._id;
  if (!id) throw new ApiError(400, "User id is required");

  const earnings = await EarningModel.aggregate([
    {
      $match: {
        earnedUser: id,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "earnedFrom",
        foreignField: "_id",
        as: "earnedFrom",
      },
    },
    {
      $lookup: {
        from: "packages",
        localField: "package",
        foreignField: "_id",
        as: "package",
      },
    },
    {
      $unwind: "$earnedFrom",
    },
    {
      $unwind: "$package",
    },
    {
      $project: {
        amount: 1,
        earnedFrom: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          phoneNumber: 1,
        },
        package: {
          _id: 1,
          name: 1,
          price: 1,
        },
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
  ]);

  if (earnings[0]) {
    return res.status(200).json(new ApiResponse(200, { earnings }, "Earnings"));
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, { earnings }, "No earnings found"));
  }
});

const getCourses = asyncHandler(async (req, res) => {
  const courses = await CourseModel.find({ isActive: true }).select(
    "name description price thumbnail includedIn"
  );

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

  const course = await CourseModel.findById(id).populate(
    "playLists.videos playLists.name videoCompletions.watched videoCompletions.video"
  );
  if (!course) throw new ApiError(404, "Course not found");

  return res
    .status(200)
    .json(new ApiResponse(200, { course }, "Course details"));
});

const getCourseProgress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "Course id is required");

  const course = await CourseModel.findById(id).populate(
    "videoCompletions.watched videoCompletions.video"
  );
  if (!course) throw new ApiError(404, "Course not found");

  return res
    .status(200)
    .json(new ApiResponse(200, { course }, "Course progress details"));
});

const getInstructors = asyncHandler(async (req, res) => {
  const instructors = await InstructorModel.find().select(
    "firstName lastName avatar title"
  );
  if (instructors.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, { instructors }, "No instructors found"));
  }
  return res.status(200).json(new ApiResponse(200, instructors, "Instructors"));
});

const getInstructor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "Instructor id is required");

  const instructor = await InstructorModel.findById(id).select(
    "-phoneNumber -email"
  );

  if (!instructor) throw new ApiError(404, "Instructor not found");

  return res
    .status(200)
    .json(new ApiResponse(200, { instructor }, "Instructor details"));
});

const liveWebinars = asyncHandler(async (req, res) => {
  const token = req.cookies?.accessToken;
  const selectedFields = "title description date time isLive";
  let liveWebinars;
  if (token) {
    liveWebinars = await LiveWebinarModel.find().select(
      selectedFields + " link"
    );
  } else {
    liveWebinars = await LiveWebinarModel.find().select(selectedFields);
  }

  if (liveWebinars.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, liveWebinars, "No live webinars found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, liveWebinars, "Live webinars found"));
});

const getLiveWebinar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "Live webinar id is required");

  const token = req.cookies?.accessToken;
  const selectedFields = "title description date time isLive";
  let liveWebinar;
  if (token) {
    liveWebinar = await LiveWebinarModel.findById(id).select(
      selectedFields + " link"
    );
  } else {
    liveWebinar = await LiveWebinarModel.findById(id).select(selectedFields);
  }

  if (!liveWebinar) throw new ApiError(404, "Live webinar not found");

  return res
    .status(200)
    .json(new ApiResponse(200, { liveWebinar }, "Live webinar details"));
});

const getLeaderBoard = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const leaderBoard = await UserModel.aggregate([
    {
      $match: {
        isAffiliated: true,
      },
    },
    {
      $lookup: {
        from: "affiliatedusers",
        localField: "_id",
        foreignField: "user_id",
        as: "affiliatedUser",
      },
    },
    {
      $unwind: "$affiliatedUser",
    },
    {
      $project: {
        _id: 1,
        earnings: "$affiliatedUser.earnings",
      },
    },
    {
      $sort: {
        earnings: -1,
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
    {
      $project: {
        _id: 1,
        earnings: 1,
        firstName: 1,
        lastName: 1,
      },
    },
  ]);

  if (leaderBoard.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, leaderBoard, "No leaderboard found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, leaderBoard[0], "Leaderboard found"));
});

module.exports = {
  refreshAccessToken,
  logoutUser,
  signUpUser,
  loginUser,
  getUserProfile,
  getPackages,
  getPackage,
  getEarningsOfUser,
  getCourses,
  getCourse,
  getCourseProgress,
  generateAccessAndRefereshTokens,
  getInstructors,
  getInstructor,
  liveWebinars,
  getLiveWebinar,
  getLeaderBoard,
};
