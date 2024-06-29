// import { useNavigate } from "react-router-dom";
// import userAxios from "../apis/user";
// import adminAxios from "../apis/admin";
// import React, { useEffect, useState } from "react";

// const CreateCourse = () => {
//   // const [courseName, setCourseName] = useState("C1");
//   // const [courseDescription, setCourseDescription] = useState("hello world");
//   // const [coursePrice, setCoursePrice] = useState(1500);
//   const [coursePackages, setCoursePackages] = useState([]);
//   // const [instructorName, setInstructorName] = useState("John Doe");
//   // const [instructorBio, setInstructorBio] = useState("I am a web developer");
//   // const [thumbnail, setThumbnail] = useState(null);
//   // const [avatar, setAvatar] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const getAllPackgesNamesAndIds = async () => {
//     try {
//       setLoading(true);
//       const res = await userAxios.get("/packages");
//       if (res.data.success) {
//         const data = res.data.data;
//         setCoursePackages(data);
//       }
//     } catch (error) {
//       setError(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const [formData, setFormData] = useState({
//   //   name: "C1",
//   //   description: "Some description about the course",
//   //   price: 0,
//   //   includedIn: [],
//   //   instructorName: "Hello World",
//   //   instructorBio: "Some bio about the instructor",
//   //   thumbnail: null,
//   //   avatar: null,
//   // });
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: 0,
//     includedIn: [],
//     instructorName: "",
//     instructorBio: "",
//     thumbnail: null,
//     avatar: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleThumbnailFileChange = (e) => {
//     setFormData({
//       ...formData,
//       thumbnail: e.target.files[0],
//     });
//   };

//   const handleAvatarFileChange = (e) => {
//     setFormData({
//       ...formData,
//       avatar: e.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSubmit = new FormData();
//     for (const key in formData) {
//       formDataToSubmit.append(key, formData[key]);
//     }

//     try {
//       const res = await adminAxios.post("/course", formDataToSubmit, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       if (res.data.success) {
//         console.log("Course created successfully");
//         navigate("/admin/courses");
//       }
//     } catch (error) {
//       console.error("There was an error creating the course:", error);
//     }
//   };
//   useEffect(() => {
//     getAllPackgesNamesAndIds();
//   }, []);

//   return (
//     <section className="p-5">
//       <form>
//         <div className="flex-col flex gap-5">
//           <div>
//             <label htmlFor="name">Course Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="description">Course Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="price">Course Price</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="instructor">Instructor Name</label>
//             <input
//               type="text"
//               name="instructorName"
//               value={formData.instructorName}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="instructor">Instructor Bio</label>
//             <input
//               type="text"
//               name="instructorBio"
//               value={formData.instructorBio}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="flex gap-x-5">
//             {loading ? (
//               <p> loading</p>
//             ) : coursePackages.length > 0 ? (
//               coursePackages.map((coursePackage) => {
//                 return (
//                   <div
//                     className="flex p-3 gap-x-3 bg-black w-max text-white rounded-lg"
//                     key={coursePackage._id}
//                   >
//                     <input
//                       type="checkbox"
//                       value={coursePackage._id}
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setFormData({
//                             ...formData,
//                             includedIn: [
//                               ...formData.includedIn,
//                               e.target.value,
//                             ],
//                           });
//                         } else {
//                           setFormData({
//                             ...formData,
//                             includedIn: formData.includedIn.filter(
//                               (id) => id !== e.target.value
//                             ),
//                           });
//                         }
//                       }}
//                     />
//                     <p>{coursePackage.name}</p>
//                   </div>
//                 );
//               })
//             ) : (
//               <p>No packages available</p>
//             )}
//           </div>
//           <div className="flex gap-5 my-5">
//             <div>
//               <label htmlFor="thumbnail">Course Thumbnail</label>
//               <input
//                 type="file"
//                 name="thumbnail"
//                 onChange={handleThumbnailFileChange}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="thumbnail">Instructor Avatar</label>
//               <input
//                 type="file"
//                 name="thumbnail"
//                 onChange={handleAvatarFileChange}
//                 required
//               />
//             </div>
//           </div>
//         </div>
//         <button onClick={(e) => handleSubmit(e)}>Create Course</button>
//       </form>

//       {error && (
//         <div className="bg-red-500 w-max text-white p-2 rounded-md flex justify-center items-center gap-x-10">
//           {error}
//           <p
//             className="p-3 cursor-pointer bg-blue-700"
//             onClick={() => setError(null)}
//           >
//             x
//           </p>
//         </div>
//       )}
//     </section>
//   );
// };

// export default CreateCourse;

import { useNavigate } from "react-router-dom";
import userAxios from "../apis/user";
import adminAxios from "../apis/admin";
import React, { useEffect, useState } from "react";

const CreateCourse = () => {
  const [coursePackages, setCoursePackages] = useState([]);
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

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    includedIn: [],
    instructorName: "",
    instructorBio: "",
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
  }, []);

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
              htmlFor="instructorName"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Instructor Name
            </label>
            <input
              type="text"
              name="instructorName"
              value={formData.instructorName}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="instructorBio"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Instructor Bio
            </label>
            <input
              type="text"
              name="instructorBio"
              value={formData.instructorBio}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
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
                    value={coursePackage._id}
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
                  <p className="text-sm text-gray-700">{coursePackage.name}</p>
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

// Old code
// import React, { useState } from "react";
// import axios from "../apis/admin";

// const CreateCourseForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     includedIn: "",
//     instructor: "",
//     thumbnail: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       thumbnail: e.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSubmit = new FormData();
//     for (const key in formData) {
//       formDataToSubmit.append(key, formData[key]);
//     }

//     try {
//       const res = await axios.post("/course", formDataToSubmit, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       if (res.data.success) {
//         console.log("Course created successfully");
//       }
//     } catch (error) {
//       console.error("There was an error creating the course:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//         <h2 className="text-2xl font-bold mb-6">Create New Course</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Course Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               required
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Price</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">
//               Included In (Package IDs)
//             </label>
//             <input
//               type="text"
//               name="includedIn"
//               value={formData.includedIn}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Instructor</label>
//             <input
//               type="text"
//               name="instructor"
//               value={formData.instructor}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Thumbnail</label>
//             <input
//               type="file"
//               name="thumbnail"
//               onChange={handleFileChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//           >
//             Create Course
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateCourseForm;
