import React from "react";

const Subscribe = () => {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pinkGrad container  rounded-[73.5px] flex justify-center items-center border-2 border-white mx-auto py-2 px-3">
      <div className="flex flex-wrap justify-between w-full mx-5 py-3 items-center">
        <input
          type="text"
          placeholder="Enter Your Email Address"
          className="text-2xl text-white bg-transparent outline-0  border-0 focus:outline-none focus:border-none placeholder:text-white"
        />
        <button className="px-6 py-2 bg-black text-white rounded-[73.5px]">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
