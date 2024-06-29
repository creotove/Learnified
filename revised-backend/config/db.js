const mongoose = require("mongoose");

const connectDB = async (dbName) => {
  try {
    let mongoURL;
    if (process.env.NODE_ENV === "production") {
      mongoURL = process.env.MONGODB_URI + dbName;
      console.log("Connected to remote database");
    } else {
      mongoURL = `mongodb://localhost:27017/${dbName}`;
      console.log("Connected to local database");
    }
    const conn = await mongoose.connect(mongoURL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
