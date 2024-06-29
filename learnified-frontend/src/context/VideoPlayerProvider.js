import { createContext, useState } from "react";

const VideoPlayerContext = createContext({});

export const VideoPlayerProvider = ({ children }) => {
  const [currentVideoPlay, setCurrentVideoPlay] = useState();

  return (
    <VideoPlayerContext.Provider
      value={{ currentVideoPlay, setCurrentVideoPlay }}
    >
      {children}
    </VideoPlayerContext.Provider>
  );
};

export default VideoPlayerContext;
