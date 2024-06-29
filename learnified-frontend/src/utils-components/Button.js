import React from "react";

const Button = ({ label, task, style, varient }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (task) task(e);
    else console.log("No task provided");
  };
  return varient === "outlined" ? (
    <button
      className={`text-[#a454eb] border-[#a454eb] border rounded-md h-10 px-2 ${style}`}
      onClick={handleClick}
    >
      {label}
    </button>
  ) : (
    <button
      className={`text-white bg-[#a454eb] rounded-md h-10 px-2 ${style}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
