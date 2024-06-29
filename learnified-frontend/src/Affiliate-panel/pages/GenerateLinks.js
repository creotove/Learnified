import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../apis/affiliate-user";

const GenerateLinks = () => {
  const { auth } = useAuth();
  const [copySuccess, setCopySuccess] = useState(false);
  const [referedUsers, setReferedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCopyURL = () => {
    navigator.clipboard.writeText(
      `http://ttg.digitalcret.in/sign-up?referral=${auth.user.referralCode}`
    );
    setCopySuccess(true);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setCopySuccess(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [copySuccess]);
  const getMyReferedUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/refered-users/${auth.user._id}`);
      if (res.data.success) {
        setReferedUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMyReferedUsers();
  }, []);
  return (
    <section className="">
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
      {copySuccess && (
        <div className="bg-black p-3 text-green-500">Copied to clipboard</div>
      )}
      <div className="text-2xl">Generate Links</div>
      <div className="text-lg">
        Your referral link is:{" "}
        <span className="text-blue-500 cursor-pointer" onClick={handleCopyURL}>
          {`http://ttg.digitalcret.in/sign-up?referral=${auth.user.referralCode}`}
        </span>
      </div>
      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="p-2 border text-center">#</th>
              <th className="p-2 border text-center">Name</th>
              <th className="p-2 border text-center">Signed Up</th>
              <th className="p-2 border text-center">Affiliated</th>
              <th className="p-2 border text-center">Affiliated - Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-2 border text-center " colSpan="5">
                  loading....
                </td>
              </tr>
            ) : referedUsers.length > 0 ? (
              referedUsers.map((user, index) => {
                return (
                  <tr key={user._id} className="border p-5">
                    <td className="p-2 border text-center">{index + 1}</td>
                    <td className="p-2 border text-center">{user.name}</td>
                    <td className="p-2 border text-center">
                      {user.signedUped ? "Yes" : "No"}
                    </td>
                    <td className="p-2 border text-center">
                      {user.purchasedPackage ? "Yes" : "No"}
                    </td>
                    <td className="p-2 border text-center">
                      {user.purchaseDate ? user.purchaseDate : "N/A"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="p-2 border text-center text-center" colSpan="5">
                  No refered users
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default GenerateLinks;
