const { Router } = require("express");
const {
  becomeAnAffiliate,
  withdrawEarnings,
  getMyReferedUsers,
  addWalletDetails,
  getWalletDetails,
  checkWalletDetailsAvailability,
  getPayoutRequests,
  getPackages,
  getProfile,
  getUserEarnings,
  getMyCourses,
  getCourse,
} = require("../controllers/affiliate-controller.js");

const affiliateRoute = Router();
affiliateRoute.post("/become-an-affiliate", becomeAnAffiliate);
affiliateRoute.post("/withdraw", withdrawEarnings);
affiliateRoute.get("/withdraw/:id", getPayoutRequests);
affiliateRoute.get("/refered-users/:id", getMyReferedUsers);
affiliateRoute.get("/earnings/:id", getUserEarnings);
affiliateRoute.post("/wallet/:id", addWalletDetails);
affiliateRoute.get("/wallet/:id", getWalletDetails);
affiliateRoute.get("/wallet", checkWalletDetailsAvailability);
affiliateRoute.get("/packages", getPackages);
affiliateRoute.get("/me", getProfile);
affiliateRoute.get("/my-courses/:id", getMyCourses);
affiliateRoute.get("/course/:id", getCourse);
module.exports = affiliateRoute;
