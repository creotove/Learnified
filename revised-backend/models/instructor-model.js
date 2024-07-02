const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide a phone number"],
    unique: true,
  },
  experience: {
    type: String,
    required: [true, "Please provide an experience"],
  },
  bio: {
    type: String,
    required: [true, "Please provide a bio"],
  },
  avatar: {
    type: String,
    required: [true, "Please provide an avatar"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
});

const InstructorModel = mongoose.model("Instructor", instructorSchema);
module.exports = InstructorModel;
