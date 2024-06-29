const mongoose = require("mongoose");

const videoCompletionSchema = new mongoose.Schema({
  learner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
  watched: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    thumbnail: {
      type: String,
      required: [true, "Please provide a thumbnail"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    includedIn: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
      },
    ],
    playList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    videoCompletions: [videoCompletionSchema],
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CourseModel = mongoose.model("Course", courseSchema);

module.exports = CourseModel;
