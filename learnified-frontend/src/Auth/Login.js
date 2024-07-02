// import { Link, useNavigate } from "react-router-dom";
// import axios from "../apis/user";
// import React, { useEffect, useState } from "react";
// import useAuth from "../hooks/useAuth";
// import useSiteAuth from "../hooks/useSiteAuth";
// import logo from "../assets/logos/logo.png";

// const Login = () => {
//   const { setAuth } = useAuth();
//   const { setSiteAuth } = useSiteAuth();
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("password");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       if (!identifier) {
//         setError("Please enter your email or phone number");
//         return;
//       }
//       if (!password) {
//         setError("Please enter your password");
//         return;
//       }
//       if (!validateIdentifier(identifier)) {
//         setError(
//           "Please enter a valid email address or a 10-digit phone number."
//         );
//         setLoading(false);
//         return;
//       }
//       const res = await axios.post("/log-in", {
//         identifier: identifier,
//         password: password,
//       });
//       if (res.data.success) {
//         const data = res.data.data;
//         localStorage.setItem("accessToken", data.accessToken);
//         localStorage.setItem("refreshToken", data.refreshToken);
//         setAuth({ user: data?.user });
//         setSiteAuth({ user: data?.user });
//         if (res.data?.isAdmin) {
//           navigate("/admin");
//         } else {
//           navigate("/");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       setError(error.response?.data?.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const checkAlreadyLoggedIn = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "/auth",
//         {
//           accessToken: localStorage.getItem("accessToken"),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );
//       if (res.data.success) {
//         if (res.data?.isAdmin) {
//           setAuth({ user: res?.data?.user });
//           navigate("/admin");
//         } else {
//           setAuth({ user: res?.data?.user });
//           navigate("/");
//         }
//       }
//     } catch (error) {
//       localStorage.removeItem("accessToken");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const validateIdentifier = (identifier) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^\d{10}$/;
//     if (emailRegex.test(identifier)) {
//       return true;
//     } else if (phoneRegex.test(identifier)) {
//       return true;
//     } else {
//       return false;
//     }
//   };
//   useEffect(() => {
//     if (localStorage.getItem("accessToken")) {
//       checkAlreadyLoggedIn();
//     }
//   }, []);

//   return (
//     <form>
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//           <div className="flex justify-center">
//             <img src={logo} alt="Logo" className="" />
//           </div>
//           {error && (
//             <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 rounded">
//               {error}
//             </div>
//           )}
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-600">
//               Email | Phone Number
//             </label>
//             <input
//               value={identifier}
//               onChange={(e) => {
//                 setError(null);
//                 setIdentifier(e.target.value);
//               }}
//               type="text"
//               placeholder="Enter your email or phone number"
//               className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-600">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => {
//                   setError(null);
//                   setPassword(e.target.value);
//                 }}
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600"
//               >
//                 {passwordVisible ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>
//           <div>
//             <button
//               onClick={handleLogin}
//               type="submit"
//               className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Login"}
//             </button>
//           </div>
//           <div className="text-sm text-center text-gray-600">
//             Don't have an account?{" "}
//             <Link to="/sign-up" className="text-purple-500 hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Login;

import { Link, useNavigate } from "react-router-dom";
import axios from "../apis/user";
import React, { useEffect, useState, useRef } from "react";
import useAuth from "../hooks/useAuth";
import useSiteAuth from "../hooks/useSiteAuth";
import logo from "../assets/logos/logo.png";

const Login = () => {
  const { setAuth } = useAuth();
  const { setSiteAuth } = useSiteAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const identifierRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    const newErrors = {};
    if (!identifier) {
      newErrors.identifier = "Please enter your email or phone number";
    }
    if (!password) {
      newErrors.password = "Please enter your password";
    }
    if (identifier && !validateIdentifier(identifier)) {
      newErrors.identifier =
        "Please enter a valid email address or a 10-digit phone number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      if (newErrors.identifier) {
        identifierRef.current.focus();
      } else if (newErrors.password) {
        passwordRef.current.focus();
      }
      return;
    }

    try {
      const res = await axios.post("/log-in", {
        identifier: identifier,
        password: password,
      });
      if (res.data.success) {
        const data = res.data.data;
        console.log(data);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("accessToken", data.accessToken);
        setAuth({ user: data?.user });
        setSiteAuth({ user: data?.user });
        if (res.data?.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
      setErrors({
        general: error.response?.data?.message || "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
        if (res.data?.isAdmin) {
          setAuth({ user: res?.data?.user });
          navigate("/admin");
        } else {
          setAuth({ user: res?.data?.user });
          navigate("/");
        }
      }
    } catch (error) {
      localStorage.removeItem("accessToken");
    } finally {
      setLoading(false);
    }
  };

  const validateIdentifier = (identifier) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    return emailRegex.test(identifier) || phoneRegex.test(identifier);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      checkAlreadyLoggedIn();
    }
  }, []);

  return (
    <form>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="" />
          </div>
          {errors.general && (
            <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 rounded">
              {errors.general}
            </div>
          )}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email | Phone Number
            </label>
            <input
              ref={identifierRef}
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
              }}
              type="text"
              placeholder="Enter your email or phone number"
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.identifier ? "border-red-500" : ""
              }`}
            />
            {errors.identifier && (
              <p className="mt-2 text-sm text-red-600">{errors.identifier}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                ref={passwordRef}
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
                className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div>
            <button
              onClick={handleLogin}
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
          <div className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-purple-500 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
