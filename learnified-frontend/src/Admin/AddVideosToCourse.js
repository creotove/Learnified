// import axios from "../apis/admin";
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const AddVideosToCourse = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [videos, setVideos] = useState([{}]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const checkState = () => {
//     if (!state) {
//       navigate(-1);
//     }
//   };

//   const addVideosToCourse = async (e, courseId, videos) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setLoading(true);

//     const formData = new FormData();
//     videos.forEach((video, index) => {
//       formData.append(`videos[${index}][title]`, video.title);
//       formData.append(`videos[${index}][videoFile]`, video.videoFile);
//       formData.append(`videos[${index}][thumbnailFile]`, video.thumbnailFile);
//     });

//     try {
//       const res = await axios.post(`/course/${courseId}/videos-v2`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       if (res.data.success) {
//         console.log("Videos added to course successfully");
//         // navigate("/courses");
//       }
//     } catch (error) {
//       console.log(error);
//       setError(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkState();
//   }, []);

//   return (
//     <section className="p-5">
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
//       <h1>Add Videos To Course</h1>
//       <form>
//         {loading && <p>Loading...</p>}
//         {videos.map((video, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               placeholder="Video Title"
//               onChange={(e) => {
//                 videos[index].title = e.target.value;
//                 setVideos([...videos]);
//               }}
//             />
//             <input
//               type="file"
//               placeholder="Video file"
//               onChange={(e) => {
//                 videos[index].videoFile = e.target.files[0];
//                 setVideos([...videos]);
//               }}
//             />
//             <input
//               type="file"
//               placeholder="Thumbnail file"
//               onChange={(e) => {
//                 videos[index].thumbnailFile = e.target.files[0];
//                 setVideos([...videos]);
//               }}
//             />
//           </div>
//         ))}
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             setVideos([...videos, {}]);
//           }}
//         >
//           Add Video
//         </button>
//         <div className="my-4">
//           <button onClick={(e) => addVideosToCourse(e, state.courseId, videos)}>
//             Submit
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default AddVideosToCourse;

import axios from "../apis/admin";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddVideosToCourse = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkState = () => {
    if (!state) {
      navigate(-1);
    }
  };

  const addVideosToCourse = async (e, courseId, videos) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    const formData = new FormData();
    videos.forEach((video, index) => {
      formData.append(`videos[${index}][title]`, video.title);
      formData.append(`videos[${index}][videoFile]`, video.videoFile);
      formData.append(`videos[${index}][thumbnailFile]`, video.thumbnailFile);
    });

    try {
      const res = await axios.post(`/course/${courseId}/videos-v2`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        console.log("Videos added to course successfully");
        // navigate("/courses");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkState();
  }, []);

  return (
    <section className="p-5">
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
      <h1 className="text-xl font-semibold mb-4">Add Videos To Course</h1>
      <form>
        {loading && <p className="text-gray-500">Loading...</p>}
        {videos.map((video, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Video Title"
              onChange={(e) => {
                const newVideos = [...videos];
                newVideos[index].title = e.target.value;
                setVideos(newVideos);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
            <input
              type="file"
              onChange={(e) => {
                const newVideos = [...videos];
                newVideos[index].videoFile = e.target.files[0];
                setVideos(newVideos);
              }}
              className="mt-2"
            />
            <input
              type="file"
              onChange={(e) => {
                const newVideos = [...videos];
                newVideos[index].thumbnailFile = e.target.files[0];
                setVideos(newVideos);
              }}
              className="mt-2"
            />
          </div>
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();
            setVideos([...videos, {}]);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add Video
        </button>
        <button
          onClick={(e) => addVideosToCourse(e, state.courseId, videos)}
          className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddVideosToCourse;

// Old Code
// // AddVideosToCourse.js
// import axios from "../apis/admin";
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const AddVideosToCourse = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [videos, setVideos] = useState([{}]);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState("");

//   const checkState = () => {
//     if (!state) {
//       navigate(-1);
//     }
//   };

//   const addVideosToCourse = async (e, courseId, videos) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setLoading(true);

//     const formData = new FormData();
//     videos.forEach((video, index) => {
//       formData.append(`videos[${index}][title]`, video.title);
//       formData.append(`videos[${index}][videoFile]`, video.videoFile);
//       formData.append(`videos[${index}][thumbnailFile]`, video.thumbnailFile);
//     });

//     try {
//       const res = await axios.post(`/course/${courseId}/videos-v2`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//           const { loaded, total } = progressEvent;
//           const percentCompleted = Math.round((loaded * 100) / total);
//           setProgress(percentCompleted);
//         },
//       });
//       if (res.data.success) {
//         navigate("/courses");
//       }
//     } catch (error) {
//       console.log(error);
//       setError(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkState();
//   }, []);

//   return (
//     <section>
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
//       <h1>Add Videos To Course</h1>
//       <form>
//         {loading && <p>Loading...</p>}
//         {progress > 0 && <p>Upload Progress: {progress}%</p>}
//         {videos.map((video, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               placeholder="Video Title"
//               onChange={(e) => {
//                 videos[index].title = e.target.value;
//                 setVideos([...videos]);
//               }}
//             />
//             <input
//               type="file"
//               placeholder="Video file"
//               onChange={(e) => {
//                 videos[index].videoFile = e.target.files[0];
//                 setVideos([...videos]);
//               }}
//             />
//             <input
//               type="file"
//               placeholder="Thumbnail file"
//               onChange={(e) => {
//                 videos[index].thumbnailFile = e.target.files[0];
//                 setVideos([...videos]);
//               }}
//             />
//           </div>
//         ))}
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             setVideos([...videos, {}]);
//           }}
//         >
//           Add Video
//         </button>
//         <button onClick={(e) => addVideosToCourse(e, state.courseId, videos)}>
//           Add Videos
//         </button>
//       </form>
//     </section>
//   );
// };

// export default AddVideosToCourse;
