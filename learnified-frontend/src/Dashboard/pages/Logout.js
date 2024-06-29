import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useSiteAuth from "../../hooks/useSiteAuth";
import axios from "../../apis/user";

const Logout = () => {
  const { setAuth } = useAuth();
  const { setSiteAuth } = useSiteAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post("/log-out");
      if (res.data.success) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAuth({ user: null });
        setSiteAuth({ user: null });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleLogout();
  }, []);
  return <div>logging Out User.....</div>;
};

export default Logout;
