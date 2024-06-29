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
  },
  { timestamps: true }
);

const LiveWebinar = mongoose.model("LiveWebinar", liveWebinarSchema);
module.exports = LiveWebinar;
