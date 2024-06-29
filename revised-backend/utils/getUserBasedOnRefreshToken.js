const UserModel = require("../models/user-model.js");
const { ApiError } = require("./ApiError.js");
async function getUserBasedOnRefreshToken(refreshToken) {
  const user = await UserModel.findOne({ refreshToken });
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  return user;
}

module.exports = { getUserBasedOnRefreshToken };
