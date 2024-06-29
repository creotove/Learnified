import React from "react";
import { PURPLE_COLOR_CODES } from "../../constants";
const SingleBlogPost = ({ label, title, author, date, image }) => {
  return (
    <>
      <div className="">
        <div className="">
          <img
            src={image}
            alt={title}
            className="w-[33rem] h-96 object-cover rounded-lg"
          />
          <div className="">
            <div
              style={{ backgroundColor: PURPLE_COLOR_CODES.NORMAL_SHADE }}
              className={`font-bold text-white p-2 rounded my-4 w-max`}
            >
              {label}
            </div>
            <h4 className="text-2xl font-bold">{title}</h4>
            <div className="flex items-center mt-2">
              <img
                src={"https://picsum.photos/200"}
                alt="author"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-2">
                <p className="text-sm text-gray-500">{author}</p>
                <p className="text-sm text-gray-500">{date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlogPost;
