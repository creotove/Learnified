// import { useNavigate } from "react-router-dom";
// import userAxios from "../apis/admin";
// import React, { useEffect, useState } from "react";

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const getCourses = async () => {
//     try {
//       setLoading(true);
//       const res = await userAxios.get("/courses");
//       if (res.data.success) {
//         const data = res.data.data;
//         setCourses(data);
//       }
//     } catch (error) {
//       console.log(error);
//       setError(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     getCourses();
//   }, []);
//   return (
//     <section>
//       <div className="flex flex-wrap m-5 gap-5">
//         {error && (
//           <div className="bg-red-500 w-max text-white p-2 rounded-md flex justify-center items-center gap-x-10">
//             {error}
//             <p
//               className="p-3 cursor-pointer bg-blue-700"
//               onClick={() => setError(null)}
//             >
//               x
//             </p>
//           </div>
//         )}
//         {loading ? (
//           <p>Loading...</p>
//         ) : courses.length > 0 ? (
//           courses.map((course) => (
//             <div
//               key={course._id}
//               className="p-3 bg-black text-white w-max rounded-lg"
//             >
//               <h1>
//                 Name: <b>{course.name}</b>
//               </h1>
//               <p>
//                 Description: <b>{course.description}</b>
//               </p>
//               <p>
//                 Price: <b>{course.price}</b>
//               </p>
//               <p>
//                 Number of packages in:{" "}
//                 <b>{course.includedIn ? course.includedIn.length : 0}</b>
//               </p>
//               <div className="flex gap-x-3">
//                 <button
//                   onClick={() => {
//                     navigate("/admin/add-to-package", {
//                       state: { courseId: course._id },
//                     });
//                   }}
//                 >
//                   Add to package
//                 </button>
//                 <button
//                   onClick={() => {
//                     navigate("/admin/add-videos-to-course", {
//                       state: { courseId: course._id },
//                     });
//                   }}
//                 >
//                   Add Videos to package
//                 </button>
//                 <button>Edit</button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No courses available</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Courses;

import { useNavigate } from "react-router-dom";
import userAxios from "../apis/admin";
import React, { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getCourses = async () => {
    try {
      setLoading(true);
      const res = await userAxios.get("/courses");
      if (res.data.success) {
        const data = res.data.data;
        setCourses(data);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <section className="p-5">
      <div className="flex flex-wrap m-5 gap-5">
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
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="p-5 bg-white shadow-lg rounded-lg w-full sm:w-1/2 lg:w-1/3"
            >
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Name: <b>{course.name}</b>
              </h1>
              <p className="text-gray-600 mb-4">
                Description: <b>{course.description}</b>
              </p>
              <p className="text-gray-600 mb-2">
                Price: <b>${course.price}</b>
              </p>
              <p className="text-gray-600 mb-4">
                Number of packages in:{" "}
                <b>{course.includedIn ? course.includedIn.length : 0}</b>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    navigate("/admin/add-to-package", {
                      state: { courseId: course._id },
                    });
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Add to Package
                </button>
                <button
                  onClick={() => {
                    navigate("/admin/add-videos-to-course", {
                      state: { courseId: course._id },
                    });
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Add Videos
                </button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300">
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No courses available</p>
        )}
      </div>
    </section>
  );
};

export default Courses;
