import { useContext } from "react";
import DashBoardSideBarStatusProvider from "../context/DashBoardSideBarStatusProvider";

const useDashBoardSideBarStatus = () => {
  return useContext(DashBoardSideBarStatusProvider);
};

export default useDashBoardSideBarStatus;
