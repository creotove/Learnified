// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";

// const Index = () => {
//   return (
//     <>
//       <nav>
//         <ul className="flex gap-x-10 whitespace-nowrap">
//           <li>
//             <NavLink
//               end
//               className={({ isActive, isPending }) =>
//                 isPending
//                   ? "pending"
//                   : isActive
//                   ? "bg-black text-white p-3"
//                   : "p-3"
//               }
//               to="/admin"
//             >
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               className={({ isActive, isPending }) =>
//                 isPending
//                   ? "pending"
//                   : isActive
//                   ? "bg-black text-white p-3"
//                   : "p-3"
//               }
//               to="/admin/create-courses"
//             >
//               Create Courses
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               className={({ isActive, isPending }) =>
//                 isPending
//                   ? "pending"
//                   : isActive
//                   ? "bg-black text-white p-3"
//                   : "p-3"
//               }
//               to="/admin/courses"
//             >
//               Courses
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               className={({ isActive, isPending }) =>
//                 isPending
//                   ? "pending"
//                   : isActive
//                   ? "bg-black text-white p-3"
//                   : "p-3"
//               }
//               to="/admin/packages"
//             >
//               Packages
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               className={({ isActive, isPending }) =>
//                 isPending
//                   ? "pending"
//                   : isActive
//                   ? "bg-black text-white p-3"
//                   : "p-3"
//               }
//               to="/admin/create-package"
//             >
//               Create Packages
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               className={({ isActive, isPending }) =>
//                 isPending
//                   ? "pending"
//                   : isActive
//                   ? "bg-black text-white p-3"
//                   : "p-3"
//               }
//               to="/log-out"
//             >
//               Logout
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//       <Outlet />
//     </>
//   );
// };

// export default Index;

import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Index = () => {
  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <ul className="flex gap-x-6">
                <li>
                  <NavLink
                    end
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-purple-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/admin"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-purple-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/admin/create-courses"
                  >
                    Create Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-purple-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/admin/courses"
                  >
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-purple-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/admin/packages"
                  >
                    Packages
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-purple-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/admin/create-package"
                  >
                    Create Packages
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-purple-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/admin/instructor"
                  >
                    Instructor
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-purple-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/admin/add-instructor"
                  >
                    Create Instructor
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-purple-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    }
                    to="/log-out"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Index;
