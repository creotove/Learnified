const mongoose = require("mongoose");

const liveWebinarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    coverImage: {
      type: String,
      required: [true, "Cover Image is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    link: {
      type: String,
      required: [true, "Link is required"],
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: [true, "Instructor is required"],
    },
  },
  { timestamps: true }
);

const LiveWebinarModel = mongoose.model("LiveWebinar", liveWebinarSchema);
module.exports = LiveWebinarModel;
