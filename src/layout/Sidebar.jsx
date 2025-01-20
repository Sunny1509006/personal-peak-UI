import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../pages/dashboard/AdminSidebar.css";

const Sidebar = () => {
  
  const isAccessible = (roles) => {
    const userRoles = JSON.parse(localStorage.getItem("user_type")) || [];
    // If `roles` is a string, convert it to an array for consistency
    if (typeof roles === "string") roles = [roles];
  
    // Check if any of the user roles match the required roles
    return roles.some((role) => userRoles.includes(role));
  };

  const [isToggled, setIsToggled] = useState(false);
  const [isHovered, setIsHovered] = useState(true);

  const handleToggle = () => {
    setIsToggled(!isToggled); // Toggle the sidebar state
    // setIsHovered(!isHovered)
    const wrapper = document.querySelector(".wrapper");
    if (isToggled) {
      wrapper.classList.remove("toggled");
    } else {
      wrapper.classList.add("toggled");
    }
  };

  const handleMouseEnter = () => { 
    
    if (isToggled) {
      setIsHovered(true);
      const wrapper = document.querySelector(".wrapper");
      wrapper.classList.add("sidebar-hovered");
    }
  };

  const handleMouseLeave = () => {
    
    if (isToggled) {
      setIsHovered(false);
      const wrapper = document.querySelector(".wrapper");
      wrapper.classList.remove("sidebar-hovered");
    }
  };

  return (
    <aside
      className="sidebar-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar-wrapper" data-simplebar="true">
        <div className="sidebar-header">
          <div>
            <img
              src="assets/images/logo.png"
              className="logo-icon-2 w-75"
              alt="Logo"
            />
          </div>
          {isHovered  && (
          <button
            type="button"
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
            onClick={handleToggle}
          >
            <i className="bx bx-menu" style={{fontSize: '30px'}}></i>
          </button>
        )}
        </div>
        {/* Navigation */}
        <ul className="metismenu" id="menu">
          <li>
            <Link to="/dashboard">
              <div className="parent-icon icon-color-1">
                <i className="bx bx-home-alt"></i>
              </div>
              <div className="menu-title">Home Page</div>
            </Link>
          </li>
          <li className="menu-label">Admin Area</li>
          <li className={`menu-item ${
            isAccessible(["SSA", "WLA"]) ? "" : "transparent-item"
          }`}>
            {isAccessible(["SSA", "WLA"]) ? (
            <Link to="/pre-registration">
              <div className="parent-icon icon-color-2">
                <i className="bx bx-envelope"></i>
              </div>
              <div className="menu-title">Pre-registrations</div>
            </Link>
            ) : (
              <div className="locked-item">
              <div className="parent-icon icon-color-2">
                <i className="bx bx-envelope"></i>
              </div>
              <div className="menu-title">Pre-registrations</div>
              <i className="bx bx-lock lock-icon"></i>
            </div>
            )}
          </li>
          <li>
            <Link to="/user">
              <div className="parent-icon icon-color-3">
                <i className="bx bx-conversation"></i>
              </div>
              <div className="menu-title">User</div>
            </Link>
          </li>
          <li>
            <a href="chat-box.html">
              <div className="parent-icon icon-color-3">
                <i className="bx bx-conversation"></i>
              </div>
              <div className="menu-title">Live Chat</div>
            </a>
          </li>
               {/* Accounting */}
      <li>
        <a className="has-arrow" href="#">
          <div className="parent-icon icon-color-10">
            <i className="bx bx-spa"></i>
          </div>
          <div className="menu-title">Accounting</div>
        </a>
        <ul>
          <li>
            <a href="/invoice">
              <i className="bx bx-right-arrow-alt"></i>Invoices
            </a>
          </li>
          <li>
            <a href="/component-bedges">
              <i className="bx bx-right-arrow-alt"></i>Offers
            </a>
          </li>
        </ul>
      </li>

      {/* Training Hall */}
      <li>
        <a className="has-arrow" href="#">
          <div className="parent-icon icon-color-10">
            <i className="bx bx-spa"></i>
          </div>
          <div className="menu-title">Training Hall</div>
        </a>
        <ul>
          <li>
            <a href="/invoice">
              <i className="bx bx-right-arrow-alt"></i>Exercises
            </a>
          </li>
          <li>
            <a href="/component-bedges">
              <i className="bx bx-right-arrow-alt"></i>Training Plans
            </a>
          </li>
          <li>
            <a href="/invoice">
              <i className="bx bx-right-arrow-alt"></i>Upload & Analysis
            </a>
          </li>
          <li>
            <a href="/component-bedges">
              <i className="bx bx-right-arrow-alt"></i>Fitness Test
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a className="has-arrow" href="#">
          <div className="parent-icon icon-color-10">
            <i className="bx bx-spa"></i>
          </div>
          <div className="menu-title">Nutrition & Analysis</div>
        </a>
        <ul>
          <li>
            <a href="/invoice">
              <i className="bx bx-right-arrow-alt"></i>Nutrition Plans
            </a>
          </li>
        </ul>
      </li>

      {/* Settings */}
      <li>
        <a className="has-arrow" href="#">
          <div className="parent-icon icon-color-10">
            <i className="bx bx-spa"></i>
          </div>
          <div className="menu-title">Settings</div>
        </a>
        <ul>
          <li>
            <a href="/invoice">
              <i className="bx bx-right-arrow-alt"></i>Generally
            </a>
          </li>
          <li>
            <a href="/component-bedges">
              <i className="bx bx-right-arrow-alt"></i>Legal
            </a>
          </li>
          <li>
            <a href="/invoice">
              <i className="bx bx-right-arrow-alt"></i>Welcome Page
            </a>
          </li>
          <li>
            <a href="/component-bedges">
              <i className="bx bx-right-arrow-alt"></i>Awards / Badges
            </a>
          </li>
          <li>
            <a href="/invoice">
              <i className="bx bx-right-arrow-alt"></i>Accounting
            </a>
          </li>
          <li>
            <a href="/pricing">
              <i className="bx bx-right-arrow-alt"></i>eCommerce shop
            </a>
          </li>
        </ul>
      </li>

      {/* Kanban Board */}
      <li>
        <a href="/kanban">
          <div className="parent-icon icon-color-5">
            <i className="bx bx-group"></i>
          </div>
          <div className="menu-title">Kanban Board</div>
        </a>
      </li>

      {/* Todo List */}
      <li>
        <a href="/to-do">
          <div className="parent-icon icon-color-6">
            <i className="bx bx-task"></i>
          </div>
          <div className="menu-title">Todo List</div>
        </a>
      </li>

      {/* Cockpit Label */}
      <li className="menu-label">Cockpit</li>

      {/* My Profile */}
      <li>
        <a href="/user-profile">
          <div className="parent-icon icon-color-4">
            <i className="bx bx-user-circle"></i>
          </div>
          <div className="menu-title">My Profile</div>
        </a>
      </li>

      {/* Accounting */}
      <li>
        <a className="has-arrow" href="#">
          <div className="parent-icon icon-color-10">
            <i className="bx bx-spa"></i>
          </div>
          <div className="menu-title">Accounting</div>
        </a>
        <ul>
          <li>
            <a href="/invoice">
              <i className="bx bx-right-arrow-alt"></i>Invoices
            </a>
          </li>
          <li>
            <a href="/component-bedges">
              <i className="bx bx-right-arrow-alt"></i>Offers
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#">
          <div className="parent-icon icon-color-11">
            <i className="bx bx-repeat"></i>
          </div>
          <div className="menu-title">eCommerce Shop</div>
        </a>
      </li>

      {/* Live Chat */}
      <li>
        <a href="/chat-box">
          <div className="parent-icon icon-color-3">
            <i className="bx bx-conversation"></i>
          </div>
          <div className="menu-title">Live Chat</div>
        </a>
      </li>

      {/* Calendar */}
      <li>
        <a href="/fullcalendar">
          <div className="parent-icon icon-color-8">
            <i className="bx bx-calendar-check"></i>
          </div>
          <div className="menu-title">Calendar</div>
        </a>
      </li>

      {/* Diary */}
      <li>
        <a href="#">
          <div className="parent-icon icon-color-12">
            <i className="bx bx-donate-blood"></i>
          </div>
          <div className="menu-title">Diary</div>
        </a>
      </li>

      {/* Nutrition & Analysis Label */}
      <li className="menu-label">Nutrition & Analysis</li>

      {/* Nutrition Tracking */}
      <li>
        <a href="#">
          <div className="parent-icon icon-color-1">
            <i className="bx bx-comment-edit"></i>
          </div>
          <div className="menu-title">Nutrition Tracking</div>
        </a>
      </li>

      {/* Measurements / Results */}
      <li>
        <a href="#">
          <div className="parent-icon icon-color-2">
            <i className="bx bx-grid-alt"></i>
          </div>
          <div className="menu-title">Measurements / Results</div>
        </a>
      </li>

      {/* Diary */}
      <li>
        <a href="#">
          <div className="parent-icon icon-color-12">
            <i className="bx bx-donate-blood"></i>
          </div>
          <div className="menu-title">Diary</div>
        </a>
      </li>

      {/* Training Hall Label */}
      <li className="menu-label">Training Hall</li>

      {/* Exercises */}
      <li>
        <a href="#">
          <div className="parent-icon icon-color-9">
            <i className="bx bx-line-chart"></i>
          </div>
          <div className="menu-title">Exercises</div>
        </a>
      </li>

      {/* Training Plans */}
      <li>
        <a href="#">
          <div className="parent-icon icon-color-10">
            <i className="bx bx-map-alt"></i>
          </div>
          <div className="menu-title">Training Plans</div>
        </a>
      </li>

      {/* Upload and Analysis */}
      <li>
        <a href="#">
          <div className="parent-icon icon-color-10">
            <i className="bx bx-map-alt"></i>
          </div>
          <div className="menu-title">Upload and Analysis</div>
        </a>
      </li>

      {/* Diary */}
      <li>
        <a href="#">
          <div className="parent-icon icon-color-10">
            <i className="bx bx-map-alt"></i>
          </div>
          <div className="menu-title">Diary</div>
        </a>
      </li>
          {/* Add more menu items as needed */}
        </ul>
        {/* End Navigation */}
      </div>
    </aside>
  );
};

export default Sidebar;

