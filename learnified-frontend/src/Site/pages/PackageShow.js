import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import packageImage from "../../assets/images/packages/contentPrenuer.png";
import certificateIcon from "../../assets/icons/pack/certificateIcon-v2.svg";
import supportIcon from "../../assets/icons/pack/customerSupportIcon.svg";
import axios from "../../apis/user";
import useSiteAuth from "../../hooks/useSiteAuth";

const PackageShow = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [packageData, setPackageData] = useState({});
  const [error, setError] = useState(null);
  const { siteAuth } = useSiteAuth();
  const navigate = useNavigate();

  const fetchPackageData = async () => {
    try {
      const res = await axios.get(`/packages/${id}`);
      if (res.data.success) {
        setPackageData(res.data.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackageData();
  }, [id]);

  return (
    <section className="lg:mx-28 mx-5 lg:py-10">
      <div className="flex flex-col lg:flex-row">
        <div>
          <h1 className="gradPink text-3xl lg:text-6xl">{packageData?.name}</h1>
          <h1 className="text-3xl lg:text-6xl pb-5">Package!</h1>
          <img
            className="h-full w-full object-cover  lg:hidden"
            src={packageImage}
          />
          <p className="font-medium lg:text-2xl">{packageData?.description}</p>
          <p className="border-b border-black w-min whitespace-nowrap text-3xl my-2">
            MRP - {packageData?.price}/-
          </p>
          <p className="gradPink text-2xl mb-3">With Promocode </p>
          <p className=" gradPink lg:text-8xl text-6xl">
            ₹{packageData?.priceWithPromoCode}
          </p>
        </div>
        <div className="">
          <img
            className="h-full w-full object-cover transform scale-125 hidden lg:block"
            src={packageData?.coverImage}
            alt="Package Image"
          />
        </div>
      </div>
      {/* Course Some about */}
      <div className="flex flex-col lg:flex-row font-medium text-center my-10 gap-5">
        <div className="border border-black rounded-3xl flex gap-5 p-5 flex-col lg:flex-row">
          <div>
            <p className="gradPink text-[4.2rem] leading-none">
              {packageData?.courses?.length}
            </p>
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
          {packageData?.certification && (
            <>
              <span className="border-r-2 m-3 border-black"></span>

              <div className="flex justify-center items-center flex-col">
                <img src={certificateIcon} />
                <p className="text-3xl capitalize">CERTIFICATE</p>
              </div>
            </>
          )}
          <span className="border-r-2 m-3 border-black"></span>

          <div className="flex justify-center items-center flex-col">
            <img src={supportIcon} />
            <p className="text-3xl capitalize">SUPPORT</p>
          </div>
        </div>
        <div className="w-full p-10">
          <button
            className="gradPinkBg p-5 rounded-3xl w-full h-full text-4xl text-white"
            onClick={() => {
              siteAuth?.user ? console.log("Enroll Now") : navigate("/log-in");
            }}
          >
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
