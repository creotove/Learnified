import React from "react";
import { Outlet } from "react-router-dom";
const DefaultLayout = () => {
  return (
    <>
      <section className="flex-1  overflow-x-auto no-scrollbar">
        <Outlet /> {/* The content for each route will be displayed here */}
      </section>
    </>
  );
};

export default DefaultLayout;
