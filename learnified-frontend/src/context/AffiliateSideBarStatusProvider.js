import { createContext, useEffect, useState } from "react";

const AffiliateSideBarStatusContext = createContext({});

export const AffiliateSideBarStatusProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(true);

  const updateSidebarStatus = () => {
    if (window.innerWidth >= 768) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  useEffect(() => {
    updateSidebarStatus();
    window.addEventListener("resize", updateSidebarStatus);
    return () => window.removeEventListener("resize", updateSidebarStatus);
  }, []);

  return (
    <AffiliateSideBarStatusContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </AffiliateSideBarStatusContext.Provider>
  );
};

export default AffiliateSideBarStatusContext;
