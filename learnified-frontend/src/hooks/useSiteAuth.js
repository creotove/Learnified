import { useContext } from "react";
import SiteAuthContext from "../context/SiteAuthProvider.js";

const useSiteAuth = () => {
  return useContext(SiteAuthContext);
};

export default useSiteAuth;
