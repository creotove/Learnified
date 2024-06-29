import { useContext } from "react";
import AffiliateSideBarStatusProvider from "../context/AffiliateSideBarStatusProvider";

const useAffiliateSideBarStatus = () => {
  return useContext(AffiliateSideBarStatusProvider);
};

export default useAffiliateSideBarStatus;
