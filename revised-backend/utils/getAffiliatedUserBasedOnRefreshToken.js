const UserModel = require("../models/user-model.js");
const AffiliatedUserModel = require("../models/affiliated-user-model.js");
const { ApiError } = require("./ApiError.js");
async function getAffiliatedUserBasedOnRefreshToken(refreshToken) {
  const user = await UserModel.findOne({ refreshToken });
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  const affiliatedUser = await AffiliatedUserModel.findOne({
    user_id: user._id,
  });
  if (!affiliatedUser) {
    throw new ApiError(401, "Affiliated User not found");
  }

  return affiliatedUser;
}

module.exports = { getAffiliatedUserBasedOnRefreshToken };
