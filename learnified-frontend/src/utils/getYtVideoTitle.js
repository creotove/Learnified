import axios from "axios";

const getYtVideoTitle = async (videoId) => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?key=${process.env.REACT_APP_GOOGLE_API}&id=${videoId}&part=snippet`
    );
    return res.data.items[0].snippet.title;
  } catch (error) {}
};
export default getYtVideoTitle;
