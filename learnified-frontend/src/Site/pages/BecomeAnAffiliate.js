import affiliatedAxios from "../../apis/affiliate-user";
import userAxios from "../../apis/user";
import React, { useEffect, useState } from "react";
import {
  //  useLocation,
  useNavigate,
} from "react-router-dom";
import useSiteAuth from "../../hooks/useSiteAuth";

const BecomeAnAffiliate = () => {
  const { siteAuth } = useSiteAuth();
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const becomeAnAffiliate = async (e, packageId) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      if (localStorage.getItem("accessToken")) {
        const res = await affiliatedAxios.post(
          `/become-an-affiliate?packageId=${packageId}&userId=${siteAuth?.user?._id}`
        );
        if (res.data.success) {
          navigate("/affiliate-panel");
        }
      } else {
        navigate("/log-in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllPackages = async () => {
    try {
      const res = await userAxios.get("/packages");
      if (res.data.success) {
        const data = res.data.data;
        setPackages(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllPackages();
  }, []);

  return (
    <section>
      <h1>Become an Affiliate</h1>
      <p>Join our affiliate program and earn money by promoting our courses</p>
      <div className="flex gap-5">
        {packages && packages?.length > 0 ? (
          packages.map((pack) => {
            return (
              <div key={pack._id} className="border p-5">
                <h3>{pack.name}</h3>
                <p className="p-3 bg-white text-black rounded-xl">
                  {pack.description}
                </p>
                <p>Price: {pack.price}</p>
                <button onClick={(e) => becomeAnAffiliate(e, pack._id)}>
                  Become
                </button>
              </div>
            );
          })
        ) : (
          <p>No packages available</p>
        )}
      </div>
    </section>
  );
};

export default BecomeAnAffiliate;
