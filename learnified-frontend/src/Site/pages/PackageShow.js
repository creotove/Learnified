import React from "react";
import { useParams } from "react-router-dom";
import packageImage from "../../assets/images/packages/contentPrenuer.png";
import certificateIcon from "../../assets/icons/pack/certificateIcon-v2.svg";
import supportIcon from "../../assets/icons/pack/customerSupportIcon.svg";

const PackageShow = () => {
  const { id } = useParams();
  return (
    <section className="lg:mx-28 mx-5 py-10">
      {/* Course Price and Image */}
      <div className="flex ">
        <div>
          <h1 className="gradPink text-6xl">Content Preneur</h1>
          <h1 className="text-6xl pb-5">Package!</h1>
          <p className="font-medium lg:text-2xl">
            With our all-inclusive Contentpreneur Package, you can tap into the
            world of your imagination and make an income out of your work that
            you love to do. This carefully chosen collection of courses is
            intended to provide you, the fundamental and practical knowledge and
            abilities required to succeed in the fast-paced field of graphic
            designing, video editing, content writing and digital content
            creation. The Contentpreneur Package is your ticket to success
            whether you want to work as a freelancer, designer, editor, writer
            or an agency owner.
          </p>
          <p className="border-b border-black w-min whitespace-nowrap text-3xl my-2">
            MRP - ₹2948/-
          </p>
          <p className="gradPink text-2xl mb-3">With Promocode </p>
          <p className=" gradPink text-8xl">₹1699</p>
        </div>
        <div className="">
          <img
            className="h-full w-full object-cover transform scale-125"
            src={packageImage}
          />
        </div>
      </div>
      {/* Course Some about */}
      <div className="flex font-medium text-center my-10 gap-5">
        <div className="border border-black rounded-3xl flex gap-5 p-5">
          <div>
            <p className="gradPink text-[4.2rem] leading-none">8</p>
            <p className="text-3xl capitalize">Courses</p>
          </div>
          {/* Divider */}
          <span className="border-r-2 m-3 border-black"></span>
          <div>
            <p className="gradPink text-2xl">
              ENGLISH &<br /> <span className="text-3xl">HINDI</span>
            </p>
            <p className="text-3xl capitalize">LANGUAGE</p>
          </div>
          <span className="border-r-2 m-3 border-black"></span>

          <div className="flex justify-center items-center flex-col">
            <img src={certificateIcon} />
            <p className="text-3xl capitalize">CERTIFICATE</p>
          </div>
          <span className="border-r-2 m-3 border-black"></span>

          <div className="flex justify-center items-center flex-col">
            <img src={supportIcon} />
            <p className="text-3xl capitalize">SUPPORT</p>
          </div>
        </div>
        <div className="w-full p-10">
          <button className="gradPinkBg p-5 rounded-3xl w-full h-full text-4xl text-white">
            Enroll Now
          </button>
        </div>
        <div></div>
      </div>
      <div className="mx-20 gradPinkBg rounded-3xl">
        <h1 className="text-center courseHeading text-6xl font-semibold ">
          Courses
        </h1>
      </div>
    </section>
  );
};

export default PackageShow;
