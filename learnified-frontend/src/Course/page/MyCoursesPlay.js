// import React, { useEffect, useState } from "react";
// import SidePlayList from "../components/SidePlayList";
// import useVideoPlayer from "../../hooks/useVideoPlayer";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "../../apis/affiliate-user";
// import VideoPlayer from "../components/VideoPlayer";
// import fullScreenIcon from "../../assets/icons/pack/fullScreenIcon.svg";

// const MyCoursesPlay = () => {
//   const { currentVideoPlay, setCurrentVideoPlay } = useVideoPlayer();
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [playList, setPlayList] = useState([]);
//   const [videoUrls, setVideoUrls] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [poster, setPoster] = useState("");
//   const getCoursePlayList = async () => {
//     try {
//       if (!state.courseId) return navigate("/dashboard/my-courses");
//       const res = await axios.get(`/course/${state.courseId}`);
//       if (res?.data?.success) {
//         setPlayList(res?.data?.data?.playList);
//         setCurrentVideoPlay([
//           { src: res.data.data?.playList[0]?.videoUrl, type: "video/mp4" },
//         ]);
//         setPoster(res.data.data?.playList[0]?.thumbnail);
//         setError("");
//         const dataWithUrlAndType = res?.data?.data?.playList.map((video) => ({
//           src: video.videoUrl,
//           type: "video/mp4",
//         }));
//         setVideoUrls(dataWithUrlAndType);
//       }
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     getCoursePlayList();
//   }, []);
//   const videoJsOptions = {
//     autoplay: false,
//     controls: true,
//     responsive: true,
//     fluid: true,
//     sources: currentVideoPlay,
//   };
//   useEffect(() => {}, [currentVideoPlay, videoJsOptions]);

//   return (
//     <section className="flex h-3/4 w-3/4">
//       {videoUrls.length > 0 && (
//         <SidePlayList
//           setPoster={setPoster}
//           currentVideo={currentVideoPlay}
//           setCurrentVideoPlay={setCurrentVideoPlay}
//           error={error}
//           loading={loading}
//           playList={playList}
//         />
//       )}
//       <div className="h-full w-full">
//         {videoUrls.length > 0 && (
//           <VideoPlayer poster={poster} options={videoJsOptions} />
//         )}
//       </div>
//     </section>
//   );
// };

// export default MyCoursesPlay;

import React, { useEffect, useRef, useState } from "react";
import SidePlayList from "../components/SidePlayList";
import useVideoPlayer from "../../hooks/useVideoPlayer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../apis/affiliate-user";
import fullScreenIcon from "../../assets/icons/pack/fullScreenIcon.svg";

const MyCoursesPlay = () => {
  const { currentVideoPlay, setCurrentVideoPlay } = useVideoPlayer();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [playList, setPlayList] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [poster, setPoster] = useState("");
  const iframeRef = useRef(null);

  const getCoursePlayList = async () => {
    try {
      if (!state.courseId) return navigate("/dashboard/my-courses");
      const res = await axios.get(`/course/${state.courseId}`);
      if (res?.data?.success) {
        setPlayList(res?.data?.data?.playList);
        setCurrentVideoPlay([
          { src: res.data.data?.playList[0]?.videoUrl, type: "video/mp4" },
        ]);
        setPoster(res.data.data?.playList[0]?.thumbnail);
        setError("");
        const dataWithUrlAndType = res?.data?.data?.playList.map((video) => ({
          src: video.videoUrl,
          type: "video/mp4",
        }));
        setVideoUrls(dataWithUrlAndType);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoursePlayList();
  }, []);

  const handleFullScreen = () => {
    const iframe = iframeRef.current;
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }
    // Lock the screen to landscape mode when in fullscreen
    if (window.screen.orientation && window.screen.orientation.lock) {
      window.screen.orientation
        .lock("landscape")
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.screen.orientation.type.startsWith("landscape")) {
        handleFullScreen();
      }
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <section className="flex h-3/4 w-3/4">
      {videoUrls.length > 0 && (
        <SidePlayList
          setPoster={setPoster}
          currentVideo={currentVideoPlay}
          setCurrentVideoPlay={setCurrentVideoPlay}
          error={error}
          loading={loading}
          playList={playList}
        />
      )}
      <div className="h-3/4 w-full">
        <div
          style={{ width: 640, height: 480 }}
          className="z-10 bg-blue-400 relative"
        >
          <iframe
            ref={iframeRef}
            src="https://drive.google.com/file/d/1VOLQRoPRURbM5BOuoM3rZUgTp1lRXSCM/preview"
            width={640}
            height={480}
            scrolling="no"
            className="z-0"
          />
          <div
            style={{
              width: 80,
              backgroundColor: "",
              height: 80,
              position: "absolute",
              right: 0,
              top: 0,
            }}
            className="cursor-pointer z-50"
            // onClick={handleFullScreen}
          >
            &nbsp;
          </div>
          <div>
            <img
              src={fullScreenIcon}
              className="invert h-5 right-6 bottom-3 absolute cursor-pointer"
              onClick={handleFullScreen}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCoursesPlay;
