import React from "react";
import optionsIcon from "../../assets/icons/pack/optionIcon.svg";
import { NavLink } from "react-router-dom";

const SmallBox = ({ icon, options, mainContent, subContent }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md p-5 w-full">
      <div className="flex justify-between items-center ">
        <img className="h-16" src={icon || ""} alt="icon" />
        <div className="relative group cursor-pointer">
          <img className="h-8" src={optionsIcon || ""} alt="options" />
          <div className="right-0 absolute  w-52 bg-white border rounded-xl shadow-md hidden group-hover:block cursor-pointer">
            {options.length > 0 ? (
              options.map((option, index) => (
                <NavLink
                  to={option.to}
                  key={index}
                  className="block px-4 rounded-md hover:bg-[#d9d9d9]"
                >
                  <div className="flex gap-3 items-center">
                    <p>{option.name}</p>
                  </div>
                </NavLink>
              ))
            ) : (
              <p className="p-4">No options</p>
            )}
          </div>
        </div>
      </div>
      <h5 className="text-3xl ">{mainContent}</h5>
      <p className="text-gray-500">{subContent}</p>
    </div>
  );
};

export default SmallBox;
