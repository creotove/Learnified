import React from "react";
import { Tabs } from "../../utils";
import behindTheStory from "../../assets/images/behind-the-story.png";
import students from "../../assets/icons/pack/usersIcon-v1.svg";
import instructors from "../../assets/icons/pack/teachingIcon-v1.svg";
import courses from "../../assets/icons/pack/coursesIcon.svg";
import liveWorkshops from "../../assets/icons/pack/liveLocationIcon.svg";
import searchIcon from "../../assets/icons/pack/searchIcon.svg";
import bookIcon from "../../assets/icons/pack/bookIcon.svg";
import growthIcon from "../../assets/icons/pack/growthCheveronIcon.svg";

const StepsOfGrowth = () => {
  const tabs = [
    {
      title: (
        <div>
          <div className="flex items-center">
            <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center text-white font-bold">
              <img
                src={searchIcon}
                alt="searchIcon"
                className="min-h-10 min-w-10"
              />
            </div>
            <h3 className="text-lg ml-2">Explore</h3>
          </div>
        </div>
      ),
      content: (
        <div className="my-10">
          <div className="flex flex-col gap-20 lg:gap-0 lg:flex-row ">
            <img
              src={behindTheStory}
              alt="behind the story"
              className="object-cover h-96 lg:w-1/2 rounded-r-full"
            />
            <div className="bg-[#FDEBFD] h-96 rounded-l-full  w-full">
              <div className="flex justify-center items-center h-full">
                <div className=" grid-cols-2 grid lg:gap-x-16 gap-y-5 my-10">
                  <div className="flex justify-center items-center flex-col text-center text-xl">
                    <img src={students} className="min-h-20 min-w-20" />
                    <p className="font-bold">1000+</p>
                    <p className="whitespace-nowrap ">Students</p>
                  </div>
                  <div className="flex justify-center items-center flex-col text-center text-xl">
                    <img src={instructors} className="min-h-20 min-w-20" />
                    <p className="font-bold">20+</p>
                    <p className="whitespace-nowrap ">Instructor's</p>
                  </div>
                  <div className="flex justify-center items-center flex-col text-center text-xl">
                    <img src={courses} className="min-h-20 min-w-20" />
                    <p className="font-bold">25+</p>
                    <p className="whitespace-nowrap ">Courses</p>
                  </div>
                  <div className="flex justify-center items-center flex-col text-center text-xl">
                    <img src={liveWorkshops} className="min-h-20 min-w-20" />
                    <p className="font-bold">4000+</p>
                    <p className="whitespace-nowrap ">Live Workshops</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div>
          <div className="flex items-center">
            <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center text-white font-bold">
              <img
                src={bookIcon}
                alt="searchIcon"
                className="min-h-10 min-w-10"
              />
            </div>
            <h3 className="text-lg ml-2">Explore</h3>
          </div>
        </div>
      ),
      content: (
        <div className="my-10">
          <div className="flex flex-col gap-20 lg:gap-0 lg:flex-row ">
            <img
              src={behindTheStory}
              alt="behind the story"
              className="object-cover h-96 lg:w-1/2 rounded-r-full"
            />
            <div className="bg-[#FDEBFD] h-96 rounded-l-full  w-full">
              <div className="flex justify-center items-center h-full">
                <div className=" grid-cols-2 grid lg:gap-x-16 gap-y-5 my-10">
                  <div className="flex justify-center items-center flex-col text-center text-xl">
                    <img src={students} className="min-h-20 min-w-20" />
                    <p className="font-bold">1000+</p>
                    <p className="whitespace-nowrap ">Students</p>
                  </div>
                  <div className="flex justify-center items-center flex-col text-center text-xl">
                    <img src={instructors} className="min-h-20 min-w-20" />
                    <p className="font-bold">20+</p>
                    <p className="whitespace-nowrap ">Instructor's</p>
                  </div>
                  <div className="flex justify-center items-center flex-col text-center text-xl">
                    <img src={courses} className="min-h-20 min-w-20" />
                    <p className="font-bold">25+</p>
                    <p className="whitespace-nowrap ">Courses</p>
                  </div>
                  <div className="flex justify-center items-center flex-col text-center text-xl">
                    <img src={liveWorkshops} className="min-h-20 min-w-20" />
                    <p className="font-bold">4000+</p>
                    <p className="whitespace-nowrap ">Live Workshops</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div>
          <div className="flex items-center">
            <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center text-white font-bold">
              <img
                src={growthIcon}
                alt="searchIcon"
                className="min-h-10 min-w-10"
              />
            </div>
            <h3 className="text-lg ml-2">Explore</h3>
          </div>
        </div>
      ),
      content: (
        <div className="my-10">
          <div className="flex flex-col gap-20 lg:gap-0 lg:flex-row ">
            <img
              src={behindTheStory}
              alt="behind the story"
              className="object-cover h-96 lg:w-1/2 rounded-r-full"
            />
            <div className="bg-[#FDEBFD] h-96 rounded-l-full  w-full">
              <div className="flex justify-center items-center h-full">
                <div className=" grid-cols-2 grid lg:gap-x-16 gap-y-5 my-10">
                  <div className="flex justify-center items-center flex-col text-center text-xl">
                    <img src={students} className="min-h-20 min-w-20" />
                    <p className="font-bold">1000+</p>
                    <p className="whitespace-nowrap ">Students</p>
                  </div>
                  <div className="flex justify-center items-center flex-col text-center text-xl">
                    <img src={instructors} className="min-h-20 min-w-20" />
                    <p className="font-bold">20+</p>
                    <p className="whitespace-nowrap ">Instructor's</p>
                  </div>
                  <div className="flex justify-center items-center flex-col text-center text-xl">
                    <img src={courses} className="min-h-20 min-w-20" />
                    <p className="font-bold">25+</p>
                    <p className="whitespace-nowrap ">Courses</p>
                  </div>
                  <div className="flex justify-center items-center flex-col text-center text-xl">
                    <img src={liveWorkshops} className="min-h-20 min-w-20" />
                    <p className="font-bold">4000+</p>
                    <p className="whitespace-nowrap ">Live Workshops</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <section className="bg-[#FBFBFB]">
      <div className="md:mx-20 sm:mx-5 flex flex-col sm:px-2 sm:py-4 md:px-0 md:py-20 bg-white rounded-lg shadow-2xl py-20">
        <div className="flex justify-center items-center">
          <h2 className="text-4xl font-bold">Steps Of Growth</h2>
        </div>
        <div>
          <div className="mx-5">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsOfGrowth;
