import { Link } from "react-router-dom";
import axios from "../apis/admin";
import React, { useEffect, useState } from "react";
import convertVideoIdToLink from "../utils/convertVideoIdToLink";

const TrainingVideo = () => {
  const [videos, setVideos] = useState([]);

  const getTrainingVideos = async () => {
    try {
      const res = await axios.get("/training-videos");
      //   setVideos(res.data.data);
      const data = res.data.data;
      const videos = data.map((video) => {
        return {
          ...video,
          videoId: convertVideoIdToLink(video.videoId),
        };
      });
      setVideos(videos);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    getTrainingVideos();
  }, []);
  return (
    <section>
      <table className="divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Video
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <tr key={video._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link target="_blank" to={video.videoId}>
                    {video.videoId}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300">
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                No videos found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default TrainingVideo;
