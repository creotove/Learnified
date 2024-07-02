import React from "react";
import students from "../../assets/images/students.png";
import arrow from "../../assets/images/arrow.png";

const Hero = () => {
  return (
    <div className="lg:h-screen ">
      <div className="flex justify-center items-end">
        <div className="">
          <img
            src={students}
            alt="Students"
            height={900}
            width={900}
            className=""
          />
        </div>
        <div className="max-w-lg relative mb-32 flex-col justify-center items-center lg:items-start hidden lg:flex ">
          <p className="text-[#D900E7] text-3xl">Welcome to Learnyfied</p>
          <h1 className="text-4xl lg:text-7xl font-extrabold text-black mb-4 whitespace-nowrap hidden lg:block">
            Let's Learn <br />
            Beyond Limits
          </h1>
          <p className="text-[#D900E7] mb-6 text-3xl hidden lg:block">
            Making Education affordable &<br /> Accessible Across
          </p>
          <div className="lg:absolute -rotate-12 lg:-top-60 lg:left-56">
            <img src={arrow} className="-rotate-45 w-3/4" />
          </div>
          {/* <div
            style={{
              clipPath: "polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)",
            }}
            className="lg:absolute -rotate-12 lg:-top-60 lg:right-0 bg-yellow-300 text-white font-bold py-3 px-16 w-min whitespace-nowrap text-4xl italic"
          >
            Hello world
          </div>

          <div
            style={{
              clipPath: "polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)",
            }}
            className="lg:absolute -rotate-12 lg:-top-40 lg:right-10 bg-purple-400 text-white font-bold py-3 px-16 w-min whitespace-nowrap text-4xl italic"
          >
            World Hello
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
