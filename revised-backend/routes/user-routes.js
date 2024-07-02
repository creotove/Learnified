const { Router } = require("express");
const {
  loginUser,
  signUpUser,
  getPackages,
  getPackage,
  generateAccessAndRefereshTokens,
  logoutUser,
  getInstructors,
  getInstructor,
  liveWebinars,
  getLiveWebinar,
} = require("../controllers/user-controllers.js");
const { auth } = require("../middlewares/temp-auth-middleware.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const userRoute = Router();

userRoute.post("/auth", auth, async (req, res) => {
  if (req.user.isAdmin) {
    return res.status(200).json({
      message: "User is authenticated as admin",
      success: true,
      user: req.user,
      isAdmin: true,
    });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    req.user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: req.user, accessToken, refreshToken }));
});
userRoute.post("/log-in", loginUser);
userRoute.post("/log-out", logoutUser);
userRoute.post("/sign-up", signUpUser);

userRoute.get("/packages", getPackages);
userRoute.get("/packages/:id", getPackage);

userRoute.get("/instructors", getInstructors);
userRoute.get("/instructors/:id", getInstructor);

userRoute.get("/live-webinars", liveWebinars);
userRoute.get("/live-webinars/:id", getLiveWebinar);

module.exports = { userRoute };
