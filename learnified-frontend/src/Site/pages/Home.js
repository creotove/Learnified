import React from "react";
import Hero from "../home_components/Hero";
import CourseShowCase from "../home_components/CourseShowCase";
import TrustedBy from "../home_components/TrustedBy";
import MyMarquee from "../home_components/Marquee";
import StepsOfGrowth from "../home_components/StepsOfGrowth";
import RecentBlogs from "../home_components/RecentBlogs";
import Subscribe from "../home_components/Subscribe";
import Carousel from "../home_components/Carousel";

const Home = () => {
  return (
    <main className="w-full">
      <section>
        <div className="z-10 lg:relative">
          <Hero />
          <CourseShowCase />
          <div className="bg-white">
            <TrustedBy />
          </div>
        </div>
      </section>
      <Carousel />
      <Carousel />
      {/* 2 carousel section remaining */}
      <MyMarquee direction={"left"} />
      <StepsOfGrowth />
      <MyMarquee direction={"right"} />
      {/* One section of images remaining */}
      <RecentBlogs />
    </main>
  );
};

export default Home;
