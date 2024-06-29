const AnalyticsModel = require("../models/analytics-model.js");

const addAnalytics = async ({
  newUser,
  becomingAnAffiliate,
  day,
  month,
  income,
}) => {
  try {
    const currentYear = new Date().getFullYear();
    const analytics = await AnalyticsModel.findOne({ year: currentYear });
    if (!analytics) {
      const newAnalytics = new AnalyticsModel({
        year: currentYear,
        income,
        user: newUser ? 1 : 0,
        affiliatedUser: becomingAnAffiliate ? 1 : 0,
        monthlyData: [
          {
            month,
            income,
            users: newUser ? 1 : 0,
            affiliatedUser: becomingAnAffiliate ? 1 : 0,
          },
        ],
        dailyData: [
          {
            date: day,
            income,
            users: newUser ? 1 : 0,
            affiliatedUser: becomingAnAffiliate ? 1 : 0,
          },
        ],
      });
      await newAnalytics.save();
      return;
    }
    analytics.income += income;
    analytics.user += newUser ? 1 : 0;
    analytics.affiliatedUser += becomingAnAffiliate ? 1 : 0;
    const monthlyData = analytics.monthlyData.find(
      (data) => data.month === month
    );
    if (monthlyData) {
      monthlyData.income += income;
      monthlyData.users += newUser ? 1 : 0;
      monthlyData.affiliatedUser += becomingAnAffiliate ? 1 : 0;
    } else {
      analytics.monthlyData.push({
        month,
        income,
        users: newUser ? 1 : 0,
        affiliatedUser: becomingAnAffiliate ? 1 : 0,
      });
    }
    const dailyData = analytics.dailyData.find((data) => data.date === day);
    if (dailyData) {
      dailyData.income += income;
      dailyData.users += newUser ? 1 : 0;
      dailyData.affiliatedUser += becomingAnAffiliate ? 1 : 0;
    } else {
      analytics.dailyData.push({
        date: day,
        income,
        users: newUser ? 1 : 0,
        affiliatedUser: becomingAnAffiliate ? 1 : 0,
      });
    }
    await analytics.save();
  } catch (error) {}
};

const dateHelperForAnalytics = (date) => {
  if (!date) date = new Date();
  const currentDate = new Date(date);
  const month = currentDate.toLocaleString("default", { month: "long" });
  const day = currentDate.toLocaleString("default", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  return { month, day };
};

module.exports = { addAnalytics, dateHelperForAnalytics };
