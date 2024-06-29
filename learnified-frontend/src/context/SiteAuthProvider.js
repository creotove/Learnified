import { createContext, useState } from "react";

const SiteAuthContext = createContext({});

export const SiteAuthProvider = ({ children }) => {
  const [siteAuth, setSiteAuth] = useState({
    user: null,
  });
  return (
    <SiteAuthContext.Provider value={{ siteAuth, setSiteAuth }}>
      {children}
    </SiteAuthContext.Provider>
  );
};

export default SiteAuthContext;
