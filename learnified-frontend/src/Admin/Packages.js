import { useNavigate } from "react-router-dom";
import axios from "../apis/user";
import React, { useEffect, useState } from "react";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const getPackage = async () => {
    try {
      const res = await axios.get("/packages");
      if (res.data.success) {
        setPackages(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddCourse = (e, packageId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/admin/add-course", { state: { packageId } });
  };
  const handleEdit = (e, packageId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/admin/create-package", { state: { edit: true, packageId } });
  };
  useEffect(() => {
    getPackage();
  }, []);
  return (
    <div className="flex flex-wrap m-5 gap-5">
      {packages.length > 0 ? (
        packages.map((pack) => (
          <div
            key={pack._id}
            className="p-5 bg-white shadow-lg rounded-lg w-full sm:w-1/2 lg:w-1/3"
          >
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              {pack.name}
            </h1>
            <p className="text-gray-600 mb-4">{pack.description}</p>
            <p className="text-gray-600 mb-2">Price: ${pack.price}</p>
            <p className="text-gray-600 mb-4">Promo Codes: {pack.promocodes}</p>
            <div className="flex gap-3">
              <button
                onClick={(e) => handleAddCourse(e, pack._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Add Courses
              </button>
              <button
                onClick={(e) => handleEdit(e, pack._id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Edit
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No packages available</p>
      )}
    </div>
  );
};

export default Packages;
