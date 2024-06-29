import React from "react";
import MainContent from "./MainContent";

const Content = () => {
  return (
    <section className="bg-white m-20 ">
      {/* 2 sections of side list and content */}
      <div className="flex bg-red-400">
        <MainContent />
        <div>Side list</div>
      </div>
    </section>
  );
};

export default Content;
