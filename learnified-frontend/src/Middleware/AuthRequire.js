import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "../apis/user";
import useAuth from "../hooks/useAuth";
import useSiteAuth from "../hooks/useSiteAuth";

const RequireAuth = () => {
  const { setAuth } = useAuth();
  const { setSiteAuth } = useSiteAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAuthenticateUser = async () => {
    try {
      const res = await axios.post(
        "/auth",
        {
          accessToken: localStorage.getItem("accessToken"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.data.success) {
        if (res.data?.isAdmin) {
          setAuth({ user: res?.data?.data?.user });
          setSiteAuth({ user: res?.data?.data?.user });
          navigate("/admin");
        } else {
          setAuth({ user: res?.data?.data?.user });
          setSiteAuth({ user: res?.data?.data?.user });
        }
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("accessToken");
      navigate("/log-in");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAuthenticateUser();
  }, []);
  return (
    <>
      {loading ? (
        <section className="h-screen flex justify-center items-center w-screen">
          <span className="loader" />
        </section>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default RequireAuth;
