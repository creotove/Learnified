import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/sidebar.css";
import dashBoardIcon from "../../assets/icons/pack/dashboardIcon.svg";
import offersIcon from "../../assets/icons/pack/offerIcon.svg";
import achievementIcon from "../../assets/icons/pack/achievementIcon.svg";
import freeLanceIcon from "../../assets/icons/pack/freelanceIocn.svg";
import marketingToolIcon from "../../assets/icons/pack/marketingIcon.svg";
import trainingIcon from "../../assets/icons/pack/teachingIcon-v2.svg";
import webinarsIcon from "../../assets/icons/pack/webinarIcon.svg";
import kycIcon from "../../assets/icons/pack/searchUserIcon.svg";
import linkGeneratorIcon from "../../assets/icons/pack/linkIcon.svg";
import leadsTrackerIcon from "../../assets/icons/pack/leadsIcon.svg";
import referralDetailsIcon from "../../assets/icons/pack/referalIcon.svg";
import qualificationIcon from "../../assets/icons/pack/verifiedIcon.svg";
import passiveIncomeIcon from "../../assets/icons/pack/earnAndGrowIcon.svg";
import earningsIcon from "../../assets/icons/pack/earningIcon.svg";
import payoutDetailsIcon from "../../assets/icons/pack/payoutIcon.svg";
import leaderBoardIcon from "../../assets/icons/pack/rankingIcon.svg";
import settingsIcon from "../../assets/icons/pack/settingsIcon.svg";
import logoutIcon from "../../assets/icons/pack/logoutIcon.svg";
import useAffiliateSideBarStatus from "../../hooks/useAffiliateDashBoardSideBarStatus";

const SideBar = () => {
  const { isActive, setIsActive } = useAffiliateSideBarStatus();
  const location = useLocation();

  const navItems = [
    {
      text: "Dashboard",
      icon: dashBoardIcon,
      to: "/affiliate-panel",
    },
    {
      text: "Offers",
      icon: offersIcon,
      to: "/affiliate-panel/offers",
    },
    {
      text: "Achievements",
      icon: achievementIcon,
      to: "/affiliate-panel/achievements",
    },
    {
      text: "Freelance",
      icon: freeLanceIcon,
      to: "/affiliate-panel/freelance",
    },
    {
      text: "Marketing Tool",
      icon: marketingToolIcon,
      to: "/affiliate-panel/marketing-tool",
    },
    {
      text: "Training",
      icon: trainingIcon,
      to: "/affiliate-panel/training",
    },
    {
      text: "Webinars",
      icon: webinarsIcon,
      to: "/affiliate-panel/webinars",
    },
    {
      text: "KYC",
      icon: kycIcon,
      to: "/affiliate-panel/kyc",
    },
    {
      text: "Link Generator",
      icon: linkGeneratorIcon,
      to: "/affiliate-panel/generate-links",
    },
    {
      text: "Leads Tracker",
      icon: leadsTrackerIcon,
      to: "/affiliate-panel/leads-tracker",
    },
    {
      text: "Referral Details",
      icon: referralDetailsIcon,
      to: "/affiliate-panel/referral-details",
    },
    {
      text: "Qualification",
      icon: qualificationIcon,
      to: "/affiliate-panel/qulification",
    },
    {
      text: "Passive Income",
      icon: passiveIncomeIcon,
      to: "/affiliate-panel/passive-income",
    },
    {
      text: "Earnings",
      icon: earningsIcon,
      to: "/affiliate-panel/earnings",
    },
    {
      text: "Payout Details",
      icon: payoutDetailsIcon,
      to: "/affiliate-panel/payout-details",
    },
    {
      text: "Leaderboard",
      icon: leaderBoardIcon,
      to: "/affiliate-panel/leaderboard",
    },
    {
      text: "Logout",
      icon: logoutIcon,
      to: "/log-out",
    },
  ];

  useEffect(() => {
    // Initial check to set sidebar status based on screen size
    if (window.innerWidth >= 768) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    // Resize event listener
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsActive]);

  return (
    <div
      className={`
      ${
        isActive ? "affiliatedSideBar" : "hidden"
      } w-64 whitespace-nowrap rounded-xl bg-[#A454EB]
      h-min
       text-white`}
    >
      <div className="h-full">
        <div className="flex flex-col items-start w-64 justify-center ps-5">
          {navItems.map((item, idx) => (
            <NavLink
              to={item.to}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsActive(false);
                }
              }}
              // end
              className={({ isActive }) => {
                return `affiliated_sideBar_menu_item flex justify-center md:justify-start items-center ${
                  location.pathname === "/affiliate-panel" &&
                  item.text === "Dashboard"
                    ? "active"
                    : ""
                } ${isActive ? "active" : ""}`;
              }}
              key={idx}
            >
              <div className="flex md-block justify-center items-center">
                <div
                  style={{
                    height: "1.75rem",
                    width: "1.75rem",
                  }}
                >
                  <img
                    style={{
                      objectFit: "contain",
                    }}
                    className={`${
                      location.pathname === item.to ? "transform scale-125" : ""
                    }  ${item.text === "Logout" ? "invert" : null}`}
                    src={item.icon}
                    alt={item.text}
                  />
                </div>
              </div>
              <div className="text-white text-center ms-2">{item.text}</div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
