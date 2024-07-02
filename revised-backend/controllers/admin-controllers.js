const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const PackageModel = require("../models/package-model.js");
const CourseModel = require("../models/course-model.js");
const PromoCodeModel = require("../models/promo-code-model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const uploadOnVimeo = require("../utils/vimeo.js");
const { unLinkFile } = require("../utils/unLinkFile.js");
const VideoModel = require("../models/video-model.js");
const InstructorModel = require("../models/instructor-model.js");
const LiveWebinarModel = require("../models/live-webinar-model.js");
const TrainingVideoModel = require("../models/training-video-model.js");

const createPackage = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    commission,
    certification,
    tagLine,
    priceWithPromoCode,
  } = req.body;
  if (
    [
      name,
      price,
      description,
      commission,
      certification,
      tagLine,
      priceWithPromoCode,
    ].some((field) => !field)
  ) {
    throw new ApiError(400, "Please provide all the required fields");
  }
  const existedPacakge = await PackageModel.findOne({ name });
  if (existedPacakge) {
    throw new ApiError(400, "Package already exists");
  }

  if (req.file && req.file.fieldname === "coverImage") {
    const coverImage = req.file.path;
    const coverImageUpload = await uploadOnCloudinary(coverImage);
    if (!coverImageUpload) throw new ApiError(400, "Cover Image Upload failed");
    await unLinkFile(coverImage.path)
      .then((result) => {
        console.log("Deletion result:", result);
      })
      .catch((error) => {
        console.error("Deletion error:", error);
      });
  } else {
    throw new ApiError(400, "Cover Image is required");
  }

  const newPackage = new PackageModel({
    name,
    price,
    description,
    commission,
    certification,
    tagLine,
    priceWithPromoCode,
    coverImage: coverImageUpload.url,
  });
  if (!newPackage) {
    throw new ApiError(500, "Failed to create package");
  }
  await newPackage.save();
  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Package created successfully"));
});

const getPackage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Package ID is required");
  }
  const pack = await PackageModel.findById(id);
  if (!pack) {
    throw new ApiError(404, "Package not found");
  }
  return res.status(200).json(new ApiResponse(200, pack, "Package found"));
});

const getPackages = asyncHandler(async (req, res) => {
  const { courses } = req.query;
  if (courses) {
    const packages = await PackageModel.find({}).select("courses name");
    return res
      .status(200)
      .json(new ApiResponse(200, packages, "Packages found"));
  }

  const packages = await PackageModel.find({});
  return res.status(200).json(new ApiResponse(200, packages, "Packages found"));
});

const updatePackage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Package ID is required");
  }
  const pack = await PackageModel.findById(id);
  if (!pack) {
    throw new ApiError(404, "Package not found");
  }
  if (req.file && req.file.fieldname === "coverImage") {
    const coverImage = req.file;
    const coverImageUpload = await uploadOnCloudinary(coverImage.path);
    if (!coverImageUpload) throw new ApiError(400, "Cover Image Upload failed");
    await unLinkFile(coverImage.path)
      .then((result) => {
        console.log("Deletion result:", result);
      })
      .catch((error) => {
        console.error("Deletion error:", error);
      });
    if (coverImageUpload) pack.coverImage = coverImageUpload.url;
  }

  const {
    name,
    price,
    description,
    commission,
    certification,
    tagLine,
    priceWithPromoCode,
  } = req.body;
  if (name) pack.name = name;
  if (price) pack.price = price;
  if (description) pack.description = description;
  if (commission) pack.commission = commission;
  if (certification)
    pack.certification = certification == "true" ? true : false;
  if (tagLine) pack.tagLine = tagLine;
  if (priceWithPromoCode) pack.priceWithPromoCode = priceWithPromoCode;

  await pack.save();
  return res.status(200).json(new ApiResponse(200, pack, "Package updated"));
});

const createCourse = asyncHandler(async (req, res) => {
  const { name, description, price, includedIn, instructorId } = req.body;
  if (
    [name, description, price, includedIn, instructorId].some((field) => !field)
  ) {
    throw new ApiError(400, "Please provide all the required fields");
  }
  const packages = includedIn.split(",").map((id) => id.trim());
  if (packages.length === 0) {
    throw new ApiError(400, "Please provide at least one package");
  }
  let thumbnailUpload;
  if (req.files && req.files.thumbnail) {
    console.log("Uploading thumbnail on Cloudinary");
    const localpath = req.files.thumbnail[0].path;
    if (!localpath) throw new ApiError(400, "Thumbnail is required");
    thumbnailUpload = await uploadOnCloudinary(localpath);
    if (!thumbnailUpload) throw new ApiError(400, "Thumbnail Upload failed");
    await unLinkFile(localpath)
      .then((result) => {
        console.log("Deletion result:", result);
      })
      .catch((error) => {
        console.error("Deletion error:", error);
      });
  } else {
    throw new ApiError(400, "Thumbnail is required");
  }

  const newCourse = await CourseModel.create({
    name,
    description,
    price,
    includedIn: packages,
    instructor: instructorId,
    thumbnail: thumbnailUpload.url,
  });
  if (!newCourse) {
    throw new ApiError(500, "Failed to create course");
  }

  await Promise.all(
    packages.map(async (packageId) => {
      const addCourseToPackage = await PackageModel.findById(packageId);
      if (!addCourseToPackage)
        return res
          .status(404)
          .json({ message: "Package not found", success: false });
      addCourseToPackage.courses.push(newCourse._id);
      await addCourseToPackage.save();
    })
  );

  await newCourse.save();

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Course created successfully", true));
});

const createInstructor = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, experience, bio, title } =
    req.body;
  if (
    [firstName, lastName, email, phoneNumber, experience, bio, title].some(
      (field) => !field
    )
  ) {
    throw new ApiError(400, "Please provide all the required fields");
  }
  const existedInstructor = await InstructorModel.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  if (existedInstructor) {
    throw new ApiError(
      400,
      "Instructor already exists with this email or phone number"
    );
  }
  let avatarUpload;
  if (req.file && req.file.fieldname === "avatar") {
    const localpath = req.file.path;
    if (!localpath) throw new ApiError(400, "Avatar is required");
    avatarUpload = await uploadOnCloudinary(localpath);
    if (!avatarUpload) throw new ApiError(400, "Avatar Upload failed");
    await unLinkFile(localpath)
      .then((result) => {
        console.log("Deletion result:", result);
      })
      .catch((error) => {
        console.error("Deletion error:", error);
      });
  } else {
    throw new ApiError(400, "Avatar is required");
  }

  const newInstructor = await InstructorModel.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    experience,
    bio,
    avatar: avatarUpload.url,
    title,
  });
  if (!newInstructor) {
    throw new ApiError(500, "Failed to create instructor");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Instructor created successfully", true));
});

const getInstructors = asyncHandler(async (req, res) => {
  const instructors = await InstructorModel.find({}).select(
    "firstName lastName avatar title"
  );
  if (instructors.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "Instructors not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, instructors, "Instructors found"));
});

const getInstructor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Instructor ID is required");
  }
  const instructor = await InstructorModel.findById(id);
  if (!instructor) {
    throw new ApiError(404, "Instructor not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, instructor, "Instructor found"));
});

const updateInstructor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Instructor ID is required");
  }
  const instructor = await InstructorModel.findById(id);
  if (!instructor) {
    throw new ApiError(404, "Instructor not found");
  }
  const existedInstructor = await InstructorModel.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  if (existedInstructor) {
    throw new ApiError(
      400,
      "Instructor already exists with this email or phone number"
    );
  }
  let avatarUpload;
  if (req.file && req.file.fieldname === "avatar") {
    console.log("Uploading avatar on Cloudinary");
    const localpath = req.file.path;
    if (!localpath) throw new ApiError(400, "Avatar is required");
    avatarUpload = await uploadOnCloudinary(localpath);
    if (!avatarUpload) throw new ApiError(400, "Avatar Upload failed");
    await unLinkFile(localpath)
      .then((result) => {
        console.log("Deletion result:", result);
      })
      .catch((error) => {
        console.error("Deletion error:", error);
      });
  }

  const { firstName, lastName, email, phoneNumber, experience, bio, title } =
    req.body;
  if (firstName) instructor.firstName = firstName;
  if (lastName) instructor.lastName = lastName;
  if (email) instructor.email = email;
  if (phoneNumber) instructor.phoneNumber = phoneNumber;
  if (experience) instructor.experience = experience;
  if (bio) instructor.bio = bio;
  if (avatarUpload) instructor.avatar = avatarUpload.url;
  if (title) instructor.title = title;

  await instructor.save();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Instructor updated successfully", true));
});

const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Course ID is required");
  }
  const course = await CourseModel.findById(id);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  const {
    name,
    description,
    price,
    isActive,
    includedIn,
    instructorName,
    instructorBio,
  } = req.body;

  if (name) course.name = name;
  if (description) course.description = description;
  if (price) course.price = price;
  if (isActive) course.isActive = isActive;
  if (includedIn) {
    const packages = await PackageModel.find({});
    await Promise.all(
      packages.map(async (pack) => {
        if (includedIn.includes(pack._id.toString())) {
          const courseToBeAdded = await PackageModel.findById(pack._id);
          if (!courseToBeAdded) {
            throw new ApiError(404, "Package not found");
          }
          if (courseToBeAdded.courses.includes(course._id)) {
            console.log("Course already exists in package", pack.name);
          } else {
            courseToBeAdded.courses.push(course._id);
            await courseToBeAdded.save();
            console.log("Adding course to package", pack.name);
          }
        } else {
          const courseToBeRemoved = await PackageModel.findById(pack._id);
          if (!courseToBeRemoved) {
            throw new ApiError(404, "Package not found");
          }
          if (courseToBeRemoved.courses.includes(course._id)) {
            courseToBeRemoved.courses = courseToBeRemoved.courses.filter(
              (courseId) => courseId.toString() !== course._id.toString()
            );
            console.log("Removed :", courseToBeRemoved.courses);
            await courseToBeRemoved.save();
            console.log("Removing course from package", pack.name);
          } else {
            console.log("Course doesn't exist in package", pack.name);
          }
        }
      })
    );
    course.includedIn = includedIn;
  }
  if (instructorName) course.instructor.name = instructorName;
  if (instructorBio) course.instructor.bio = instructorBio;

  await course.save();

  return res.status(200).json(new ApiResponse(200, {}, "Course not found"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await CourseModel.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  course.isActive = false;
  await course.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "Course deleted successfully", true));
});

const createPromoCode = asyncHandler(async (req, res) => {
  const { code, discount, packageId, expiryDate } = req.body;
  if ([code, discount, packageId, expiryDate].some((field) => !field)) {
    throw new ApiError(400, "Please provide all the required fields");
  }
  if (discount > 100) {
    throw new ApiError(400, "Discount cannot be more than 100%");
  }
  if (expiryDate < new Date()) {
    throw new ApiError(400, "Expiry date cannot be in the past");
  }

  const newPromoCode = new PromoCodeModel({
    code,
    discount,
    package_id: packageId,
    expiryDate,
  });
  if (!newPromoCode) {
    throw new ApiError(500, "Failed to create promo code");
  }
  await newPromoCode.save();
  const addPromoCodeToPackage = await PackageModel.findById(packageId);
  if (!addPromoCodeToPackage)
    return res
      .status(404)
      .json({ message: "Package not found", success: false });
  addPromoCodeToPackage.promoCodes.push(newPromoCode._id);
  await addPromoCodeToPackage.save();
  return res.status(201).json({
    message: "Promo code created successfully",
    success: true,
    data: newPromoCode,
  });
});

const updatePromoCode = asyncHandler(async (req, res) => {
  const { promoCodeId } = req.params;
  const { code, discount, packageId, expiryDate } = req.body;
  const promoCode = await PromoCodeModel.findById(promoCodeId);
  if (!promoCode) {
    throw new ApiError(404, "Promo code not found");
  }
  if (code) promoCode.code = code;
  if (discount) promoCode.discount = discount;
  if (packageId) promoCode.package_id = packageId;
  if (expiryDate) promoCode.expiryDate = expiryDate;
  await promoCode.save();

  return res
    .status(404)
    .json(new ApiResponse(404, "Promo code not found", false));
});

const deletePromoCode = asyncHandler(async (req, res) => {
  const { promoCodeId } = req.params;
  const promoCode = await PromoCodeModel.findById(promoCodeId);
  if (!promoCode) {
    throw new ApiError(404, "Promo code not found");
  }
  promoCode.isActive = false;
  await promoCode.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "Promo code deleted successfully", true));
});

const addVideosToCourseV2 = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const vidsLength = req.body?.videos?.length;
  const videos = [];
  const files = req.files;

  for (let i = 0; i < vidsLength; i++) {
    const videoFile = files.find(
      (file) => file.fieldname === `videos[${i}][videoFile]`
    );
    const thumbnailFile = files.find(
      (file) => file.fieldname === `videos[${i}][thumbnailFile]`
    );
    const title = req.body?.videos[i]?.title;

    // Upload the files to the storage and get URLs
    const videoUpload = await uploadOnCloudinary(videoFile.path);
    const thumbnailUpload = await uploadOnCloudinary(thumbnailFile.path);

    const newVideo = await VideoModel.create({
      name: title,
      videoId: videoUpload.url,
      thumbnail: thumbnailUpload.url,
    });

    if (!newVideo) {
      throw new ApiError(500, "Failed to create video");
    }

    // Delete the local files after successful upload
    await Promise.all([
      unLinkFile(videoFile.path).catch((error) =>
        console.error("Deletion error:", error)
      ),
      unLinkFile(thumbnailFile.path).catch((error) =>
        console.error("Deletion error:", error)
      ),
    ]);

    videos.push(newVideo._id);
  }

  course.playList.push(...videos);
  await course.save();

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Videos added successfully", true));
});

const addVideosToCourseV1 = asyncHandler(async (req, res) => {
  const vidsLength = req.body?.videos?.length;
  const videos = [];
  const files = req.files;

  for (let i = 0; i < vidsLength; i++) {
    const videoFile = files.find(
      (file) => file.fieldname === `videos[${i}][videoFile]`
    );
    const thumbnailFile = files.find(
      (file) => file.fieldname === `videos[${i}][thumbnailFile]`
    );
    const title = req.body?.videos[i]?.title;

    const videoUploadUrl = await uploadOnVimeo(videoFile.path, title);

    const thumbnailUpload = await uploadThumbnail(thumbnailFile.path);

    const newVideo = await VideoModel.create({
      name: title,
      videoId: videoUploadUrl,
      thumbnail: thumbnailUpload.url,
    });

    if (!newVideo) {
      throw new ApiError(500, "Failed to create video");
    }

    await Promise.all([
      unLinkFile(videoFile.path).catch((error) =>
        console.error("Deletion error:", error)
      ),
      unLinkFile(thumbnailFile.path).catch((error) =>
        console.error("Deletion error:", error)
      ),
    ]);

    videos.push(newVideo._id);
  }

  console.log(videos);

  return res
    .status(201)
    .json(new ApiResponse(201, "Videos added successfully", { videos }));
});
const removeVideosFromCourse = asyncHandler(async (req, res) => {});

const createAdmin = asyncHandler(async (req, res) => {});

const createLiveWebinar = asyncHandler(async (req, res) => {
  const { title, description, date, time, link, instructorId } = req.body;
  if (
    [title, description, date, time, link, instructorId].some((field) => !field)
  ) {
    throw new ApiError(400, "Please provide all the required fields");
  }
  let coverImageUpload;
  if (req.file && req.file.fieldname === "coverImage") {
    const coverImage = req.file.path;
    coverImageUpload = await uploadOnCloudinary(coverImage);
    if (!coverImageUpload) throw new ApiError(400, "Cover Image Upload failed");
    await unLinkFile(coverImage.path)
      .then((result) => {
        console.log("Deletion result:", result);
      })
      .catch((error) => {
        console.error("Deletion error:", error);
      });
  } else {
    throw new ApiError(400, "Cover Image is required");
  }
  const newLiveWebinar = await LiveWebinarModel.create({
    title,
    description,
    date,
    time,
    link,
    instructor: instructorId,
    coverImage: coverImageUpload.url,
  });
  if (!newLiveWebinar) {
    throw new ApiError(500, "Failed to create live webinar");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Live webinar created successfully"));
});

const updateLiveWebinar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Live Webinar ID is required");
  }
  const liveWebinar = await LiveWebinarModel.findById(id);
  if (!liveWebinar) {
    throw new ApiError(404, "Live Webinar not found");
  }
  const { title, description, date, time, link, isLive, instructorId } =
    req.body;
  let coverImageUpload;
  if (req.file && req.file.fieldname === "coverImage") {
    const coverImage = req.file.path;
    coverImageUpload = await uploadOnCloudinary(coverImage);
    if (!coverImageUpload) throw new ApiError(400, "Cover Image Upload failed");
    await unLinkFile(coverImage.path)
      .then((result) => {
        console.log("Deletion result:", result);
      })
      .catch((error) => {
        console.error("Deletion error:", error);
      });
  }
  if (title) liveWebinar.title = title;
  if (description) liveWebinar.description = description;
  if (date) liveWebinar.date = date;
  if (time) liveWebinar.time = time;
  if (link) liveWebinar.link = link;
  if (isLive) liveWebinar.isLive = isLive;
  if (instructorId) liveWebinar.instructor = instructorId;
  if (coverImageUpload) liveWebinar.coverImage = coverImageUpload.url;

  await liveWebinar.save();
  return res
    .status(200)
    .json(new ApiResponse(200, liveWebinar, "Live Webinar updated"));
});

const deleteLiveWebinar = asyncHandler(async (req, res) => {});

const addTrainingVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.body;
  if (!videoId) {
    throw new ApiError(400, "Please provide all the required fields");
  }
  const newTrainingVideo = await TrainingVideoModel.create({
    videoId,
  });
  if (!newTrainingVideo) {
    throw new ApiError(500, "Failed to create training video");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Training video created successfully"));
});

const updateTrainingVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Training Video ID is required");
  }
  const trainingVideo = await TrainingVideoModel.findById(id);
  if (!trainingVideo) {
    throw new ApiError(404, "Training Video not found");
  }
  const { videoId } = req.body;
  if (videoId) trainingVideo.videoId = videoId;
  await trainingVideo.save();
  return res
    .status(200)
    .json(new ApiResponse(200, trainingVideo, "Training Video updated"));
});

const deleteTrainingVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Training Video ID is required");
  }
  const trainingVideo = await TrainingVideoModel.findById(id);
  if (!trainingVideo) {
    throw new ApiError(404, "Training Video not found");
  }
  await trainingVideo.remove();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Training Video deleted successfully"));
});

const getTrainingVideos = asyncHandler(async (req, res) => {
  const trainingVideos = await TrainingVideoModel.find({});
  if (trainingVideos.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "Training Videos not found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, trainingVideos, "Training Videos found"));
});

module.exports = {
  createPackage,
  updatePackage,
  getPackage,
  createCourse,
  updateCourse,
  deleteCourse,
  createPromoCode,
  updatePromoCode,
  deletePromoCode,
  addVideosToCourseV2,
  addVideosToCourseV1,
  removeVideosFromCourse,
  createAdmin,
  getPackages,
  createInstructor,
  updateInstructor,
  getInstructors,
  getInstructor,
  addTrainingVideo,
  updateTrainingVideo,
  deleteTrainingVideo,
  getTrainingVideos,
};
