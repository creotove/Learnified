const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model.js");

const auth = async (req, res, next) => {
  try {
    const token =
      (await req?.cookies?.accessToken) ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json(401, "Token not found in request header");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      return res.status(401).json(401, "Unauthorized to access this route");
    }
    const user = await UserModel.findById(decodedToken._id).select(
      "-password -__v -createdAt -updatedAt -refreshToken"
    );
    if (!user) {
      return res.status(401).json(401, "User not found based on token");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { auth };
