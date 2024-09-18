import React, { Suspense } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
// import UserContextProvider from "../Context/UserContextProvider";
// import MainContent from "./MainContent";

function Adminpage() {
  return (
    <>
      {/* <UserContextProvider> */}
        <Suspense fallback={<div>Loading...</div>}>
          <div className="main-container">
            <Header />
            <Sidebar />
            <div className="panel-content">
              <div className="main-content">
                {/* <MainContent/> */}
                <Outlet />
              </div>
            </div>
          </div>
        </Suspense>
        {/* </UserContextProvider> */}
    </>
  );
}

export default Adminpage;
