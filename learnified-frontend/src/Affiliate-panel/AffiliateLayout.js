import React from "react";
import Sidebar from "./affiliate-panel-components/Sidebar";
import TodoList from "./affiliate-panel-components/TodoList";
import { Outlet } from "react-router-dom";
import useAffiliateSideBarStatus from "../hooks/useAffiliateDashBoardSideBarStatus";
import dropdownIcon from "../assets/icons/pack/dropdownIcon.svg";

const AffiliateLayout = () => {
  const { isActive, setIsActive } = useAffiliateSideBarStatus();

  return (
    <main className="flex m-5 flex-col lg:flex-row">
      <nav className="lg:hidden flex gap-5 items-center ">
        <div
          className="flex flex-col gap-1 cursor-pointer"
          onClick={() => setIsActive(!isActive)}
        >
          <div className="bg-black w-5 h-[2px]"></div>
          <div className="bg-black w-5 h-[2px]"></div>
          <div className="bg-black w-5 h-[2px]"></div>
        </div>
        <div className="flex">
          <img
            className="min-h-10 max-h-10 min-w-10 max-w-10 rounded-full"
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt="chat icon"
          />
          <img
            className="min-h-10 min-w-10"
            src={dropdownIcon}
            alt="dropdown"
          />
        </div>
      </nav>
      <Sidebar />
      <section className="flex-1">
        <Outlet />
      </section>
      <TodoList />
    </main>
  );
};

export default AffiliateLayout;
