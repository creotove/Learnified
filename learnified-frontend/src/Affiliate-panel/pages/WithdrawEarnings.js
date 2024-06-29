import axios from "../../apis/affiliate-user";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const WithdrawEarnings = () => {
  const { auth } = useAuth();
  const { state } = useLocation();
  const [walletType, setWalletType] = useState("paypal");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const [walletDetailsIsAvailable, setWalletDetailsIsAvailable] =
    useState(true);
  console.log(state);
  const withdrawEarnings = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      setLoading(true);
      const data = { id: auth.user._id, amount, type: walletType };
      const res = await axios.post("/withdraw", data);
      if (res.data.success) {
        setError("Withdrawal Successful");
      } else {
        setError("Withdrawal Failed");
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (e) => {
    try {
      setWalletType(e.target.value);
      e.preventDefault();
      e.stopPropagation();
      setLoading(true);
      const res = await axios.get(
        `/wallet?id=${auth.user._id}&type=${e.target.value}`
      );
      if (res.data.success) {
        setWalletDetailsIsAvailable(true);
        setError(null);
      } else {
        setWalletDetailsIsAvailable(false);
        setError("Please add wallet details first");
      }
    } catch (error) {
      setError(error.response.data.message);
      setWalletDetailsIsAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  const getWalletDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/wallet/${auth.user._id}`);
      if (res.data.success) {
        setWalletDetailsIsAvailable(true);
        setWalletType(res?.data?.data?.type);
      } else {
        setWalletDetailsIsAvailable(false);
        setError("Please add wallet details first");
      }
    } catch (error) {
      setError(error.response.data.message);
      setWalletDetailsIsAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWalletDetails();
  }, []);

  return (
    <section className="w-max p-5 ">
      <div className="flex justify-between gap-5">
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
        {error === "No wallet details found" && (
          <button
            onClick={() => navigate("/affiliate-panel/add-wallet-details")}
          >
            Add Withdraw Details
          </button>
        )}
      </div>
      <h1 className="text-3xl flex gap-3">
        Your earnings <p className="font-bold">{state.earning}</p>
      </h1>
      <form className="flex flex-col gap-5 my-5">
        <select
          className="border p-3 rounded-xl"
          onChange={(e) => handleChange(e)}
          value={walletType}
        >
          <option value="paypal">Paypal</option>
          <option value="stripe">Stripe</option>
          <option value="paytm">Paytm</option>
          <option value="gpay">Gpay</option>
          <option value="bank">Bank</option>
          <option value="phonePe">Phone Pe</option>
          <option value="upi">Upi ID</option>
        </select>
        {loading ? (
          <p>loading...</p>
        ) : walletDetailsIsAvailable ? (
          <input
            type="text"
            placeholder="Enter Amount to Withdraw"
            className="border p-3 rounded-xl"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        ) : null}

        <button
          className="bg-blue-500 text-white p-3 rounded-xl"
          disabled={!walletDetailsIsAvailable}
          onClick={withdrawEarnings}
        >
          Withdraw
        </button>
      </form>
    </section>
  );
};

export default WithdrawEarnings;
