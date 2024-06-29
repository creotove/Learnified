import React, { useEffect, useState } from "react";
import calenderIcon from "../../assets/icons/pack/calenderIcon.svg";
import notiIcon from "../../assets/icons/pack/notiIcon.svg";
import chatMessageIcon from "../../assets/icons/pack/chatMessageIcon.svg";
import dropdownIcon from "../../assets/icons/pack/dropdownIcon.svg";
import axios from "../../apis/affiliate-user";

const TodoList = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const getUser = async () => {
    try {
      const res = await axios.get("/me");
      if (res.data.success) {
        setUser(res.data.data);
        setError("");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return loading ? (
    <section className="bg-[#FCEFFD] p-5 rounded-3xl flex flex-col gap-10 h-96 ">
      <div className="animate-pulse flex justify-end items-center">
        <div className="animate-pulse">
          <img
            className="min-h-10 min-w-10"
            src={calenderIcon}
            alt="calender icon"
          />
        </div>
        <div className="animate-pulse">
          <img
            className="min-h-10 min-w-10"
            src={notiIcon}
            alt="notification icon"
          />
        </div>
        <div className="animate-pulse">
          <img
            className="min-h-10 min-w-10"
            src={chatMessageIcon}
            alt="chat icon"
          />
        </div>
        <div className="flex animate-pulse">
          <img
            className="min-h-10 max-h-10 min-w-10 max-w-10 rounded-full"
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt="chat icon"
          />
          <img
            className="min-h-10 min-w-10"
            src={dropdownIcon}
            alt="dropdown"
          />
        </div>
      </div>
    </section>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <section className="bg-[#FCEFFD] p-5 rounded-3xl h-min lg:flex flex-col gap-10 hidden">
      <div className="flex justify-end items-center">
        <div>
          <img
            className="min-h-10 min-w-10"
            src={calenderIcon}
            alt="calender icon"
          />
        </div>
        <div>
          <img
            className="min-h-10 min-w-10"
            src={notiIcon}
            alt="notification icon"
          />
        </div>
        <div>
          <img
            className="min-h-10 min-w-10"
            src={chatMessageIcon}
            alt="chat icon"
          />
        </div>
        <div className="flex">
          <img
            className="min-h-10 max-h-10 min-w-10 max-w-10 rounded-full"
            src={
              loading
                ? "https://www.w3schools.com/w3images/avatar2.png"
                : user?.avatar ||
                  "https://www.w3schools.com/w3images/avatar2.png"
            }
            alt="profile image"
          />

          <img
            className="min-h-10 min-w-10"
            src={dropdownIcon}
            alt="chat icon"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          className=" min-h-32 max-h-32  min-w-32 max-w-32 rounded-full"
          src="https://www.w3schools.com/w3images/avatar2.png"
          alt="chat icon"
        />
      </div>
      {/* Todolist */}
      <div></div>
      {/* Upcoming Task in todolist */}
      <div></div>
    </section>
  );
};

export default TodoList;
