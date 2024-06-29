// import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from "../apis/user";
// import React, { useState } from "react";
// import logo from "../assets/logos/logo.png";

// const Signup = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const naivgate = useNavigate();
//   const location = useLocation();

//   const handleSignUp = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       if (!firstName) {
//         setError("First Name is required");
//         return;
//       }
//       if (!lastName) {
//         setError("Last Name is required");
//         return;
//       }
//       if (!email) {
//         setError("Email is required");
//         return;
//       }
//       if (!phoneNumber) {
//         setError("Phone Number is required");
//         return;
//       }
//       if (!password) {
//         setError("Password is required");
//         return;
//       }
//       if (!state) {
//         setError("State is required");
//         return;
//       }
//       if (!country) {
//         setError("Country is required");
//         return;
//       }

//       const referral = new URLSearchParams(location.search).get("referral");
//       const res = await axios.post(`/sign-up?referral=${referral}`, {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         phoneNumber: phoneNumber,
//         password: password,
//         state: state,
//         country: country,
//       });
//       if (res.data.success) {
//         naivgate("/log-in");
//       }
//     } catch (error) {
//       console.log(error.response.data.message);
//       setError(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

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
//               First Name
//             </label>
//             <input
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               type="text"
//               placeholder="Enter your first name"
//               className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-600">
//               Last Name
//             </label>
//             <input
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               type="text"
//               placeholder="Enter your last name"
//               className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-600">
//               Email
//             </label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-600">
//               Phone Number
//             </label>
//             <input
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               type="text"
//               placeholder="Enter your phone number"
//               className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-600">
//               Password
//             </label>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-600">
//               Country
//             </label>
//             <input
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//               type="text"
//               placeholder="Enter your country"
//               className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-600">
//               State
//             </label>
//             <input
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//               type="text"
//               placeholder="Enter your state"
//               className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           <div>
//             <button
//               onClick={handleSignUp}
//               type="submit"
//               className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Sign Up"}
//             </button>
//           </div>
//           <div className="text-sm text-center text-gray-600">
//             Already have an account?{" "}
//             <Link to="/log-in" className="text-purple-500 hover:underline">
//               Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Signup;

import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../apis/user";
import React, { useState, useRef } from "react";
import logo from "../assets/logos/logo.png";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    const newErrors = {};
    if (!firstName) newErrors.firstName = "First Name is required";
    if (!lastName) newErrors.lastName = "Last Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!password) newErrors.password = "Password is required";
    if (!state) newErrors.state = "State is required";
    if (!country) newErrors.country = "Country is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      if (newErrors.firstName) firstNameRef.current.focus();
      else if (newErrors.lastName) lastNameRef.current.focus();
      else if (newErrors.email) emailRef.current.focus();
      else if (newErrors.phoneNumber) phoneNumberRef.current.focus();
      else if (newErrors.password) passwordRef.current.focus();
      else if (newErrors.state) stateRef.current.focus();
      else if (newErrors.country) countryRef.current.focus();
      return;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrors({ email: "Invalid email" });
        setLoading(false);
        return;
      }
    }
    if (phoneNumber) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phoneNumber)) {
        setErrors({ phoneNumber: "Invalid phone number" });
        setLoading(false);
        return;
      }
    }

    try {
      const referral = new URLSearchParams(location.search).get("referral");
      setErrors({});
      const res = await axios.post(`/sign-up?referral=${referral}`, {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        state,
        country,
      });
      if (res.data.success) {
        navigate("/log-in");
      }
    } catch (error) {
      console.log(error);
      return;
      console.log(error.response.data.message);
      setErrors({ general: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

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
              First Name
            </label>
            <input
              ref={firstNameRef}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              placeholder="Enter your first name"
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              ref={lastNameRef}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              placeholder="Enter your last name"
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              ref={emailRef}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              ref={phoneNumberRef}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              type="text"
              placeholder="Enter your phone number"
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.phoneNumber ? "border-red-500" : ""
              }`}
            />
            {errors.phoneNumber && (
              <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              ref={passwordRef}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter your password"
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Country
            </label>
            <input
              ref={countryRef}
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              type="text"
              placeholder="Enter your country"
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.country ? "border-red-500" : ""
              }`}
            />
            {errors.country && (
              <p className="mt-2 text-sm text-red-600">{errors.country}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              State
            </label>
            <input
              ref={stateRef}
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              type="text"
              placeholder="Enter your state"
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.state ? "border-red-500" : ""
              }`}
            />
            {errors.state && (
              <p className="mt-2 text-sm text-red-600">{errors.state}</p>
            )}
          </div>
          <div>
            <button
              onClick={handleSignUp}
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
          <div className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/log-in" className="text-purple-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
