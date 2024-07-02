import axios from "../../apis/affiliate-user";
import React, { useEffect, useState } from "react";
import getYtVideoTitle from "../../utils/getYtVideoTitle";
import convertVideoIdToLink from "../../utils/convertVideoIdToLink";

const Training = () => {
  const [videos, setVideos] = useState([{}]);
  const getVideos = async () => {
    try {
      const res = await axios.get("/training-videos");
      if (res.data.success) {
        const data = res.data.data;
        const vids = [];
        Promise.all(
          data.map(async (vid) => {
            const videoTitle = await getYtVideoTitle(vid.videoId);
            const videoLink = convertVideoIdToLink(vid.videoId);
            vids.push({
              ...vid,
              videoTitle,
              videoLink,
              videoId: vid.videoId,
            });
          })
        ).then(() => {
          setVideos(vids);
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);
  return (
    <section>
      <h1>Training</h1>
      <div>
        {videos && videos.length > 0 ? (
          videos.map((vid) => (
            <div
              key={vid}
              style={{
                width: "480px",
              }}
            >
              <iframe
                width="420"
                height="315"
                src={`https://www.youtube.com/embed/${vid.videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <h3 className="font-bold text-xl">
                {vid?.videoTitle?.length > 50
                  ? vid?.videoTitle.substring(0, 50) + "..."
                  : vid?.videoTitle}
              </h3>
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </section>
  );
};

export default Training;
