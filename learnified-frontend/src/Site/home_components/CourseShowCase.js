import axios from "../../apis/user";
import React, { useEffect, useState } from "react";
import { RUPEE_ICON } from "../../constants";
import { useNavigate } from "react-router-dom";
import navigatPackageIconPink from "../../assets/icons/pack/navigateCourseIcon-Pink.svg";

const CourseShowCase = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const Skeleton = () => {
    return (
      <div className="h-56 rounded-2xl border-gray-300 border-[3px] text-black container mx-auto flex justify-evenly items-center px-10 animate-pulse">
        <div className="bg-gray-300 h-10 w-10 rounded-lg"></div>
        <div className="flex-1 ms-10">
          <div className="bg-gray-300 h-6 w-1/2 mb-2 rounded"></div>
          <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
        </div>
        <div className="bg-gray-300 h-10 w-10 rounded"></div>
      </div>
    );
  };

  const Error = ({ message }) => {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
      </div>
    );
  };

  const getPackages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/packages");
      if (res.data.success) {
        setError("");
        setPackages(res.data.data);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <section className="bg-white lg:h-screen">
      <div className="flex justify-center items-center flex-col gap-5 lg:py-44 py-48 px-5">
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : error ? (
          <Error message={error} />
        ) : packages && packages.length > 0 ? (
          packages.slice(0, 3).map((item, idx) => (
            <div
              onClick={() => {
                navigate(`/packages/${item._id}`);
              }}
              onMouseEnter={() => setActiveIndex(idx)}
              key={idx}
              className={`relative group transition-all rounded-2xl border-gray-300 border-[3px] hover:border-purple-500 text-black container mx-auto hover:shadow-lg cursor-pointer px-10 flex lg:justify-center flex-col lg:flex-row lg:items-center ${
                activeIndex === idx ? "lg:h-72 h-screen" : "lg:h-48 h-screen"
              }`}
            >
              <div className="flex gap-5 items-center lg:block">
                <div className="bg-purple-300 text-xl md:text-3xl lg:text-5xl px-5 py-5 rounded-lg font-bold w-min lg:my-10 my-5">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
                </div>
                <h1 className="text-xl font-bold lg:hidden">{item.name}</h1>
              </div>

              <div className="flex-1 lg:ms-10">
                <h1 className="text-4xl font-bold hidden lg:block">
                  {item.name}
                </h1>
                <div className="flex flex-col gap-2">
                  {/* <p className="text-xl bg-purple-500 px-3 py-1 w-min whitespace-nowrap text-white rounded-full">
                    price {RUPEE_ICON + item.price}
                  </p> */}
                  <p className="lg:text-3xl text-xl px-3 py-1 text-gray-700 font-bold rounded-full">
                    {item?.tagLine?.length > 50
                      ? item?.tagLine.slice(0, 50) + "..."
                      : item?.tagLine}
                  </p>
                </div>
              </div>
              {activeIndex === idx && (
                <img
                  src="https://themexriver.com/wp/choicy/wp-content/uploads/2024/01/t3-img-1.webp"
                  alt="course"
                  className="lg:absolute anim right-28"
                />
              )}
              <div className="justify-self-end ms-auto my-5">
                <img
                  src={navigatPackageIconPink}
                  alt="navigate"
                  className="h-12 group-hover:filter group-hover:grayscale"
                />
              </div>
            </div>
          ))
        ) : (
          <p>No packages available</p>
        )}
      </div>
    </section>
  );
};

export default CourseShowCase;
