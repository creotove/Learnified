const SidePlayList = ({
  setError,
  setPoster,
  currentVideo,
  playList,
  loading,
  setCurrentVideoPlay,
  error,
}) => {
  return (
    <section className="bg-white shadow-lg p-3 rounded-3xl">
      <h2 className="text-lg font-semibold">PlayList</h2>
      {error && (
        <div className="bg-red-500 w-max text-white p-2 rounded-md flex justify-center items-center gap-x-10">
          {error}
          <p
            className="p-3 cursor-pointer bg-blue-700"
            onClick={() => setError("")}
          >
            x
          </p>
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-3">
          {playList && playList.length > 0 ? (
            playList.map((video, index) => (
              <li
                key={index}
                className={`flex items-center gap-3 cursor-pointer ${
                  video.videoUrl === currentVideo[0].src
                    ? "bg-blue-200"
                    : "hover:bg-gray-100"
                } p-2 rounded-md
                }`}
                onClick={() => {
                  if (video.videoUrl !== currentVideo[0].src) {
                    setCurrentVideoPlay([
                      { src: video.videoUrl, type: "video/mp4" },
                    ]);
                    setPoster(video.thumbnail);
                    console.log("Playing new video");
                  } else {
                    console.log("Already playing");
                  }
                }}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-16 h-9"
                />
                <p>{video.name}</p>
              </li>
            ))
          ) : (
            <p>No videos found</p>
          )}
        </ul>
      )}
    </section>
  );
};

export default SidePlayList;
