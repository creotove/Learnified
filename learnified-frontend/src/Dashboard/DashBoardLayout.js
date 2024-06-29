import React from "react";
import Navbar from "./dashboard-components/Navbar";
import Sidebar from "./dashboard-components/Sidebar";
import { Outlet } from "react-router-dom";

const DashBoardLayout = () => {
  return (
    <main className="w-full">
      <Navbar />
      <section className="flex mt-12 gap-12 mx-20 relative">
        <Sidebar />
        <Outlet />
      </section>
    </main>
  );
};

export default DashBoardLayout;
