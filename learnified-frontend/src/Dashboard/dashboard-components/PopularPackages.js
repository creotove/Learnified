import React, { useEffect, useState } from "react";
import SingleCourse from "./SingleCourse";
import affiliateAxios from "../../apis/affiliate-user";
import userAxios from "../../apis/user";
import useAuth from "../../hooks/useAuth";

const PopularPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { auth } = useAuth();
  const getPackages = async () => {
    try {
      setLoading(true);
      let res;
      if (auth?.user?.isAffiliated) {
        res = await affiliateAxios.get("/packages");
      } else {
        res = await userAxios.get("/packages");
      }
      if (res.data.success) {
        setError("");
        setPackages(res.data.data);
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPackages();
  }, []);
  return (
    <section className="w-full">
      <h2 className="font-bold text-3xl">Popular Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {packages.map((course) => (
          <SingleCourse
            key={course._id}
            id={course._id}
            name={course?.name}
            image={course?.coverImage}
            enrolledBy={course?.purchasedBy}
            alreadyPurchased={course?.alreadyPurchased}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularPackages;
