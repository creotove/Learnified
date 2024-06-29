import React from "react";
import aboutUsMan from "../../assets/images/aboutUsMan.png";
import aboutUsVisionMan from "../../assets/images/aboutUsVisionMan.png";
import { Tabs } from "../../utils-components";
import searchIcon from "../../assets/icons/pack/searchIcon.svg";
import targetIcon from "../../assets/icons/pack/targetIcon.svg";
import lightBulbIcon from "../../assets/icons/pack/lightBulbIcon.svg";
import Carousel from "../about_components/Carousel";

const About = () => {
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
    },
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
    },
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
    },
  ];
  return (
    <section className="lg:mx-28 mx-5 py-10">
      {/* Heading */}
      <h1 className="lg:text-7xl text-3xl font-bold text-center">ABOUT US</h1>
      {/* About Us */}
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-5">
        <div className="">
          <p className="lg:text-8xl text-2xl font-medium">What is</p>
          <p className="lg:text-8xl gradPink font-medium pb-5 text-2xl">
            LearnyFied?
          </p>
          <div className="lg:w-[50rem]">
            <p className="font-medium lg:text-2xl">
              The fastest growing ed-tech in the country. IDIGITALPRENEUR
              promises holistic growth to each and every individual in our
              community. By providing them an exposure way beyond the world of
              marketing also. We work on helping you improve your knowledge,
              Implementation, Personality and Presentation. ?
            </p>
          </div>
        </div>
        <div className="relative">
          <img className="hidden lg:block" src={aboutUsMan} alt="LearnyFied" />
          <span className="gradPinkBg absolute bottom-0 left-14 -z-10 w-full h-72 rounded-[30px]"></span>
        </div>
      </div>
      {/* Tabs */}
      <div className="py-32">
        <h2 className="text-4xl font-bold text-center mb-5">Steps Of Growth</h2>
        <Tabs tabs={tabs} />
      </div>
      {/* Vision  and  Mission */}
      <div className="flex gap-20">
        <div>
          <img
            src={aboutUsVisionMan}
            className="rounded-xl  h-full object-cover"
            alt="about"
          />
        </div>
        <div>
          <div className="flex items-start gap-5">
            <img className="" src={targetIcon} alt="targetICon" />
            <div className="">
              <p className="lg:text-8xl gradPink font-medium pb-5 text-2xl">
                Our Mission
              </p>
              <p className="font-medium lg:text-2xl">
                The fastest growing ed-tech in the country. IDIGITALPRENEUR
                promises holistic growth to each and every individual in our
                community. By providing them an exposure way beyond the world of
                marketing also. We work on helping you improve your knowledge,
                Implementation, Personality and Presentation.{" "}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <img src={lightBulbIcon} alt="targetICon" />
            <div>
              <p className="lg:text-8xl gradPink font-medium pb-5 text-2xl">
                Our Vision
              </p>
              <p className="font-medium lg:text-2xl">
                The fastest growing ed-tech in the country. IDIGITALPRENEUR
                promises holistic growth to each and every individual in our
                community. By providing them an exposure way beyond the world of
                marketing also. We work on helping you improve your knowledge,
                Implementation, Personality and Presentation.
              </p>
            </div>
          </div>
        </div>
        {/* Divider */}
      </div>
      {/* Divider */}
      <div className="bg-black rounded-lg w-full h-1 my-16"></div>
      <Carousel />
    </section>
  );
};

export default About;
