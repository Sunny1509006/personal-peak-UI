import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { fetchTranslations, fetchTranslationIfMissing } from "../utils/fetchTranslations";

const Sidebar = () => {
  const component_name = "sidebar";

 // Get language from localStorage OR default to "de"
 const [languageCode, setLanguageCode] = useState(() => {
  return localStorage.getItem("appLanguage") || "de";
});

// Load translations from sessionStorage for this specific component
const [translations, setTranslations] = useState(() => {
  const savedTranslations = JSON.parse(sessionStorage.getItem(`translations_${component_name}_${languageCode}`));
  return savedTranslations || {};
});

const [textsToTranslate, setTextsToTranslate] = useState(new Set());
const [isTranslationLoaded, setIsTranslationLoaded] = useState(
  sessionStorage.getItem(`translations_${component_name}_${languageCode}`) !== null
);

useEffect(() => {
  const fetchComponentTranslations = async () => {
    if (!isTranslationLoaded) {
      setIsTranslationLoaded(false);
      const fetchedTranslations = await fetchTranslations(component_name, languageCode);
      setTranslations(fetchedTranslations);
      sessionStorage.setItem(`translations_${component_name}_${languageCode}`, JSON.stringify(fetchedTranslations));
      setIsTranslationLoaded(true);
    }
  };
  fetchComponentTranslations();
}, [languageCode]);

useEffect(() => {
  const handleStorageChange = () => {
    const storedLanguage = localStorage.getItem("appLanguage") || "de";
    if (storedLanguage !== languageCode) {
      setLanguageCode(storedLanguage);
      setTranslations({}); // Reset translations when language changes
      setIsTranslationLoaded(false);
    }
  };
  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, [languageCode]);

const checkAndFetchTranslation = (text) => {
  if (!isTranslationLoaded) return "Loading...";

  if (!translations[text] && !textsToTranslate.has(text)) {
    setTextsToTranslate((prev) => new Set(prev).add(text));
    fetchTranslationIfMissing(component_name, text).then((translatedText) => {
      setTranslations((prev) => {
        const updatedTranslations = { ...prev, [text]: translatedText };
        sessionStorage.setItem(`translations_${component_name}_${languageCode}`, JSON.stringify(updatedTranslations));
        return updatedTranslations;
      });
    });
  }
  return translations[text] || text;
};


  const isAccessible = (roles) => {
    const userRoles = JSON.parse(localStorage.getItem("user_type")) || [];
    // If `roles` is a string, convert it to an array for consistency
    if (typeof roles === "string") roles = [roles];

    // Check if any of the user roles match the required roles
    return roles.some((role) => userRoles.includes(role));
  };

  const [isToggled, setIsToggled] = useState(false);
  const [isHovered, setIsHovered] = useState(true);

  // Add state for managing dropdown toggles
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Function to handle toggling the dropdown menu
  const toggleDropdown = (menu) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null); // Close it if already open
    } else {
      setActiveDropdown(menu); // Open the selected dropdown
    }
  };

  const handleToggle = () => {
    setIsToggled(!isToggled); // Toggle the sidebar state
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
          {isHovered && (
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
              <i className="bx bx-menu" style={{ fontSize: "30px" }}></i>
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
              <div className="menu-title">{checkAndFetchTranslation("Home Page")}</div>
            </Link>
          </li>
          <Link to="/admin-panel">
            <li className="menu-label" style={{ padding: "0px" }}>
              {checkAndFetchTranslation("Admin Area")}
            </li>
          </Link>
          <li
            className={`menu-item ${
              isAccessible(["super-super-admin", "lower-super-admin", 
    "super-admin (white-label)", "lower-admin (white-label)"]) ? "" : "transparent-item"
            }`}
          >
            {isAccessible(["super-super-admin", "lower-super-admin", 
    "super-admin (white-label)", "lower-admin (white-label)"]) ? (
              <Link to="/pre-registration">
                <div className="parent-icon icon-color-2">
                  <i className="bx bx-envelope"></i>
                </div>
                <div className="menu-title">{checkAndFetchTranslation("Pre-registrations")}</div>
              </Link>
            ) : (
              <div className="locked-item">
                <div className="parent-icon icon-color-2">
                  <i className="bx bx-envelope"></i>
                </div>
                <div className="menu-title">{checkAndFetchTranslation("Pre-registrations")}</div>
                <i className="bx bx-lock lock-icon"></i>
              </div>
            )}
          </li>
          <li
            className={`menu-item ${
              isAccessible(["super-super-admin", "lower-super-admin", 
    "super-admin (white-label)", "lower-admin (white-label)"]) ? "" : "transparent-item"
            }`}
          >
            {isAccessible(["super-super-admin", "lower-super-admin", 
    "super-admin (white-label)", "lower-admin (white-label)"]) ? (
              <Link to="/user-management">
                <div className="parent-icon icon-color-3">
                  <i className="bx bx-conversation"></i>
                </div>
                <div className="menu-title">{checkAndFetchTranslation("User")}</div>
              </Link>
            ) : (
              <div className="locked-item">
                <div className="parent-icon icon-color-3">
                  <i className="bx bx-conversation"></i>
                </div>
                <div className="menu-title">{checkAndFetchTranslation("User")}</div>
                <i className="bx bx-lock lock-icon"></i>
              </div>
            )}
          </li>
          <li>
            <a href="chat-box.html">
              <div className="parent-icon icon-color-3">
                <i className="bx bx-conversation"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Live Chat")}</div>
            </a>
          </li>
          {/* Accounting Dropdown */}
          <li>
            <a
              className="has-arrow"
              href="#"
              onClick={() => toggleDropdown("accounting")}
            >
              <div className="parent-icon icon-color-10">
                <i className="bx bx-spa"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Accounting")}</div>
            </a>
            {activeDropdown === "accounting" && (
              <ul>
                <li>
                  <a href="/invoice">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Invoices")}
                  </a>
                </li>
                <li>
                  <a href="/component-bedges">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Offers")}
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Training Hall Dropdown */}
          <li>
            <a
              className="has-arrow"
              href="#"
              onClick={() => toggleDropdown("training-hall")}
            >
              <div className="parent-icon icon-color-10">
                <i className="bx bx-spa"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Training Hall")}</div>
            </a>
            {activeDropdown === "training-hall" && (
              <ul>
                <li>
                  <a href="/invoice">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Exercises")}
                  </a>
                </li>
                <li>
                  <a href="/component-bedges">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Training Plans")}
                  </a>
                </li>
                <li>
                  <a href="/invoice">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Upload & Analysis")}
                  </a>
                </li>
                <li>
                  <a href="/component-bedges">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Fitness Test")}
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Nutrition & Analysis Dropdown */}
          <li>
            <a
              className="has-arrow"
              href="#"
              onClick={() => toggleDropdown("nutrition-analysis")}
            >
              <div className="parent-icon icon-color-10">
                <i className="bx bx-spa"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Nutrition & Analysis")}</div>
            </a>
            {activeDropdown === "nutrition-analysis" && (
              <ul>
                <li>
                  <a href="/invoice">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Nutrition Plans")}
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Settings Dropdown */}
          <li>
            <a
              className="has-arrow"
              href="#"
              onClick={() => toggleDropdown("settings")}
            >
              <div className="parent-icon icon-color-10">
                <i className="bx bx-spa"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Settings")}</div>
            </a>
            {activeDropdown === "settings" && (
              <ul>
                <li>
                  <a href="/invoice">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Generally")}
                  </a>
                </li>
                <li>
                  <a href="/component-bedges">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Legal")}
                  </a>
                </li>
                <li>
                  <Link to="/welcome-page-management">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Welcome Page")}
                  </Link>
                </li>
                <li>
                  <Link to="/medals-award">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Awards / Badges")}
                  </Link>
                </li>
                <li>
                  <a href="/invoice">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Accounting")}
                  </a>
                </li>
                <li>
                  <a href="/pricing">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("eCommerce shop")}
                  </a>
                </li>
                <li>
                  <Link to="/mobility-add">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Mobility")}
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Kanban Board */}
          <li>
            <Link to="/kanban-board">
              <div className="parent-icon icon-color-5">
                <i className="bx bx-group"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Kanban Board")}</div>
            </Link>
          </li>

          {/* Todo List */}
          <li>
            <a href="/to-do">
              <div className="parent-icon icon-color-6">
                <i className="bx bx-task"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Todo List")}</div>
            </a>
          </li>

          {/* Cockpit Label */}
          <li className="menu-label">{checkAndFetchTranslation("Cockpit")}</li>

          {/* My Profile */}
          <li>
            <a href="/user-profile">
              <div className="parent-icon icon-color-4">
                <i className="bx bx-user-circle"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("My Profile")}</div>
            </a>
          </li>

          {/* Accounting */}
          <li>
            <a
              className="has-arrow"
              href="#"
              onClick={() => toggleDropdown("accounting")}
            >
              <div className="parent-icon icon-color-10">
                <i className="bx bx-spa"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Accounting")}</div>
            </a>
            {activeDropdown === "accounting" && (
              <ul>
                <li>
                  <a href="/invoice">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Invoices")}
                  </a>
                </li>
                <li>
                  <a href="/component-bedges">
                    <i className="bx bx-right-arrow-alt"></i>{checkAndFetchTranslation("Offers")}
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a href="#">
              <div className="parent-icon icon-color-11">
                <i className="bx bx-repeat"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("eCommerce Shop")}</div>
            </a>
          </li>

          {/* Live Chat */}
          <li>
            <a href="/chat-box">
              <div className="parent-icon icon-color-3">
                <i className="bx bx-conversation"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Live Chat")}</div>
            </a>
          </li>

          {/* Calendar */}
          <li>
            <a href="/fullcalendar">
              <div className="parent-icon icon-color-8">
                <i className="bx bx-calendar-check"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Calendar")}</div>
            </a>
          </li>

          {/* Diary */}
          <li>
            <a href="#">
              <div className="parent-icon icon-color-12">
                <i className="bx bx-donate-blood"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Diary")}</div>
            </a>
          </li>

          {/* Nutrition & Analysis Label */}
          <li className="menu-label">{checkAndFetchTranslation("Nutrition & Analysis")}</li>

          {/* Nutrition Tracking */}
          <li>
            <a href="#">
              <div className="parent-icon icon-color-1">
                <i className="bx bx-comment-edit"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Nutrition Tracking")}</div>
            </a>
          </li>

          {/* Measurements / Results */}
          <li>
            <a href="#">
              <div className="parent-icon icon-color-2">
                <i className="bx bx-grid-alt"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Measurements / Results")}</div>
            </a>
          </li>

          {/* Diary */}
          <li>
            <a href="#">
              <div className="parent-icon icon-color-12">
                <i className="bx bx-donate-blood"></i>
              </div>
              <div className="menu-title">{checkAndFetchTranslation("Diary")}</div>
            </a>
          </li>
        </ul>
        {/* End Navigation */}
      </div>
    </aside>
  );
};

export default Sidebar;
