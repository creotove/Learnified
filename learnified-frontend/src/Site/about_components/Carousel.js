import React, { useState, useEffect, useRef } from "react";

const data = [
  {
    avatar: "https://via.placeholder.com/300?text=Image+1",
    name: "NAWAB ADIL",
    title: "CEO & FOUNDER",
    description:
      "The fastest growing ed-tech in the country. IDIGITALPRENEUR promises holistic growth to each and every individual in our community. By providing them an exposure way beyond the world of marketing also. We work on helping you improve your knowledge, Implementation, Personality and Presentation.",
  },
  {
    avatar: "https://via.placeholder.com/300?text=Image+2",
    name: "Devendra Singh",
    title: "CEO & FOUNDER",
    description:
      "The fastest growing ed-tech in the country. IDIGITALPRENEUR promises holistic growth to each and every individual in our community. By providing them an exposure way beyond the world of marketing also. We work on helping you improve your knowledge, Implementation, Personality and Presentation.",
  },
  {
    avatar: "https://via.placeholder.com/300?text=Image+2",
    name: "Devendra Singh",
    title: "CEO & FOUNDER",
    description:
      "The fastest growing ed-tech in the country. IDIGITALPRENEUR promises holistic growth to each and every individual in our community. By providing them an exposure way beyond the world of marketing also. We work on helping you improve your knowledge, Implementation, Personality and Presentation.",
  },
];

const Carousel = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const intervalRef = useRef(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentTab((prevTab) => (prevTab + 1) % data.length);
    }, 5000);
  };

  const clearAndRestartInterval = () => {
    clearInterval(intervalRef.current);
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleDotClick = (index) => {
    setCurrentTab(index);
    clearAndRestartInterval();
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex flex-col items-center md:flex-row bg-white p-6">
        <div className="flex flex-col items-center ">
          <img
            src={data[currentTab].avatar}
            alt={data[currentTab].name}
            className="w-32 h-32 lg:min-w-96 lg:min-h-96 rounded-full mb-4"
          />
          <div className="flex justify-center   mt-4">
            <ul className="flex space-x-2">
              {data.map((_, i) => (
                <li
                  key={i}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    currentTab === i ? "bg-purple-500" : "bg-gray-300"
                  }`}
                  onClick={() => handleDotClick(i)}
                ></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center md:text-left md:ml-6 flex-grow">
          <h2 className="text-4xl font-bold text-purple-500">
            {data[currentTab].name}
          </h2>
          <p className="text-sm md:text-base mt-2">
            {data[currentTab].description}
          </p>
          <p className="text-purple-500 font-semibold mt-2">
            {data[currentTab].title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
