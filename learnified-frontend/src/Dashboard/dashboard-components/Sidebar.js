import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import homeIcon from "../../assets/icons/pack/homeIcon.svg";
import trainingIcon from "../../assets/icons/pack/trainingIcon.svg";
import offersIcon from "../../assets/icons/pack/offerBorderIcon.svg";
import bundlesIcon from "../../assets/icons/pack/bookIcon-1.svg";
import "../styles/sidebar.css";
import useDashBoardSideBarStatus from "../../hooks/useDashBoardSideBarStatus";

const SideBar = () => {
  const { isActive, setIsActive } = useDashBoardSideBarStatus();
  const location = useLocation();

  const navItems = [
    {
      text: "Bundles",
      icon: bundlesIcon,
      to: "/dashboard",
    },
    {
      text: "Training",
      icon: trainingIcon,
      to: "/dashboard/training",
    },
    {
      text: "Offers",
      icon: offersIcon,
      to: "/dashboard/offers",
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
      ${isActive ? "sideBar" : "hidden"} shadow-xl rounded-xl ms-12 bg-white`}
    >
      <div className="h-full">
        <div>
          {navItems.map((item, idx) => (
            <NavLink
              to={item.to}
              end
              className={({ isActive }) => {
                return `menu_item flex justify-center md:justify-start items-center ${
                  location.pathname === "/dashboard" && item.text === "Bundles"
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
                    src={item.icon}
                    alt=""
                  />
                </div>
              </div>
              <div className="text-[#A454EB] text-center ms-2 font-bold">
                {item.text}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
