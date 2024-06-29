import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const CoursePlayLayout = () => {
  return (
    <main className="w-full">
      <Navbar />
      <section className="flex">
        <Outlet />
      </section>
    </main>
  );
};

export default CoursePlayLayout;
