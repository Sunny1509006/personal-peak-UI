import React, {useEffect, useState} from "react";
import DashboardHomepage from "./DashboardHomepage";
import ThemeCustomizer from "./ThemeCustomizer";
import "./AdminSidebar.css"
import TermsPopup from "./TermsPopup";

const DashboardPage = () => {
  const [showTerms, setShowTerms] = useState(false); // Controls popup visibility

  useEffect(() => {
    // Check local storage for agreement status
    const hasAgreed = localStorage.getItem("hasAgreedToTerms");

    if (!hasAgreed) {
      // Show popup if the user hasn't agreed before
      setShowTerms(true);
    }
  }, []);

  const handleAgree = () => {
    // Set agreement status in local storage
    localStorage.setItem("hasAgreedToTerms", "true");
    setShowTerms(false); // Hide the popup
  };
  
  useEffect(() => {
    // Get the root element
    const rootElement = document.getElementById("root");

    // Add the "dashboard" class
    rootElement.classList.add("dashboard");

    // Cleanup function to remove the "dashboard" class when the component unmounts
    return () => {
      rootElement.classList.remove("dashboard");
    };
  }, []);

  return (
    <div className="wrapper mt-3">
      {showTerms && <TermsPopup onAgree={handleAgree} />}
      {/* Sidebar Wrapper */}
      <div className="sidebar-wrapper" data-simplebar="true">
        <div className="sidebar-header">
          <div>
            <img
              src="assets/images/logo.png"
              className="logo-icon-2 w-75"
              alt="Logo"
            />
          </div>
          <a href="#" className="toggle-btn ms-auto">
            <i className="bx bx-menu"></i>
          </a>
        </div>
        {/* Navigation */}
        <ul className="metismenu" id="menu">
          <li>
            <a href="#">
              <div className="parent-icon icon-color-1">
                <i className="bx bx-home-alt"></i>
              </div>
              <div className="menu-title">Home Page</div>
            </a>
          </li>
          <li className="menu-label">Admin Area</li>
          <li>
            <a href="emailbox.html">
              <div className="parent-icon icon-color-2">
                <i className="bx bx-envelope"></i>
              </div>
              <div className="menu-title">Pre-registrations</div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="parent-icon icon-color-3">
                <i className="bx bx-conversation"></i>
              </div>
              <div className="menu-title">User</div>
            </a>
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

      {/* Header */}
      <header className="top-header">
        <nav className="navbar navbar-expand">
          <div className="left-topbar d-flex align-items-center">
            <a href="#" className="toggle-btn">
              <i className="bx bx-menu"></i>
            </a>
          </div>
          <div className="flex-grow-1 search-bar">
            <div className="input-group">
              <button className="btn btn-search-back search-arrow-back" type="button">
                <i className="bx bx-arrow-back"></i>
              </button>
              <input type="text" className="form-control" placeholder="Search" />
              <button className="btn btn-search" type="button">
                <i className="lni lni-search-alt"></i>
              </button>
            </div>
          </div>
          <div className="right-topbar ms-auto">
            <ul className="navbar-nav">
              <li className="nav-item search-btn-mobile">
                <a className="nav-link position-relative" href="#">
                  <i className="bx bx-search vertical-align-middle"></i>
                </a>
              </li>
              <li className="nav-item dropdown dropdown-lg">
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <span className="msg-count">6</span>
                  <i className="bx bx-comment-detail vertical-align-middle"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                <a href="#">
                  <div className="msg-header">
                    <h6 className="msg-header-title">6 New</h6>
                    <p className="msg-header-subtitle">Application Messages</p>
                  </div>
                </a>
                <div className="header-message-list">
                  {[...Array(6)].map((_, index) => (
                    <a className="dropdown-item" href="#" key={index}>
                      <div className="d-flex align-items-center">
                        <div className="user-online">
                          <img
                            src={`assets/images/avatars/avatar-${index + 1}.png`}
                            className="msg-avatar"
                            alt="user avatar"
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">
                            User {index + 1} <span className="msg-time float-end">{`${index + 1} min ago`}</span>
                          </h6>
                          <p className="msg-info">Message preview {index + 1}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <a href="#">
                  <div className="text-center msg-footer">View All Messages</div>
                </a>
              </div>
            </li>

              {/* Notifications Dropdown */}
              <li className="nav-item dropdown dropdown-lg">
              <a
                className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bx bx-bell vertical-align-middle"></i>
                <span className="msg-count">8</span>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <a href="#">
                  <div className="msg-header">
                    <h6 className="msg-header-title">8 New</h6>
                    <p className="msg-header-subtitle">Application Notifications</p>
                  </div>
                </a>
                <div className="header-notifications-list">
                  {[...Array(8)].map((_, index) => (
                    <a className="dropdown-item" href="#" key={index}>
                      <div className="d-flex align-items-center">
                        <div className={`notify bg-light-primary text-primary`}>
                          <i className="bx bx-group"></i>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">
                            Notification {index + 1} <span className="msg-time float-end">{`${index + 1} hrs ago`}</span>
                          </h6>
                          <p className="msg-info">Notification detail {index + 1}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <a href="#">
                  <div className="text-center msg-footer">View All Notifications</div>
                </a>
              </div>
            </li>

            {/* User Profile Dropdown */}
            <li className="nav-item dropdown dropdown-user-profile">
              <a
                className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                href="#"
                data-bs-toggle="dropdown"
              >
                <div className="d-flex user-box align-items-center">
                  <div className="user-info">
                    <p className="user-name mb-0">Jessica Doe</p>
                    <p className="designation mb-0">Available</p>
                  </div>
                  <img
                    src="assets/images/avatars/avatar-1.png"
                    className="user-img"
                    alt="user avatar"
                  />
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                {["Profile", "Settings", "Dashboard", "Earnings", "Downloads"].map((item, index) => (
                  <a className="dropdown-item" href="#" key={index}>
                    <i className={`bx bx-${item.toLowerCase()}`}></i>
                    <span>{item}</span>
                  </a>
                ))}
                <div className="dropdown-divider mb-0"></div>
                <a className="dropdown-item" href="#">
                  <i className="bx bx-power-off"></i>
                  <span>Logout</span>
                </a>
              </div>
            </li>

            {/* Language Dropdown */}
            <li className="nav-item dropdown dropdown-language">
              <a
                className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                href="#"
                data-bs-toggle="dropdown"
              >
                <div className="lang d-flex">
                  <div>
                    <i className="flag-icon flag-icon-um"></i>
                  </div>
                  <div>
                    <span>En</span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                {["German", "French", "English", "Hindi", "Chinese", "Arabic"].map((lang, index) => (
                  <a className="dropdown-item" href="#" key={index}>
                    <i className={`flag-icon flag-icon-${lang.toLowerCase().slice(0, 2)}`}></i>
                    <span>{lang}</span>
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </nav>
      </header>

      {/* Page Content */}
      <div className="page-wrapper">
        <div className="page-content-wrapper">
         <DashboardHomepage />
        </div>
      </div>

     
      <ThemeCustomizer />
    </div>
  );
};

export default DashboardPage;
