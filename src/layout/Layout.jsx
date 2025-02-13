import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./../pages/dashboard/adminSidebar.css";

const Layout = ({ children }) => {
  return (
    <div className="wrapper mt-3">
      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      <Header />

      {/* Page Content */}
      <div className="page-wrapper">
        <div className="page-content-wrapper">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
