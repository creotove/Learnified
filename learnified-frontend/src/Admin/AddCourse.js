import { useNavigate } from "react-router-dom";
import userAxios from "../apis/user";
import adminAxios from "../apis/admin";
import React, { useEffect, useState } from "react";

const CreateCourse = () => {
  const [coursePackages, setCoursePackages] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllPackagesNamesAndIds = async () => {
    try {
      setLoading(true);
      const res = await userAxios.get("/packages");
      if (res.data.success) {
        const data = res.data.data;
        setCoursePackages(data);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const getInstructorNamesAndIds = async () => {
    try {
      const res = await userAxios.get("/instructors");
      if (res.data.success) {
        const data = res.data.data;
        setInstructors(data);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    includedIn: [],
    instructorId: "",
    thumbnail: null,
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleThumbnailFileChange = (e) => {
    setFormData({
      ...formData,
      thumbnail: e.target.files[0],
    });
  };

  const handleAvatarFileChange = (e) => {
    setFormData({
      ...formData,
      avatar: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      const res = await adminAxios.post("/course", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        console.log("Course created successfully");
        navigate("/admin/courses");
      }
    } catch (error) {
      console.error("There was an error creating the course:", error);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllPackagesNamesAndIds();
    getInstructorNamesAndIds();
  }, []);

  useEffect(() => {
    if (instructors.length > 0) {
      setFormData({
        ...formData,
        instructorId: instructors[0]._id,
      });
    }
  }, [instructors]);

  return (
    <section className="p-5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Course Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Course Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Course Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="instructorId"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Instructor
            </label>
            <select
              name="instructorId"
              value={formData.instructorId}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select an instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.firstName} {instructor.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-600">
              Included In Packages
            </label>
            {loading ? (
              <p>Loading...</p>
            ) : coursePackages.length > 0 ? (
              coursePackages.map((coursePackage) => (
                <div
                  key={coursePackage._id}
                  className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg"
                >
                  <input
                    type="checkbox"
                    id={coursePackage._id}
                    value={coursePackage._id}
                    htmlFor={coursePackage._id}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          includedIn: [...formData.includedIn, e.target.value],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          includedIn: formData.includedIn.filter(
                            (id) => id !== e.target.value
                          ),
                        });
                      }
                    }}
                    className="focus:ring-purple-500 text-purple-600 border-gray-300 rounded"
                  />

                  <p
                    id={coursePackage._id}
                    htmlFor={coursePackage._id}
                    className="text-sm text-gray-700"
                  >
                    {coursePackage.name}
                  </p>
                </div>
              ))
            ) : (
              <p>No packages available</p>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="thumbnail"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Course Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                onChange={handleThumbnailFileChange}
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                required
              />
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Instructor Avatar
              </label>
              <input
                type="file"
                name="avatar"
                onChange={handleAvatarFileChange}
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
          disabled={loading}
        >
          {loading ? "Loading..." : "Create Course"}
        </button>

        {error && (
          <div className="mt-4 p-2 text-sm text-red-700 bg-red-100 rounded">
            {error}
            <button
              className="ml-2 p-1 bg-blue-700 text-white rounded"
              onClick={() => setError(null)}
            >
              x
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default CreateCourse;
