import React from "react";

const Header = () => {
  return (
    <header className="top-header" id="Parent_Scroll_Div">
      <nav className="navbar navbar-expand-xl align-items-center gap-3 container px-4 px-lg-0">
        <div className="logo-header d-none d-xl-flex align-items-center gap-2">
          <div className="logo-icon">
            <img
              src="assets/images/logo-icon.png"
              className="logo-img"
              width="45"
              alt="Logo Icon"
            />
          </div>
          <div className="logo-name">
            <h5 className="mb-0">Maxton</h5>
          </div>
        </div>
        <div
          className="btn-toggle d-xl-none"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
        >
          <button type="button" className="btn">
            <i className="material-icons-outlined">menu</i>
          </button>
        </div>

        <div
          className="offcanvas offcanvas-start w-260"
          tabIndex="-1"
          id="offcanvasNavbar"
        >
          <div className="offcanvas-header border-bottom h-70">
            <div className="d-flex align-items-center gap-2">
              <div>
                <img
                  src="assets/images/logo-icon.png"
                  className="logo-icon"
                  width="45"
                  alt="Logo Icon"
                />
              </div>
              <div>
                <h4 className="logo-text">Maxton</h4>
              </div>
            </div>
            <button
              type="button"
              className="primaery-menu-close btn"
              data-bs-dismiss="offcanvas"
            >
              <i className="material-icons-outlined">close</i>
            </button>
          </div>
          <div className="offcanvas-body p-0 primary-menu">
            <ul className="navbar-nav align-items-center mx-auto gap-0 gap-xl-1">
              {[
                { href: "#home", icon: "home", title: "Home" },
                { href: "#About", icon: "info", title: "About" },
                { href: "#Services", icon: "work_outline", title: "Services" },
                {
                  href: "#Portfolio",
                  icon: "photo_camera",
                  title: "Portfolio",
                },
                { href: "#Team", icon: "people_alt", title: "Team" },
                { href: "#Pricing", icon: "euro", title: "Pricing" },
                { href: "#Contact", icon: "call", title: "Contact" },
              ].map((item, index) => (
                <li className="nav-item" key={index}>
                  <a className="nav-link" href={item.href}>
                    <div className="parent-icon">
                      <i className="material-icons-outlined">{item.icon}</i>
                    </div>
                    <div className="menu-title">{item.title}</div>
                  </a>
                </li>
              ))}

              <li className="nav-item dropdown d-none d-xxl-block">
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                  href="#!"
                  data-bs-toggle="dropdown"
                >
                  <div className="parent-icon">
                    <i className="material-icons-outlined">task</i>
                  </div>
                  <div className="menu-title">Pages</div>
                </a>
                <ul className="dropdown-menu">
                  {[
                    { icon: "email", title: "Email" },
                    { icon: "chat", title: "Chat Box" },
                    { icon: "folder", title: "File Manager" },
                    { icon: "task", title: "Todo" },
                    { icon: "description", title: "Invoice" },
                  ].map((item, index) => (
                    <li key={index}>
                      <a className="dropdown-item" href="#!">
                        <i className="material-icons-outlined">{item.icon}</i>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <button
            className="btn btn-grd btn-grd-primary raised d-flex align-items-center rounded-5 gap-2 px-4"
            type="button"
          >
            <i className="material-icons-outlined">account_circle</i>Login
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
