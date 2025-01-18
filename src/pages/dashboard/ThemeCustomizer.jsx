import React, { useState, useEffect } from "react";

const ThemeCustomizer = () => {
  const [theme, setTheme] = useState("lightmode");

  useEffect(() => {
    const rootElement = document.getElementById("root");

    if (theme === "darkmode") {
      // Set dark background if darkmode
      rootElement.style.backgroundColor = "black";
    } else {
      // Reset to default background if not darkmode
      rootElement.style.backgroundColor = "";
    }
  }, [theme]); // Run effect when theme changes

  const handleThemeChange = (event) => {
    setTheme(event.target.id);
    console.log(`Selected Theme: ${event.target.id}`);
    // You can add functionality to update the theme dynamically
  };

  return (
    <div className="switcher-body">
      {/* Theme Customizer Button */}
      <button
        className="btn btn-primary btn-switcher shadow-sm"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        <i className="bx bx-cog bx-spin"></i>
      </button>

      {/* Offcanvas Theme Customizer */}
      <div
        className="offcanvas offcanvas-end shadow border-start-0 p-2"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel"
          style={{
            color: theme === "darkmode" ? "#acafb3" : "black",
          }}>
            Theme Customizer
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body" style={{textAlign: "left"}}>
          <h6 className="mb-0" style={{
                color: theme === "darkmode" ? "#acafb3" : "black",
              }}>Theme Variation</h6>
          <hr />
          {/* Light Mode */}
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="themeOptions"
              id="lightmode"
              value="lightmode"
              checked={theme === "lightmode"}
              onChange={handleThemeChange}
            />
            <label className="form-check-label" htmlFor="lightmode"
            style={{
                color: theme === "darkmode" ? "#acafb3" : "black",
                
              }}>
              Light
            </label>
          </div>
          <hr />
          {/* Dark Mode */}
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="themeOptions"
              id="darkmode"
              value="darkmode"
              checked={theme === "darkmode"}
              onChange={handleThemeChange}
            />
            <label className="form-check-label" htmlFor="darkmode"
            style={{
                color: theme === "darkmode" ? "#acafb3" : "black",
              }}>
              Dark
            </label>
          </div>
          <hr />
          {/* Semi Dark */}
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="themeOptions"
              id="darksidebar"
              value="darksidebar"
              checked={theme === "darksidebar"}
              onChange={handleThemeChange}
            />
            <label className="form-check-label" htmlFor="darksidebar"
            style={{
                color: theme === "darkmode" ? "#acafb3" : "black",
              }}>
              Semi Dark
            </label>
          </div>
          <hr />
          {/* Color Less Icons */}
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="themeOptions"
              id="ColorLessIcons"
              value="ColorLessIcons"
              checked={theme === "ColorLessIcons"}
              onChange={handleThemeChange}
            />
            <label className="form-check-label" htmlFor="ColorLessIcons"
            style={{
                color: theme === "darkmode" ? "#acafb3" : "black",
              }}
              >
              Color Less Icons
            </label>
          </div>
        </div>
      </div>
    </div>
  );    
};

export default ThemeCustomizer;
