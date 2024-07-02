import React, { useEffect, useState } from "react";
import axios from "../apis/admin";
import { useLocation, useNavigate } from "react-router-dom";

const AddInstructor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { state } = useLocation();

  const checkIsEditMode = () => {
    if (state && state.edit) {
      console.log(state);
      setEditMode(state.edit);
      fetchInstructor();
    }
  };

  const fetchInstructor = async () => {
    try {
      const res = await axios.get(`/instructors/${state.instructorId}`);
      const instructor = res.data.data;
      setFirstName(instructor.firstName);
      setLastName(instructor.lastName);
      setTitle(instructor.title);
      setEmail(instructor.email);
      setPhoneNumber(instructor.phoneNumber);
      setExperience(instructor.experience);
      setBio(instructor.bio);
    } catch (error) {
      console.error("Error fetching instructor:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("avatar", avatar);
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("email", email);
      data.append("phoneNumber", phoneNumber);
      data.append("experience", experience);
      data.append("bio", bio);
      data.append("title", title);
      let res;
      if (editMode) {
        res = await axios.patch("/instructors", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await axios.post("/instructors", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      if (res.data.success) {
        console.log("Instructor added successfully");
      }
    } catch (error) {
      console.error("Error adding instructor:", error);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkIsEditMode();
  }, []);
  return (
    <section className="p-5">
      {error && (
        <div className="bg-red-500 w-max text-white p-2 rounded-md flex justify-center items-center gap-x-2 mb-4">
          {error}
          <p
            className="p-2 cursor-pointer bg-blue-700 rounded-md"
            onClick={() => setError("")}
          >
            x
          </p>
        </div>
      )}
      <h1 className="text-xl font-semibold mb-4">Add Instructor</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="experience" className="block mb-1">
            Experience
          </label>
          <input
            type="text"
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            rows={5}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="avatar"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Avatar
          </label>
          <input
            type="file"
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            disabled={loading}
          >
            {loading ? "Adding Instructor..." : "Add Instructor"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddInstructor;
