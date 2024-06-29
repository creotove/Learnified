const { Router } = require("express");
const {
  addVideosToCourseV2,
  createCourse,
  createPackage,
  getPackage,
  updateCourse,
  updatePackage,
  getPackages,
  createInstructor,
  updateInstructor,
} = require("../controllers/admin-controllers.js");
const { upload } = require("../middlewares/multer-middleware.js");
const { getCourses, getCourse } = require("../controllers/user-controllers.js");
const { auth } = require("../middlewares/temp-auth-middleware.js");

const adminRoute = Router();

adminRoute.post("/auth", auth, async (req, res) => {
  if (req.user.isAdmin) {
    return res.status(200).json({
      message: "User is authenticated",
      success: true,
      user: req.user,
      isAdmin: true,
    });
  }
  res.status(200).json({
    message: "User is authenticated",
    success: true,
    user: req.user,
  });
});
// course related routes
adminRoute.get("/course/:id", getCourse); // currently using user controller
adminRoute.get("/courses", getCourses); // currently using user controller
adminRoute.post(
  "/course",
  upload.fields([{ name: "thumbnail" }, { name: "avatar" }]),
  createCourse
);
adminRoute.patch("/course/:id", updateCourse);
adminRoute.delete("/course", createCourse);

adminRoute.post("/instructor", upload.single("avatar"), createInstructor);
adminRoute.patch("/instructor/:id", upload.single("avatar"), updateInstructor);

// Package related routes
adminRoute.get("/package/:id", getPackage);
adminRoute.get("/packages", getPackages);
adminRoute.post("/package", upload.single("coverImage"), createPackage);
adminRoute.patch("/package/:id", upload.single("coverImage"), updatePackage);

adminRoute.post(
  "/course/:courseId/videos-v2",
  upload.any(),
  addVideosToCourseV2
);
module.exports = adminRoute;
