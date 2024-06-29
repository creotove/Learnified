import React from "react";

const RecentEnrollments = () => {
  const recent = [
    {
      name: "John Doe",
      email: "jhondoe@gmail.com",
      date: "2021-09-01",
      time: "12:00:00",
      package: "React",
    },
    {
      name: "Jane Doe",
      email: "janeDoe@gmail.com",
      date: "2021-09-02",
      time: "12:00:00",
      package: "React",
    },
  ];
  return (
    <section className="overflow-x-auto">
      <h5>RecentEnrollments</h5>
      <table className="table-auto rounded-lg border-spacing-4 border-separate shadow-lg">
        <tbody>
          {recent && recent.length > 0 ? (
            recent.map((item, index) => (
              <tr
                key={index}
                className=" bg-[#f8f9fb] hover:transform hover:scale-105 transition-all hover:shadow-2xl hover:bg-white"
              >
                <td>
                  <img
                    src="https://www.w3schools.com/w3images/avatar2.png"
                    alt="Avatar"
                    className="rounded-full h-10 w-10"
                  />
                </td>
                <td className="px-3 py-2">{item.name}</td>
                <td className="px-3 py-2">{item.email}</td>
                <td className="px-3 py-2">{item.time}</td>
                <td className="px-3 py-2">{item.date}</td>
                <td className="px-3 py-2">{item.package}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No recent enrollments
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default RecentEnrollments;
