import React, { useEffect, useState } from "react";
import logo from "../../assets/logos/logo.png";
import { Link, NavLink } from "react-router-dom";
import useSiteAuth from "../../hooks/useSiteAuth";
import axios from "../../apis/user";
import hamburgerIcon from "../../assets/icons/pack/hamBurgerIcon.svg";
import scrollToTop from "../../utils/scrollToTop";

const Navbar = () => {
  const { siteAuth } = useSiteAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const getPackages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/packages");
      if (res.data.success) {
        setError("");
        const data = res.data.data;
        setPackages(data);
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={`py-4 flex justify-center items-center z-50 w-full fixed top-0 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex sm:gap-4 items-center justify-between w-full mx-5 lg:w-min">
        <div className="flex justify-between">
          <div className="w-52">
            <Link to="/" onClick={scrollToTop}>
              <img
                src={logo}
                alt="Logo"
                className="object-cover cursor-pointer"
              />
            </Link>
          </div>
        </div>
        <div className="bg-white flex lg:ps-6 lg:pe-1 gap-5 lg:rounded-full items-center lg:h-16 justify-center border border-black">
          <div className="lg:hidden flex justify-center items-center">
            <img
              className="min-w-10 min-h-10 cursor-pointer"
              src={hamburgerIcon}
              alt="Hamburger Icon"
              onClick={toggleMobileMenu}
            />
          </div>
          <div className={`lg:flex hidden items-center space-x-6`}>
            <NavLink
              to="/"
              className="text-black sm:text-xl lg:text-2xl hover:text-purple-900 whitespace-nowrap py-4"
              onClick={scrollToTop}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="text-black sm:text-xl lg:text-2xl hover:text-purple-900 whitespace-nowrap py-3"
              onClick={scrollToTop}
            >
              About Us
            </NavLink>
            <div className="relative group">
              <NavLink
                to={"#"}
                className="text-black sm:text-xl lg:text-2xl hover:text-purple-900 whitespace-nowrap py-3"
              >
                Packages <span className="text-purple-700">⮟</span>
              </NavLink>
              <div className="absolute mt-2 w-40 bg-white border rounded shadow-md hidden group-hover:block cursor-pointer">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : packages && packages.length > 0 ? (
                  packages.map((item, idx) => (
                    <NavLink
                      to={`/packages/${item._id}`}
                      key={idx}
                      className="block px-4 py-2 text-purple-700 hover:bg-purple-100"
                    >
                      {item.name}
                    </NavLink>
                  ))
                ) : (
                  <p>No packages available</p>
                )}
              </div>
            </div>
          </div>
          <div className="lg:flex hidden">
            <NavLink
              to={siteAuth.user ? "/dashboard" : "/log-in"}
              className="gradPinkBg sm:text-xl lg:text-2xl py-3 px-4 rounded-full whitespace-nowrap hover:bg-purple-800"
            >
              {siteAuth.user ? "Dashboard" : "Sign Up / Log In"}
            </NavLink>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md lg:hidden">
          <NavLink
            to="/"
            className="block px-4 py-2 text-black hover:bg-purple-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="block px-4 py-2 text-black hover:bg-purple-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </NavLink>
          <NavLink
            to="/courses"
            className="block px-4 py-2 text-black hover:bg-purple-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Courses
          </NavLink>
          <div className="relative group">
            <NavLink
              to="/packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-black hover:bg-purple-100"
            >
              Packages <span className="text-purple-700">⮟</span>
            </NavLink>

            <div className="w-full hidden group-hover:block cursor-pointer">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : packages && packages.length > 0 ? (
                packages.map((item, idx) => (
                  <NavLink
                    to={`/packages/${item._id}`}
                    key={idx}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-purple-700 hover:bg-purple-100"
                  >
                    {item.name}
                  </NavLink>
                ))
              ) : (
                <p>No packages available</p>
              )}
            </div>
          </div>
          {siteAuth.user ? (
            <NavLink
              to="/dashboard"
              className="block px-4 py-2 text-black hover:bg-purple-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              to="/log-in"
              className="block px-4 py-2 text-black hover:bg-purple-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up / Log In
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
