import React, { useState, useEffect } from "react";
import "./../pages/dashboard/AdminSidebar.css"
import { useTranslation } from "../context/LanguageContext";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Axios from "../Axios/Axios";

const Header = () => {
  const userId = localStorage.getItem("id");
  const [userLanguages, setUserLanguages] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const { language } = useTranslation();
  const { logout } = useAuth(); // ✅ Get logout function from auth hook
  const navigate = useNavigate();

  // const changeLanguage = (langCode) => {
  //   localStorage.setItem("appLanguage", langCode);
  //   window.dispatchEvent(new Event("storage")); // Trigger update for all components
  // };

  // Language options
  const allLanguages = [
    { code: "de", name: "German", flag: "de" },
    { code: "en", name: "English", flag: "us" },
    { code: "es", name: "Spanish", flag: "es" },
    { code: "ar", name: "Arabic", flag: "sa" },
    { code: "el", name: "Greek", flag: "gr" },
    { code: "ru", name: "Russian", flag: "ru" },
  ];

  useEffect(() => {
    // Fetch user languages on component mount
    Axios
      .get(`/translations/get_language/${userId}`)
      .then((response) => {
        let userLangs = response.data.lang || [];

        // setUserLanguages(userLangs);

        if (userLangs.length === 0) {
          // If no language, show all and post "de" by default
          setAvailableLanguages(allLanguages);
          postLanguage("de"); // Auto-post "de"
          userLangs = ["de"]; // Set it manually in state logic
        } else if (userLangs.length === 1) {
          // If one language, allow selection of any
          setAvailableLanguages(allLanguages);
          postLanguage(currentLang);
        } else {
          // If two or more, limit selection to existing ones
          setAvailableLanguages(allLanguages.filter(lang => userLangs.includes(lang.code)));
        }

        // Set default selected language
        // Set selected language in localStorage and app state
        // Always set German ("de") as the default language
        const currentLang = userLangs.includes("de") ? "de" : userLangs[0];
        changeLanguage(currentLang);
        // const currentLang = allLanguages.find(lang => userLangs.includes(lang.code)) || allLanguages[0];
        // setSelectedLanguage(currentLang);
      })
      .catch((error) => console.error("Error fetching languages:", error));
  }, [userId]);

  const postLanguage = (langCode) => {
    Axios
      .patch(`/translations/add_language/${userId}`, { lang: langCode })
      .then(() => {
        setUserLanguages((prev) => [...prev, langCode]); // Update user languages state
        // changeLanguage(langCode);
      })
      .catch((error) => console.error("Error adding language:", error));
  };

  const changeLanguage = (langCode, userLangs = userLanguages) => {
    if (userLangs.length === 1) {
      postLanguage(langCode); // Auto-post "de"
    }
    localStorage.setItem("appLanguage", langCode);
    window.dispatchEvent(new Event("storage")); // Trigger update for all components
    setSelectedLanguage(allLanguages.find(lang => lang.code === langCode) || allLanguages[0]);
  };

  // const selectedLanguage = languages.find((lang) => lang.code === language) || languages[0]; // Default to German


  return (
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
                <a
  className="dropdown-item"
  href="#"
  onClick={(e) => {
    e.preventDefault(); // Prevent default anchor behavior
    logout(); // Call logout function
    navigate("/login"); // Redirect user to login page
  }}
>
  <i className="bx bx-power-off"></i>
  <span>Logout</span>
</a>
              </div>
            </li>

            {/* Language Dropdown */}
            {/* <li className="nav-item dropdown dropdown-language">
              <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown">
                <div className="lang d-flex">
                  <div>
                    <i className={`flag-icon flag-icon-${selectedLanguage.flag}`}></i>
                  </div>
                  <div>
                    <span>{selectedLanguage.code.toUpperCase()}</span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="dropdown-item"
                    onClick={() => changeLanguage(lang.code)}
                  >
                    <i className={`flag-icon flag-icon-${lang.flag}`}></i> <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </li> */}
            <li className="nav-item dropdown dropdown-language">
      <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown">
        <div className="lang d-flex">
          <div>
            <i className={`flag-icon flag-icon-${selectedLanguage?.flag}`}></i>
          </div>
          <div>
            <span>{selectedLanguage?.code.toUpperCase()}</span>
          </div>
        </div>
      </a>
      <div className="dropdown-menu dropdown-menu-end">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            className="dropdown-item"
            onClick={() => changeLanguage(lang.code)}
            disabled={userLanguages.length >= 2 && !userLanguages.includes(lang.code)} // Disable if two languages exist and it's not in the list
          >
            <i className={`flag-icon flag-icon-${lang.flag}`}></i> <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </li>
          </ul>
        </div>
      </nav>
      </header>
  );
};

export default Header;
