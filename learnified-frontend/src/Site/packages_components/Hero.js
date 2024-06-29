import React from "react";
import BreadCrumbs from "./BreadCrumbs";

const Hero = ({ title }) => {
  return (
    <section className="w-full ">
      <div
        className="flex flex-col items-center justify-center w-full  h-96 relative"
        style={{
          backgroundImage: `url("https://themexriver.com/wp/choicy/wp-content/uploads/2024/01/breadcrumb-img-1.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute bg-black w-full h-full opacity-55"></div>
        <h1 className="text-6xl font-bold text-white relative mb-5">{title}</h1>
        <BreadCrumbs title={title} />
      </div>
    </section>
  );
};

export default Hero;
