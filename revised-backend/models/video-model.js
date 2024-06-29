const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    watchedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    thumbnail: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const VideoModel = mongoose.model("Video", videoSchema);
module.exports = VideoModel;
