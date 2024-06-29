import React, { useEffect, useState } from "react";
import axios from "../../apis/affiliate-user";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Earnings = () => {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [earning, setEarning] = useState(0);
  const [error, setError] = useState();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const getUSerEarnings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/earnings/${auth?.user?._id}`);
      if (res.data.success) {
        if (res.data.data.length > 0) {
          const data = res.data.data;
          const earnedFromName = data.map((item) => {
            return item.earnedFrom.firstName + " " + item.earnedFrom.lastName;
          });
          const amount = data.map((item) => item.amount);
          const date = data.map((item) => item.createdAt);
          const earnings = earnedFromName.map((name, index) => {
            return {
              name,
              amount: amount[index],
              date: date[index],
            };
          });
          setEarnings(earnings);
        } else {
          setEarnings([]);
        }
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const getCurrentEarningsTotal = async () => {
    try {
      const res = await axios.get(`/curr-earnings/${auth?.user?._id}`);
      if (res.data.success) {
        setEarning(res.data.data);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    getUSerEarnings();
    getCurrentEarningsTotal();
  }, []);
  return (
    <section className="p-5">
      {error && (
        <div className="bg-red-500 w-max text-white p-2 rounded-md flex justify-center items-center gap-x-10">
          {error}
          <p
            className="p-3 cursor-pointer bg-blue-700"
            onClick={() => setError(null)}
          >
            x
          </p>
        </div>
      )}
      <div className="flex justify-between mb-5">
        <span>
          <h1>Earnings</h1>
          <p>Total Earnings: {earning}</p>
        </span>
        <button
          onClick={(e) =>
            navigate("/affiliate-panel/withdraw-earnings", {
              state: {
                earning,
              },
            })
          }
        >
          Withdraw Earnings
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="p-3 text-center border">Name</th>
              <th className="p-3 text-center border">Amount</th>
              <th className="p-3 text-center border">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : earnings.length > 0 ? (
              earnings.map((earning, index) => {
                return (
                  <tr key={index}>
                    <td className="p-3 text-center border">{earning.name}</td>
                    <td className="p-3 text-center border">{earning.amount}</td>
                    <td className="p-3 text-center border">
                      {new Date(earning.date).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="border p-3 text-center" colSpan={3}>
                  No earnings
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Earnings;
