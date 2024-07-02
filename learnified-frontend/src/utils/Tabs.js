import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="">
      <div className="flex flex-col flex-wrap lg:flex-row justify-center gap-10">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className=" cursor-pointer shadow-md p-3 rounded-lg lg:w-96"
            onClick={() => setActiveTab(index)}
          >
            <div
              className={`${
                activeTab === index
                  ? "bg-[#da0aea] border-white border-2 rounded-full"
                  : "bg-[#bc4ec4] border-white border-2 rounded-full"
              } rounded-full h-3 flex justify-center items-center`}
            >
              <div className="bg-[#da0aea] border-white border-2 w-4 h-4 rounded-full"></div>
            </div>

            <div
              className={`${
                activeTab === index
                  ? "bg-gray-200 text-gray-700"
                  : "bg-gray-100 text-gray-500"
              } py-2 flex justify-center  border-r border-gray-300 rounded-lg mt-8`}
            >
              {tab.title}
            </div>
          </div>
        ))}
      </div>
      <div>{tabs[activeTab]?.content}</div>
    </div>
  );
};
export default Tabs;
