import adminAxios from "../apis/admin";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddCourseToPackage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [initialPackages, setInitialPackages] = useState([]);
  const [isChecked, setIsChecked] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [error, setError] = useState("");

  const checkState = () => {
    if (!state) {
      navigate(-1);
    }
  };

  const fetchAllPackagesWithCourses = async () => {
    try {
      setLoading(true);
      const res = await adminAxios.get(`/packages?courses=${true}`);
      if (res.data.success) {
        const data = res.data.data;
        setPackages(data);
        const initialIsChecked = {};
        data.forEach((packageItem) => {
          initialIsChecked[packageItem._id] = packageItem?.courses?.includes(
            state.courseId
          );
        });
        setIsChecked(initialIsChecked);
        setInitialPackages(initialIsChecked);
      }
    } catch (error) {
      setError(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (packageId) => {
    setUpdateMode(true);
    setIsChecked((prevState) => ({
      ...prevState,
      [packageId]: !prevState[packageId],
    }));
  };

  const handleUpdateCourse = async () => {
    try {
      const data = Object.keys(isChecked).filter((key) => isChecked[key]);
      const res = await adminAxios.patch(`/course/${state.courseId}`, {
        includedIn: data,
      });
      if (res.data.success) {
        setError("Course added to packages successfully");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    checkState();
    fetchAllPackagesWithCourses();
  }, []);

  return (
    <section className="p-5">
      <p className="text-lg font-semibold mb-4">Add a course to packages</p>
      {error && (
        <div className="bg-red-500 text-white p-2 rounded-md flex items-center mb-4 gap-x-2">
          {error}
          <p
            className="p-2 bg-blue-700 cursor-pointer rounded-md"
            onClick={() => setError("")}
          >
            x
          </p>
        </div>
      )}
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          packages.map((packageItem) => (
            <div key={packageItem._id}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isChecked[packageItem._id]}
                  onChange={() => handleCheckboxChange(packageItem._id)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-2 focus:ring-blue-300"
                />
                <span className="text-gray-800">{packageItem.name}</span>
              </label>
            </div>
          ))
        )}
        {updateMode && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleUpdateCourse}
              className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Update
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setUpdateMode(false);
                setIsChecked(initialPackages);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AddCourseToPackage;
