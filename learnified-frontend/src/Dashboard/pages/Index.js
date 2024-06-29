import React from "react";
import { NavLink, Outlet} from "react-router-dom";

const Index = () => {
  

  return (
    <>
      <nav>
        <ul className="flex gap-x-9">
          <li>
            <NavLink
              end
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "p-3 bg-black text-white"
                  : "p-3"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>  <li>
            <NavLink
              end
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "p-3 bg-black text-white"
                  : "p-3"
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
      
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "p-3 bg-black text-white"
                  : "p-3"
              }
              to="/dashboard/my-courses"
            >
              Courses
            </NavLink>
          </li><li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "p-3 bg-black text-white"
                  : "p-3"
              }
              to="/dashboard/eduvince"
            >
              Eduvince
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "p-3 bg-black text-white"
                  : "p-3"
              }
              to="/affiliate-panel"
            >
              Affiliate Panel
            </NavLink>
          </li>
         
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "p-3 bg-black text-white"
                  : "p-3"
              }
              to="/log-out"
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
      <section className="">
        <Outlet />
      </section>
    </>
  );
};

export default Index;
