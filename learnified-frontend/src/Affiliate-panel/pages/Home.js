import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SmallBox from "../affiliate-panel-components/SmallBox";
import walletIcon from "../../assets/icons/pack/walletIcon.svg";
import pieChartIcon from "../../assets/icons/pack/pieChartIcon.svg";
import dollarIcon from "../../assets/icons/pack/moneyIcon.svg";
import barChartIcon from "../../assets/icons/pack/barGraphGrowthIcon.svg";
import Wallet from "../affiliate-panel-components/Wallet";
import RecentEnrollments from "../affiliate-panel-components/RecentEnrollments";
import axios from "../../apis/affiliate-user";

import { RUPEE_ICON } from "../../constants";

const Home = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [earnings, setEarnings] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const checkUserIsAffiliatedOrNot = useCallback(() => {
    if (!auth?.user?.isAffiliated) {
      navigate("/become-an-affiliate", { state: { from: "affiliate-panel" } });
    }
  }, [navigate, auth?.user?.isAffiliated]);

  const getUSerEarnings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/earnings/${auth?.user?._id}`);
      if (res.data.success) {
        setEarnings(res.data.data);
      } else {
        setEarnings([]);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUSerEarnings();
  }, []);

  useEffect(() => {
    checkUserIsAffiliatedOrNot();
  }, [checkUserIsAffiliatedOrNot]);

  const getCurrentTimeStatus = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const walletOPtions = [
    {
      name: "Add Wallet Details",
      to: "/affiliate-panel/add-wallet-details",
    },
    {
      name: "Withdraw Earnings",
      to: "/affiliate-panel/withdraw-earnings",
    },
  ];

  return (
    <section className="flex flex-col gap-10 mx-5">
      <h2 className="font-bold text-3xl hidden lg:block">
        {getCurrentTimeStatus()} {auth?.user?.firstName}!
      </h2>
      <section className="lg:flex gap-5 grid grid-cols-1 md:grid-cols-2">
        <SmallBox
          icon={walletIcon}
          options={walletOPtions}
          mainContent={RUPEE_ICON + earnings?.todaysEarnings || 0}
          subContent="Today earning"
        />
        <SmallBox
          icon={pieChartIcon}
          options={[]}
          mainContent={RUPEE_ICON + earnings?.last7DaysEarnings || 0}
          subContent="Last 7 day earning"
        />
        <SmallBox
          icon={dollarIcon}
          options={[]}
          mainContent={RUPEE_ICON + earnings?.monthlyEarnings || 0}
          subContent="Last 30 day earning"
        />
        <SmallBox
          icon={barChartIcon}
          options={[]}
          mainContent={RUPEE_ICON + earnings?.totalEarnings || 0}
          subContent="All time earning"
        />
      </section>
      <section className="flex gap-5 flex-wrap">
        <div className="flex-col whitespace-nowrap">
          <div className="rounded-3xl shadow-lg p-5 md:min-w-96 md:min-h-44">
            <h5 className="text-xl">New enrollments</h5>
            <div className="flex justify-between">
              <p className="text-4xl">54</p>
              <span className="bg-[#e1fbdb] text-[#6ac055] p-2 rounded-lg">
                +18.7v
              </span>
            </div>
          </div>
          <div className="rounded-3xl shadow-lg p-5 md:min-w-96 md:min-h-44">
            <h5 className="text-xl">Target</h5>
            <div className="flex justify-between">
              <p className="text-4xl">6</p>
              <span className="bg-[#e1fbdb] text-[#6ac055] p-2 rounded-lg">
                +18.7v
              </span>
            </div>
          </div>
        </div>
        {/* Graph */}
        <div className="shadow-lg rounded-3xl p-5 flex-1">asd</div>
      </section>
      <section className="flex gap-5 ">
        <Wallet />
      </section>
      <section className="flex gap-5 ">
        <RecentEnrollments />
      </section>
    </section>
  );
};
export default Home;
