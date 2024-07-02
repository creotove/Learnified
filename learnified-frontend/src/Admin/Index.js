import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="relative min-h-screen">
      {/* Hamburger menu for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-gray-200"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={`bg-white shadow-md w-64 fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto py-6 px-4">
          {/* Close button for mobile */}
          <button
            className="lg:hidden absolute top-4 right-4 p-2 rounded-md bg-gray-200"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <ul className="space-y-2 mt-8">
            <NavItem to="/admin" end onClick={toggleSidebar}>
              Home
            </NavItem>
            <NavItem to="/admin/courses" onClick={toggleSidebar}>
              Courses
            </NavItem>
            <NavItem to="/admin/create-courses" onClick={toggleSidebar}>
              Add Courses
            </NavItem>
            <NavItem to="/admin/packages" onClick={toggleSidebar}>
              Packages
            </NavItem>
            <NavItem to="/admin/create-package" onClick={toggleSidebar}>
              Add Packages
            </NavItem>
            <NavItem to="/admin/instructor" onClick={toggleSidebar}>
              Instructor
            </NavItem>
            <NavItem to="/admin/add-instructor" onClick={toggleSidebar}>
              Add Instructor
            </NavItem>
            <NavItem to="/admin/training-video" onClick={toggleSidebar}>
              Training Video
            </NavItem>
            <NavItem to="/admin/add-training-video" onClick={toggleSidebar}>
              Add Training Video
            </NavItem>
            <NavItem to="/log-out" onClick={toggleSidebar}>
              Logout
            </NavItem>
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <div className="lg:ml-64 p-4">
        <Outlet />
      </div>
    </div>
  );
};

const NavItem = ({ to, children, end, onClick }) => (
  <li>
    <NavLink
      end={end}
      className={({ isActive, isPending }) =>
        `block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
          isPending
            ? "text-gray-400"
            : isActive
            ? "bg-purple-500 text-white"
            : "text-gray-600 hover:bg-gray-200"
        }`
      }
      to={to}
      onClick={onClick}
    >
      {children}
    </NavLink>
  </li>
);

export default Index;
