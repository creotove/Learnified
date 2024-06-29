import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useSiteAuth from "../hooks/useSiteAuth";

const Index = () => {
  const { siteAuth } = useSiteAuth();
  const navigate = useNavigate();
  const checkUserIsAffiliate = async () => {
    try {
      const isUserAffiliate = siteAuth?.user?.isAffiliated;
      if (!isUserAffiliate) {
        navigate("/become-an-affiliate");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserIsAffiliate();
  }, []);

  return (
    <section className="flex gap-x-5 whitespace-nowrap">
      <nav className="flex gap-5 flex-col ">
        <NavLink
          end
          to="/affiliate-panel"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "p-3 bg-black text-white" : "p-3"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          end
          to="/affiliate-panel/generate-links"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "p-3 bg-black text-white" : "p-3"
          }
        >
          Links
        </NavLink>
        <NavLink
          end
          to="/affiliate-panel/earnings"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "p-3 bg-black text-white" : "p-3"
          }
        >
          Earnings
        </NavLink>
        <NavLink
          end
          to="/affiliate-panel/payout-details"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "p-3 bg-black text-white" : "p-3"
          }
        >
          Payout Details
        </NavLink>
        <NavLink
          end
          to="/log-out"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "p-3 bg-black text-white" : "p-3"
          }
        >
          Logout
        </NavLink>
      </nav>

      <section className="w-full">
        <Outlet />
      </section>
    </section>
  );
};

export default Index;
