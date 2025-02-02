import { useEffect, useState } from "react";
import "./HealthCountdown.css"; // Assuming styles are placed in a separate CSS file
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import Ig1 from "../../assets/images/ig1.jpeg";
import Ig2 from "../../assets/images/ig2.jpeg";
import Ig3 from "../../assets/images/ig3.jpeg";
import Ig4 from "../../assets/images/ig4.jpeg";
import Ig5 from "../../assets/images/ig5.jpeg";
import Ig6 from "../../assets/images/ig6.jpeg";
import Ig7 from "../../assets/images/ig7.jpeg";
import Ig8 from "../../assets/images/ig8.jpeg";
import mobility from "../../assets/images/mobility.png";
import { Button } from "react-bootstrap";
import MobilityStretchPower from "./MobilityStretchPower";
import "./LandingPage.css"

const themes = [
  {
    theme: "Mobilität und Schmerzfreiheit",
    img: Ig7,
  },

  {
    theme: "Gewichtsverlust",
    img: Ig2,
  },
  {
    theme: "Muskelaufbau",
    img: Ig3,
  },
  {
    theme: "Bessere Schlafqualität",
    img: Ig6,
  },
  {
    theme: "Mehr Energie",
    img: Ig4,
  },
  {
    theme: "Stressbewältigung",
    img: Ig5,
  },
  {
    theme: "Gesundeit und Wohlbefinden",
    img: Ig1,
  },

  {
    theme: "Workshops",
    img: Ig8,
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = new Date("March 15, 2025 00:00:00").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      const totalTime =
        targetDate - new Date("December 26, 2024 00:00:00").getTime();
      const progressValue = ((totalTime - difference) / totalTime) * 100;
      setProgress(progressValue);
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const switchTheme = () => {
    if (theme === "dark") {
      document.documentElement.style.setProperty(
        "--bg-color-dark",
        "linear-gradient(to bottom, #1a237e, #512da8)"
      );
      document.documentElement.style.setProperty(
        "--primary-color-dark",
        "#FF7043"
      );
      setTheme("light");
    } else {
      document.documentElement.style.setProperty(
        "--bg-color-dark",
        "linear-gradient(135deg, #1c1c1c, #2e2e2e)"
      );
      document.documentElement.style.setProperty(
        "--primary-color-dark",
        "#FFD700"
      );
      setTheme("dark");
    }
  };

  return (
    <div className="container" data-theme={theme}>
      <img src={Logo} alt="Logo" className="logo" />
      <div className="login">
        <img
          src="https://img.icons8.com/ios-filled/50/FFD700/lock.png"
          alt="Lock"
        />
        <span onClick={() => navigate("/login")}>Anmelden</span>
      </div>

      <div>
        <h1>Pre-Launch Vorteile sichern!</h1>
        <p className="subheading">
          Klicke auf &quot;Jetzt registrieren&quot; und setze dich kostenfrei
          und unverbindlich auf die Warteliste!
          <br />
          Die Veröffentlichung erfolgt voraussichtlich am 15.03.2025 um 00:00
          Uhr.
        </p>
        <div className="countdown">
          <div>
            <span>{timeLeft.days}</span>
            <label>Days</label>
          </div>
          <div>
            <span>{timeLeft.hours}</span>
            <label>Hours</label>
          </div>
          <div>
            <span>{timeLeft.minutes}</span>
            <label>Minutes</label>
          </div>
          <div>
            <span>{timeLeft.seconds}</span>
            <label>Seconds</label>
          </div>
        </div>

        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="themes">
          {themes.map(({ theme, img }, index) => (
            <div className="theme" key={index}>
              <div className="image-wrapper">
                <img
                  src={img}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt={theme}
                />
              </div>
              <p style={{color: 'white'}}>{theme}</p>
            </div>
          ))}
  {/* <Link to="/mobility-stretch-power">
   <div className="theme">
      <div className="image-wrapper">
        <img
          src={mobility}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt={theme}
        />
      </div>
      <button style={{width: '100%', background: 'none'}}>Click Here</button>
    </div>
    </Link> */}
</div>

        <div className="founders">
          <p>
            <span className="highlight">Powered by Samuel Hufnagel</span> &
            Thomas Fischbach
          </p>
        </div>

        <button
          onClick={() => {
            navigate("/register");
          }}
          className="register-button"
        >
          Jetzt registrieren
        </button>
        <button className="theme-switcher" onClick={switchTheme}>
          Farbschema wechseln
        </button>

        
      </div>
      <MobilityStretchPower />
    </div>
  );
};

export default LandingPage;
