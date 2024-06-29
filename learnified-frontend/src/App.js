import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import RequireAuth from "./Middleware/AuthRequire";
import RequireAdminAuth from "./Middleware/AdminAuth";

import Logout from "./Dashboard/pages/Logout";
import Profile from "./Dashboard/pages/Profile";
import MyCourses from "./Dashboard/pages/MyCourses";
import MyCoursesPlay from "./Course/page/MyCoursesPlay";
import AllCourses from "./Dashboard/pages/AllCourses";
import DashBoardLayout from "./Dashboard/DashBoardLayout";
import Bundles from "./Dashboard/new-pages/Bundles";
import Training from "./Dashboard/new-pages/Training";
import Offers from "./Dashboard/new-pages/Offers";
import Eduvince from "./Dashboard/pages/Eduvince";

import SiteLayout from "./Site/SiteLayout";
import Home from "./Site/pages/Home";
import BecomeAnAffiliate from "./Site/pages/BecomeAnAffiliate";

import AdminLayout from "./Admin/Index";
import CreateCourse from "./Admin/CreateCourse";
import Courses from "./Admin/Courses";
import AdminHome from "./Admin/Home";
import AdminPackages from "./Admin/Packages";
import CreatePackage from "./Admin/CreatePackage";
import AddVideosToCourse from "./Admin/AddVideosToCourse";
import AddCourseToPackage from "./Admin/AddCourseToPackage";

import GenerateLinks from "./Affiliate-panel/pages/GenerateLinks";
import Earnings from "./Affiliate-panel/pages/Earnings";
import PayOutDetails from "./Affiliate-panel/pages/PayOutDetails";
import AddWalletDetails from "./Affiliate-panel/pages/AddWalletDetails";
import WithdrawEarnings from "./Affiliate-panel/pages/WithdrawEarnings";
import AffiliatedUserHome from "./Affiliate-panel/pages/Home";
import AffiliateLayout from "./Affiliate-panel/AffiliateLayout";

import CommingSoon from "./utils-components/ComingSoon";
import CoursePlayLayout from "./Course/CoursePlayLayout";
import Contact from "./Site/pages/Contact.js";
import About from "./Site/pages/About";
import Packages from "./Site/pages/Packages";
import PackageShow from "./Site/pages/PackageShow.js";
import AddInstructor from "./Admin/AddInstructor.js";
import Instructor from "./Admin/Instructor.js";

const App = () => {
  return (
    <Suspense
      fallback={
        <section className="h-screen flex justify-center items-center w-screen">
          <span className="loader" />
        </section>
      }
    >
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route path="" element={<Home />} />
          <Route path="courses" element={<div>Site Courses</div>} />
          <Route path="packages" element={<Packages />} />
          <Route path="packages/:id" element={<PackageShow />} />
          <Route path="about" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="become-an-affiliate" element={<BecomeAnAffiliate />} />
        </Route>
        <Route path="/dashboard" element={<RequireAuth />}>
          <Route path="" element={<DashBoardLayout />}>
            <Route path="" element={<Bundles />} />
            <Route path="training" element={<Training />} />
            <Route path="offers" element={<Offers />} />
            <Route path="profile" element={<Profile />} />
            <Route path="all-courses" element={<AllCourses />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="eduvince" element={<Eduvince />} />
          </Route>

          <Route path="" element={<CoursePlayLayout />}>
            <Route path="my-courses/:id" element={<MyCoursesPlay />} />
          </Route>
        </Route>

        <Route path="/affiliate-panel" element={<RequireAuth />}>
          <Route path="" element={<AffiliateLayout />}>
            <Route path="" element={<AffiliatedUserHome />} />
            <Route path="generate-links" element={<GenerateLinks />} />
            <Route path="add-wallet-details" element={<AddWalletDetails />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="withdraw-earnings" element={<WithdrawEarnings />} />
            <Route path="payout-details" element={<PayOutDetails />} />
            <Route path="offers" element={<CommingSoon />} />
            <Route path="achievements" element={<CommingSoon />} />
            <Route path="freelance" element={<CommingSoon />} />
            <Route path="marketing-tool" element={<CommingSoon />} />
            <Route path="training" element={<CommingSoon />} />
            <Route path="webinars" element={<CommingSoon />} />
            <Route path="kyc" element={<CommingSoon />} />
            <Route path="leads-tracker" element={<CommingSoon />} />
            <Route path="referral-details" element={<CommingSoon />} />
            <Route path="qulification" element={<CommingSoon />} />
            <Route path="passive-income" element={<CommingSoon />} />
            <Route path="leaderboard" element={<CommingSoon />} />
            <Route path="settings" element={<CommingSoon />} />
          </Route>
        </Route>

        <Route path="/admin" element={<RequireAdminAuth />}>
          <Route path="" element={<AdminLayout />}>
            <Route path="" element={<AdminHome />} />
            <Route path="create-courses" element={<CreateCourse />} />
            <Route
              path="add-videos-to-course"
              element={<AddVideosToCourse />}
            />
            <Route path="add-to-package" element={<AddCourseToPackage />} />
            <Route path="add-instructor" element={<AddInstructor />} />
            <Route path="instructor" element={<Instructor />} />
            <Route path="courses" element={<Courses />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="create-package" element={<CreatePackage />} />
          </Route>
        </Route>

        <Route path="/log-out" element={<Logout />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Suspense>
  );
};

export default App;
