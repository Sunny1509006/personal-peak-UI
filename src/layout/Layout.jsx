import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div class="wrapper bg-white mt-3">
      <Sidebar />
      <div className="content-wrapper">
        <Header />
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
