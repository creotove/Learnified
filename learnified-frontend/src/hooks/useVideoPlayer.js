import { useContext } from "react";
import VideoPlayerContext from "../context/VideoPlayerProvider";

const useVideoPlayer = () => {
  return useContext(VideoPlayerContext);
};

export default useVideoPlayer;
