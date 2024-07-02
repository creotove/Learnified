// import { useNavigate } from "react-router-dom";
// import axios from "../apis/admin";
// import React, { useEffect, useState } from "react";

// const Instructor = () => {
//   const [instructors, setInstructors] = useState([]);
//   const navigate = useNavigate();
//   const getInstructors = async () => {
//     try {
//       const res = await axios.get("/instructors");
//       setInstructors(res.data.data);
//     } catch (error) {
//       console.error("Error fetching instructors:", error);
//     }
//   };
//   useEffect(() => {
//     getInstructors();
//   }, []);
//   return (
//     <section>
//       <h1 className="text-2xl font-semibold">Instructors</h1>
//       <table>
//         <thead>
//           <tr>
//             <th className="px-3 py-1 text-center">#</th>
//             <th className="px-3 py-1 text-center">Avatar</th>
//             <th className="px-3 py-1 text-center">Name</th>
//             <th className="px-3 py-1 text-center">Title</th>
//             <th className="px-3 py-1 text-center">View</th>
//             <th className="px-3 py-1 text-center">Edit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {instructors.length > 0 ? (
//             instructors.map((instructor, idx) => (
//               <tr key={instructor._id}>
//                 <td className="px-3 py-1 text-center">{idx + 1}</td>
//                 <td className="px-3 py-1 text-center">
//                   <img
//                     className="min-h-10 min-w-10 max-h-10 max-w-10 rounded-full"
//                     src={instructor.avatar}
//                     alt="avatar"
//                   />
//                 </td>
//                 <td className="px-3 py-1 text-center">
//                   {instructor?.firstName + instructor?.lastName}
//                 </td>
//                 <td className="px-3 py-1 text-center">{instructor?.title}</td>
//                 <td className="px-3 py-1 text-center">
//                   {
//                     <button className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
//                       View
//                     </button>
//                   }
//                 </td>
//                 <td className="px-3 py-1 text-center">
//                   {
//                     <button
//                       className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
//                       onClick={() => {
//                         navigate("/admin/add-instructor", {
//                           state: { edit: true, instructorId: instructor._id },
//                         });
//                       }}
//                     >
//                       Edit
//                     </button>
//                   }
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8">No instructors found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </section>
//   );
// };

// export default Instructor;

import { useNavigate } from "react-router-dom";
import axios from "../apis/admin";
import React, { useEffect, useState } from "react";
import Modal from "../utils/Model";

const Instructor = () => {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const getInstructors = async () => {
    try {
      const res = await axios.get("/instructors");
      setInstructors(res.data.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  useEffect(() => {
    getInstructors();
  }, []);

  const openModal = (instructor) => {
    setSelectedInstructor(instructor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedInstructor(null);
    setIsModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <section className="relative">
      <h1 className="text-2xl font-semibold mb-4">Instructors</h1>
      <table>
        <thead>
          <tr>
            <th className="px-3 py-1 text-center">#</th>
            <th className="px-3 py-1 text-center">Avatar</th>
            <th className="px-3 py-1 text-center">Name</th>
            <th className="px-3 py-1 text-center">Title</th>
            <th className="px-3 py-1 text-center">View</th>
            <th className="px-3 py-1 text-center">Edit</th>
          </tr>
        </thead>
        <tbody>
          {instructors.length > 0 ? (
            instructors.map((instructor, idx) => (
              <tr key={instructor._id}>
                <td className="px-3 py-1 text-center">{idx + 1}</td>
                <td className="px-3 py-1 text-center">
                  <img
                    className="min-h-10 min-w-10 max-h-10 max-w-10 rounded-full"
                    src={instructor.avatar}
                    alt="avatar"
                  />
                </td>
                <td className="px-3 py-1 text-center">
                  {instructor?.firstName + instructor?.lastName}
                </td>
                <td className="px-3 py-1 text-center">{instructor?.title}</td>
                <td className="px-3 py-1 text-center">
                  {
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      onClick={() => openModal(instructor)}
                    >
                      View
                    </button>
                  }
                </td>
                <td className="px-3 py-1 text-center">
                  {
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                      onClick={() => {
                        navigate("/admin/add-instructor", {
                          state: { edit: true, instructorId: instructor._id },
                        });
                      }}
                    >
                      Edit
                    </button>
                  }
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No instructors found</td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedInstructor && (
          <>
            <h2 className="text-xl font-semibold mb-4">Instructor Details</h2>
            <img
              src={selectedInstructor.avatar}
              alt="Instructor Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <p>
              <strong>Name:</strong> {selectedInstructor.firstName}{" "}
              {selectedInstructor.lastName}
            </p>
            <p>
              <strong>Title:</strong> {selectedInstructor.title}
            </p>
            <p>
              <strong>Email:</strong> {selectedInstructor.email}
            </p>
            <p>
              <strong>Bio:</strong> {selectedInstructor.bio}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>
          </>
        )}
      </Modal>
    </section>
  );
};

export default Instructor;
