import axios from "../../apis/affiliate-user";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PayOutDetails = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [payouts, setPayouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getPayouts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/withdraw/${auth.user._id}`);
      if (res.data.success) {
        console.log(res.data.data);
        setPayouts(res.data.data);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPayouts();
  }, []);
  return (
    <section className="p-5">
      <div className="justify-end items-end flex">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("/affiliate-panel/add-wallet-details");
          }}
        >
          Add Wallet Details
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th className="p-3 border text-center">#</th>
              <th className="p-3 border text-center">Amount</th>
              <th className="p-3 border text-center">Method</th>
              <th className="p-3 border text-center">Status</th>
              <th className="p-3 border text-center">Req. date</th>
              <th className="p-3 border text-center">Payment date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-3 border text-center" colSpan={6}>
                  Loading...
                </td>
              </tr>
            ) : payouts.length > 0 ? (
              payouts.map((payout, index) => (
                <tr key={payout._id}>
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border text-center">{payout?.amount}</td>
                  <td className="p-3 border text-center">
                    {payout?.paymentType.toUpperCase()}
                  </td>
                  <td className="p-3 border text-center">{payout?.status}</td>
                  <td className="p-3 border text-center">
                    {new Date(payout?.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border text-center">
                    {payout?.status === "pending" ? "N/A" : payout?.paymentDate}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 border text-center" colSpan={6}>
                  No payouts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PayOutDetails;
