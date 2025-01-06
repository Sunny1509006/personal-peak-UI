import { useState } from "react";
import "./Login.css";

import Logo from "../../assets/logo.jpg";
import useLoginSubmit from "../../hooks/useLoginSubmit";

const Login = () => {
  const [theme, setTheme] = useState("dark");

  const {
    register,
    handleSubmit,
    clearErrors,
    errors,
    loading,
    onLoginSubmit,
  } = useLoginSubmit();

  const switchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const themeStyles = {
    "--bg-color-dark":
      theme === "dark"
        ? "linear-gradient(135deg, #1c1c1c, #2e2e2e)"
        : "linear-gradient(to bottom, #1a237e, #512da8)",
    "--primary-color-dark": theme === "dark" ? "#FFD700" : "#FF7043",
    "--button-color": theme === "dark" ? "#6C63FF" : "#FF7043",
  };

  return (
    <div className="login-page" style={themeStyles} data-theme={theme}>
      <div className="background-animation">
        <span
          style={{ top: "10%", left: "20%", width: "30px", height: "30px" }}
        ></span>
        <span
          style={{ top: "50%", left: "60%", width: "50px", height: "50px" }}
        ></span>
        <span
          style={{ top: "80%", left: "30%", width: "20px", height: "20px" }}
        ></span>
      </div>

      <form onSubmit={handleSubmit(onLoginSubmit)} className="login-container">
        <img
          src={Logo}
          style={{ width: "100px" }}
          alt="Personal Peak 360 Logo"
        />
        <h2>Willkommen bei Personal Peak 360</h2>
        <input
          id="username"
          {...register("username")}
          type="text"
          placeholder="Benutzername oder E-Mail"
          required
        />
        <input
          id="password"
          {...register("password")}
          type="password"
          placeholder="Passwort"
          required
        />
        <button>Login</button>
        <label>
          <input type="checkbox" /> Angemeldet bleiben
        </label>
        <p>
          <a href="#" style={{ color: "var(--primary-color-dark)" }}>
            Passwort vergessen?
          </a>
        </p>
      </form>

      <button className="theme-switcher" onClick={switchTheme}>
        Farbschema wechseln
      </button>
    </div>
  );
};

export default Login;
