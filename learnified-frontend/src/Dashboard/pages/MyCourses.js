import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../apis/affiliate-user";
import useAuth from "../../hooks/useAuth";

const MyCourses = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getMyCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/my-courses/${auth?.user?._id}`);
      if (res.data.success) {
        setMyCourses(res.data.data);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  if (!auth?.user?.isAffiliated) {
    return (
      <div className="p-3">
        <h1>You need to become an affiliate first to access this page</h1>
        <p>
          Join our affiliate program and earn money by promoting our courses
        </p>
        <button onClick={() => navigate("/become-an-affiliate")}>Become</button>
      </div>
    );
  }

  return (
    <section>
      {error && (
        <div className="bg-red-500 w-max text-white p-2 rounded-md flex justify-center items-center gap-x-10">
          {error}
          <p
            className="p-3 cursor-pointer bg-blue-700"
            onClick={() => setError(null)}
          >
            x
          </p>
        </div>
      )}
      <h1>My Courses</h1>
      <p>Here are the courses you have enrolled in</p>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <p>Loading...</p>
        ) : myCourses.length > 0 ? (
          myCourses.map((course) => {
            return (
              <div
                key={course._id}
                className="bg-black text-white rounded-xl cursor-pointer"
                onClick={() => {
                  navigate(`/dashboard/my-courses/${course._id}`, {
                    state: { courseId: course._id },
                  });
                }}
              >
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  className="min-w-72 max-w-72 min-h-56 max-h-56 rounded-t-xl"
                />
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <br />
                <img
                  src={course?.instructor?.avatar}
                  className="
                w-10 h-10 rounded-full"
                  alt={course?.instructor?.name}
                />
                <p>{course?.instructor?.name}</p>
              </div>
            );
          })
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </section>
  );
};

export default MyCourses;
