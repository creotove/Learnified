import React, { useEffect, useState } from "react";
import Navbar from "./home_components/Navbar";
import Footer from "./home_components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import useSiteAuth from "../hooks/useSiteAuth";
import useAuth from "../hooks/useAuth";
import axios from "../apis/user";
import Subscribe from "./home_components/Subscribe";

const SiteLayout = () => {
  const { setSiteAuth } = useSiteAuth();
  const { setAuth } = useAuth();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  const checkAlreadyLoggedIn = async () => {
    setLoading(true);
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
        setSiteAuth({ user: res?.data?.data?.user });
        setAuth({ user: res?.data?.data?.user });
      }
    } catch (error) {
      localStorage.removeItem("accessToken");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      checkAlreadyLoggedIn();
    }
  }, []);
  return (
    <main className="w-full">
      {loading ? (
        <section className="h-screen flex justify-center items-center w-screen">
          <span className="loader" />
        </section>
      ) : (
        <>
          <section className={`pt-10 ${pathname === "/" ? "bgImage1" : ""}`}>
            <Navbar />
            <section className={`pt-20 `}>
              <Outlet />
            </section>
            <section className="relative">
              <Subscribe />
            </section>
            <Footer />
          </section>
        </>
      )}
    </main>
  );
};

export default SiteLayout;
