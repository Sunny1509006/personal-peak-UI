import React from "react";

const Sidebar = () => {
  return (
    <aside className="sidebar-wrapper">
      <div className="sidebar-header">
        <h4>Your App Name</h4>
      </div>
      <ul className="sidebar-menu">
        {/* Replace with your menu items */}
        <li className="menu-item">
          <a href="#dashboard">
            <i className="menu-icon bx bx-home"></i>
            Dashboard
          </a>
        </li>
        {/* Add other menu items */}
      </ul>
    </aside>
  );
};

export default Sidebar;
