import React, { useState, useEffect } from "react";
import "./MobilityStretch.css"; // Import stylesheets for CSS

const MobilityStretch = () => {
  const [theme, setTheme] = useState("blue");
  const [typedText, setTypedText] = useState("");
  const [progress, setProgress] = useState(0);
  const [ratings, setRatings] = useState({});

  const exercises = [
    {
      id: 1,
      title: "Waden-Spannungstest",
      description: "Ausfallschritt an der Wand, Ferse bleibt unten. Spüre das Ziehen in der Wade.",
      category: "Spannung",
      icon: "fa-shoe-prints",
      customLogic: false,
    },
    {
        id: 2,
        title: "Waden-Spannungstest",
        description: "Ausfallschritt an der Wand, Ferse bleibt unten. Spüre das Ziehen in der Wade.",
        category: "Spannung",
        icon: "fa-shoe-prints",
        customLogic: false,
      },
      {
        id: 3,
        title: "Waden-Spannungstest",
        description: "Ausfallschritt an der Wand, Ferse bleibt unten. Spüre das Ziehen in der Wade.",
        category: "Spannung",
        icon: "fa-shoe-prints",
        customLogic: false,
      },
      {
        id: 4,
        title: "Waden-Spannungstest",
        description: "Ausfallschritt an der Wand, Ferse bleibt unten. Spüre das Ziehen in der Wade.",
        category: "Spannung",
        icon: "fa-shoe-prints",
        customLogic: false,
      },
      {
        id: 5,
        title: "Waden-Spannungstest",
        description: "Ausfallschritt an der Wand, Ferse bleibt unten. Spüre das Ziehen in der Wade.",
        category: "Spannung",
        icon: "fa-shoe-prints",
        customLogic: false,
      },
    // Add the rest of the exercises here
  ];

  useEffect(() => {
    let typedIndex = 0;
    const typedInterval = setInterval(() => {
      if (typedIndex < typedTextContent.length) {
        setTypedText((prev) => prev + typedTextContent.charAt(typedIndex));
        typedIndex++;
      } else {
        clearInterval(typedInterval);
      }
    }, 45);

    return () => clearInterval(typedInterval);
  }, []);

  const typedTextContent =
    "Spannung, Mobilität & Kraft – teste dich jetzt in neuer Perfektion!";

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const calculatePlankRating = (sec) => {
    if (sec <= 20) return 1;
    if (sec <= 30) return 2;
    if (sec <= 40) return 3;
    if (sec <= 50) return 4;
    if (sec <= 60) return 5;
    if (sec <= 70) return 6;
    if (sec <= 90) return 7;
    if (sec <= 120) return 8;
    if (sec <= 150) return 9;
    return 10;
  };

  const updateProgress = () => {
    const ratedCount = Object.keys(ratings).length;
    const total = exercises.length;
    setProgress((ratedCount / total) * 100);
  };

  const handleRatingSubmit = (id, value, customLogic) => {
    let finalScore = 0;
    if (customLogic === "plank") {
      finalScore = calculatePlankRating(value);
    } else {
      finalScore = Math.min(value, 10);
    }
    setRatings((prev) => ({ ...prev, [id]: finalScore }));
    updateProgress();
  };

  return (
    <div className={`theme-${theme}`}>
      {/* Theme Switcher */}
      <div className="Theme-switcher-mobility">
        <select onChange={handleThemeChange} value={theme}>
          <option value="blue">Blau</option>
          <option value="lime">Grün/Lime</option>
          <option value="violet">Violett</option>
        </select>
      </div>

      {/* Header */}
      <header>
        <div className="logo-title">
          <i className="fas fa-dumbbell"></i> MobilityStretchPower
        </div>
        <div className="typed-text">{typedText}</div>
        <div className="progress-container">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </header>

      {/* Exercise Grid */}
      <div className="exercise-container">
        {exercises.map((ex, index) => (
          <div className="exercise-card" key={ex.id}>
            <div className="ribbon-badge">Übung {index + 1} / {exercises.length}</div>
            <div className="card-header-mobility">
              <div className="icon-circle">
                <i className={`fas ${ex.icon}`}></i>
              </div>
              <h3>{ex.title}</h3>
            </div>
            <div className="video-placeholder">
              VIDEO-PLATZHALTER: {ex.title}
            </div>
            <p>{ex.description}</p>
            <span className="category-tag">{ex.category}</span>
            <div className="rating-section">
              <label className="rating-label">
                {ex.customLogic === "plank" ? "Deine Zeit (Sek.):" : "Deine Bewertung (1–10):"}
              </label>
              {ex.customLogic ? (
                <input
                  type="number"
                  className="time-input"
                  placeholder="z.B. 90"
                  onBlur={(e) =>
                    handleRatingSubmit(ex.id, parseInt(e.target.value, 10), ex.customLogic)
                  }
                />
              ) : (
                <input
                  type="range"
                  min="1"
                  max="10"
                  defaultValue="5"
                  onChange={(e) =>
                    handleRatingSubmit(ex.id, parseInt(e.target.value, 10))
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobilityStretch;