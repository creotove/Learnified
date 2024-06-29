import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../apis/affiliate-user";
import { useNavigate } from "react-router-dom";

const AddWalletDetails = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [walletDetails, setWalletDetails] = useState({});
  const [walletType, setWalletType] = useState("paypal");

  const handleSubmitWalletDetails = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      if (walletType === "bank") {
        if (
          !walletDetails.accountHolderName ||
          !walletDetails.bankName ||
          !walletDetails.accountNumber ||
          !walletDetails.ifsc
        ) {
          setError("Please fill all the fields");
          return;
        }
      } else if (walletType === "paypal") {
        if (!walletDetails.paypal) {
          setError("Please enter paypal email");
          return;
        }
      } else if (walletType === "stripe") {
        if (!walletDetails.stripe) {
          setError("Please enter stripe email");
          return;
        }
      } else if (walletType === "paytm") {
        if (!walletDetails.paytm) {
          setError("Please enter paytm number");
          return;
        }
      } else if (walletType === "gpay") {
        if (!walletDetails.gpay) {
          setError("Please enter gpay number");
          return;
        }
      } else if (walletType === "phonePe") {
        if (!walletDetails.phonePe) {
          setError("Please enter phone pe number");
          return;
        }
      } else if (walletType === "upi") {
        if (!walletDetails.upi) {
          setError("Please enter upi id");
          return;
        }
      }
      const res = await axios.post(`/wallet/${auth.user._id}`, walletDetails);
      if (res.data.success) {
        navigate("/affiliate-panel");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

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
      <form className="flex flex-col gap-5">
        <select
          className="border p-3 rounded-xl"
          onChange={(e) => setWalletType(e.target.value)}
        >
          <option value="paypal">Paypal</option>
          <option value="stripe">Stripe</option>
          <option value="paytm">Paytm</option>
          <option value="gpay">Gpay</option>
          <option value="bank">Bank</option>
          <option value="phonePe">Phone Pe</option>
          <option value="upi">Upi ID</option>
        </select>
        {walletType === "paypal" && (
          <input
            type="text"
            placeholder="Enter Paypal Email"
            className="border p-3 rounded-xl"
            onChange={(e) => setWalletDetails({ paypal: e.target.value })}
          />
        )}
        {walletType === "stripe" && (
          <input
            type="text"
            placeholder="Enter Stripe Email"
            className="border p-3 rounded-xl"
            onChange={(e) => setWalletDetails({ stripe: e.target.value })}
          />
        )}
        {walletType === "paytm" && (
          <input
            type="text"
            placeholder="Enter Paytm Number"
            className="border p-3 rounded-xl"
            onChange={(e) => setWalletDetails({ paytm: e.target.value })}
          />
        )}
        {walletType === "gpay" && (
          <input
            type="text"
            placeholder="Enter Gpay Number"
            className="border p-3 rounded-xl"
            onChange={(e) => setWalletDetails({ gpay: e.target.value })}
          />
        )}
        {walletType === "bank" && (
          <>
            <input
              type="text"
              placeholder="Enter Account Holder Name"
              className="border p-3 rounded-xl"
              onChange={(e) =>
                setWalletDetails({
                  ...walletDetails,
                  accountHolderName: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Enter Bank Name"
              className="border p-3 rounded-xl"
              onChange={(e) =>
                setWalletDetails({ ...walletDetails, bankName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Enter Bank Account Number"
              className="border p-3 rounded-xl"
              onChange={(e) =>
                setWalletDetails({
                  ...walletDetails,
                  accountNumber: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Enter IFSC Code"
              className="border p-3 rounded-xl"
              onChange={(e) =>
                setWalletDetails({ ...walletDetails, ifsc: e.target.value })
              }
            />
          </>
        )}
        {walletType === "phonePe" && (
          <input
            type="text"
            placeholder="Enter PhonePe Number"
            className="border p-3 rounded-xl"
            onChange={(e) => setWalletDetails({ phonePe: e.target.value })}
          />
        )}
        {walletType === "upi" && (
          <input
            type="text"
            placeholder="Enter UPI ID"
            className="border p-3 rounded-xl"
            onChange={(e) => setWalletDetails({ upi: e.target.value })}
          />
        )}
        <button
          className="bg-blue-500 text-white p-3 rounded-xl"
          onClick={handleSubmitWalletDetails}
        >
          Add Wallet Details
        </button>
      </form>
    </section>
  );
};

export default AddWalletDetails;
