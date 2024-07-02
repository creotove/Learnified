import React, { useEffect, useState } from "react";
import axios from "../apis/admin";
import { useNavigate } from "react-router-dom";

const AddTrainingVideo = () => {
  const [videoLink, setVideoLink] = useState("");
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const extractVideoId = (url) => {
    try {
      if (!url) {
        setError("Please provide a video url");
      }
      if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
        setError("Please provide a valid youtube url");
      }
      if (url.includes("youtu.be")) {
        console.log(url.split("/").pop());
        return url.split("/").pop();
      }
      let videoId = url.split("v=")[1];
      const ampersandPosition = videoId.indexOf("&");
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
      return videoId;
    } catch (error) {
      console.log(error);
    }
  };
  const addTrainingVideo = async (e) => {
    try {
      const videoId = extractVideoId(videoLink);
      const res = await axios.post("/training-video", { videoId });
      if (res.data.success) {
        navigate("/admin/training-video");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setVideoLink("");
    }
  };
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
      <form>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="packageName"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Video Link
            </label>
            <input
              type="text"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required={editMode ? false : true}
            />
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addTrainingVideo();
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddTrainingVideo;
