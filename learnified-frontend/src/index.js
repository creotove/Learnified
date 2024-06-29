import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { SiteAuthProvider } from "./context/SiteAuthProvider";
import { DashBoardSideBarStatusProvider } from "./context/DashBoardSideBarStatusProvider";
import { AffiliateSideBarStatusProvider } from "./context/AffiliateSideBarStatusProvider";
import { VideoPlayerProvider } from "./context/VideoPlayerProvider.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SiteAuthProvider>
    <AuthProvider>
      <DashBoardSideBarStatusProvider>
        <AffiliateSideBarStatusProvider>
          <VideoPlayerProvider>
            <BrowserRouter>
              {/* <React.StrictMode> */}
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
              {/* </React.StrictMode> */}
            </BrowserRouter>
          </VideoPlayerProvider>
        </AffiliateSideBarStatusProvider>
      </DashBoardSideBarStatusProvider>
    </AuthProvider>
  </SiteAuthProvider>
);
