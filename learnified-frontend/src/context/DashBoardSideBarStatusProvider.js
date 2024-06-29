import { createContext, useEffect, useState } from "react";

const DashBoardSideBarStatusContext = createContext({});

export const DashBoardSideBarStatusProvider = ({ children }) => {
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
    <DashBoardSideBarStatusContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </DashBoardSideBarStatusContext.Provider>
  );
};

export default DashBoardSideBarStatusContext;
