import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function VideoPlayer({ options, poster }) {
  const videoRef = useRef(null);

  // useEffect(() => {
  //   console.log("options", options?.sources[0]?.src);
  //   if (videoRef.current) {
  //     const player = videojs(videoRef.current, options, () => {
  //       console.log("Player is ready");
  //     });
  //     return () => {
  //       player.dispose();
  //       videoRef.current = null;
  //     };
  //   }
  // }, [options?.sources[0]?.src]);

  return (
    <div>
      <video
        poster={poster}
        src={options?.sources[0]?.src}
        // ref={videoRef}
        className="video-js w-full"
        controls
      />
    </div>
  );
}
