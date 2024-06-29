const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    year: Number, // 2021
    income: Number, // income
    user: Number, // total customers
    affiliatedUser: Number, // total affiliated customers
    monthlyData: [
      {
        month: String, // Jan
        income: Number, // income
        users: Number, // total users
        affiliatedUser: Number, // total affiliated customers
      },
    ],
    dailyData: [
      {
        date: String, // Jan-16
        income: Number, // income
        users: Number, // total users
        affiliatedUser: Number, // total affiliated customers
      },
    ],
  },
  { timestamps: true }
);

const AnalyticsModel = mongoose.model("Analytic", analyticsSchema);
module.exports = { AnalyticsModel };
