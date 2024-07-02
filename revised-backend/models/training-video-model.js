const mongoose = require("mongoose");

const trainingVideoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: [true, "Please provide a video url"],
  },
});

const TrainingVideoModel = mongoose.model("TrainingVideo", trainingVideoSchema);
module.exports = TrainingVideoModel;
