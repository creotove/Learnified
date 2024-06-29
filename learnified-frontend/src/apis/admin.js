import axios from "axios";
export default axios.create({
  baseURL:
    process.env.REACT_APP_MODE === "DEVELOPMENT"
      ? `${process.env.REACT_APP_DEV_BASE_URL}/admin`
      : `${process.env.REACT_APP_PRODUCTION_BASE_URL}/admin`,
  withCredentials: true,
});
