import React from "react";
import logo from "../../assets/logos/logo.png";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import profileICon from "../../assets/icons/pack/profileIcon.svg";
import notificationIcon from "../../assets/icons/pack/notiIcon.svg";
import myCoursesIcon from "../../assets/icons/pack/coursesIcon.svg";
import certificateIcon from "../../assets/icons/pack/certificateIcon-v1.svg";
import affiliateIcon from "../../assets/icons/pack/usersIcon-v2.svg";
import upgradeIcon from "../../assets/icons/pack/userIcon.svg";
import socialMediaIcon from "../../assets/icons/pack/socialMediaLinkIcon.svg";
import logoutIcon from "../../assets/icons/pack/logoutIcon.svg";
import useDashBoardSideBarStatus from "../../hooks/useDashBoardSideBarStatus";

const Navbar = () => {
  const { auth } = useAuth();
  const { isActive, setIsActive } = useDashBoardSideBarStatus();
  return (
    <nav className="lg:mx-14 mt-7 flex bg-white shadow-lg rounded-full justify-center px-5 py-3 items-center">
      <div
        className="sm:flex flex-col md:hidden cursor-pointer mx-1"
        onClick={() => setIsActive(!isActive)}
      >
        <div className="h-[2px] w-5 my-1 bg-black"></div>
        <div className="h-[2px] w-5 my-1 bg-black"></div>
        <div className="h-[2px] w-5 my-1 bg-black"></div>
      </div>
      <div className="w-50">
        <img src={logo} alt="Logo" className="object-cover" />
      </div>
      <div className="flex-1 ms-4">
        <ul className="flex gap-6">
          <NavLink to={"/dashboard"} className="hidden lg:block">
            Home
          </NavLink>
          {auth?.user?.isAffiliated ? null : (
            <NavLink to={"/become-an-affiliate"} className="hidden lg:block">
              Become An Affiliate
            </NavLink>
          )}
          <NavLink to={"/blog"} className="hidden lg:block">
            Blog
          </NavLink>
        </ul>
      </div>
      <div>
        <ul className="flex justify-between">
          <NavLink to={"noti"} className="p-3">
            <img
              src={notificationIcon}
              className="min-h-10 min-w-10 object-cover"
              alt="Notification"
            />
          </NavLink>

          <div className="relative group p-3 whitespace-nowrap z-10">
            <img
              src={profileICon}
              className="min-h-10 min-w-10 object-cover"
              alt="Profile"
            />
            <div className="right-0 absolute mt-2 w-52 bg-white border rounded-xl shadow-md hidden group-hover:block cursor-pointer">
              <NavLink to="profile" className="block px-4  hover:bg-[#d9d9d9]">
                <div className="flex gap-3  items-center">
                  <img src={profileICon} />
                  <p>My Profile</p>
                </div>
              </NavLink>
              <NavLink
                to="my-courses"
                className="block px-4  hover:bg-[#d9d9d9]"
              >
                <div className="flex gap-3  items-center">
                  <img src={myCoursesIcon} />
                  <p>My Courses</p>
                </div>
              </NavLink>
              <NavLink to="profile" className="block px-4  hover:bg-[#d9d9d9]">
                <div className="flex gap-3  items-center">
                  <img src={certificateIcon} />
                  <p>Ceritificate</p>
                </div>
              </NavLink>
              {auth?.user?.isAffiliated ? (
                <NavLink
                  to="/affiliate-panel"
                  className="block px-4  hover:bg-[#d9d9d9]"
                >
                  <div className="flex gap-3  items-center">
                    <img src={affiliateIcon} />
                    <p>Affiliate Panel</p>
                  </div>
                </NavLink>
              ) : null}
              <NavLink to="profile" className="block px-4  hover:bg-[#d9d9d9]">
                <div className="flex gap-3  items-center">
                  <img src={upgradeIcon} />
                  <p>Upgrade Plan</p>
                </div>
              </NavLink>
              <NavLink to="profile" className="block px-4  hover:bg-[#d9d9d9]">
                <div className="flex gap-3  items-center">
                  <img src={socialMediaIcon} />
                  <p>Social Media</p>
                </div>
              </NavLink>
              <NavLink to="/log-out" className="block px-4  hover:bg-[#d9d9d9]">
                <div className="flex gap-3  items-center">
                  <img src={logoutIcon} />
                  <p>Logout</p>
                </div>
              </NavLink>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
