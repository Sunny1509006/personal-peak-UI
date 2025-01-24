import React, { useState, useEffect } from "react";
import Axios from "../../Axios/Axios";
import "./MobilityStretch.css"; // Include CSS styles as required
import MediaContent from "./MediaContent";

const MobilityStretch = () => {
  const [typedText, setTypedText] = useState("");
  const [typedIndex, setTypedIndex] = useState(0);
  const [theme, setTheme] = useState("blue");
  const [ratings, setRatings] = useState({});
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch exercises from API using Axios
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await Axios.get("/content/items");
        const formattedData = response.data.map((item) => ({
          id: item.id,
          title: item.title,
          description:  item.query,
          category: item.type ,// You can adjust this field as needed
          icon: "fa-dumbbell", // Default icon or map based on item.type
          short_video_or_image: item.short_video_or_image,
          content_type: item.content_type,
        }));

        // Initialize ratings to 5 for all exercises
        const initialRatings = formattedData.reduce((acc, item) => {
          // acc[item.id] = 5; // Default rating
          return acc;
        }, {});

        setExercises(formattedData);
        setRatings(initialRatings);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  // Typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (typedIndex < "Spannung, Mobilität & Kraft – teste dich jetzt in neuer Perfektion!".length) {
        setTypedText((prev) => prev + "Spannung, Mobilität & Kraft – teste dich jetzt in neuer Perfektion!"[typedIndex]);
        setTypedIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [typedIndex]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    document.body.className = `theme-${e.target.value}`;
  };

  const handleRatingSubmit = (id, value) => {
    setRatings((prev) => ({ ...prev, [id]: parseInt(value, 10) || 0 }));
  };

  const calculateProgress = () => {
    return (Object.keys(ratings).length / exercises.length) * 100;
  };

  if (loading) {
    return <div className="loading">Loading exercises...</div>;
  }

  return (
    <div className={`theme-${theme}`}>
      {/* Header */}
      <header className="mobility-stretch-header">
        <div className="logo-title">
          <i className="fas fa-dumbbell"></i> MobilityStretchPower
        </div>
        <div className="typed-text">{typedText}</div>
        <div className="progress-container">
          <div className="progress-fill" style={{ width: `${calculateProgress()}%` }}></div>
        </div>
      </header>

      {/* Theme Switcher */}
      <div className="Theme-switcher-mobility">
        <select onChange={handleThemeChange} value={theme}>
          <option value="blue">Blau</option>
          <option value="lime">Grün/Lime</option>
          <option value="violet">Violett</option>
        </select>
      </div>

      {/* Exercise Grid */}
      <div className="exercise-container">
        {exercises.map((exercise, index) => (
          <div key={exercise.id} className="exercise-card">
            <div className="ribbon-badge">Übung {index}/9</div>
            <div className="card-header-mobility">
              <div className="icon-circle">
                <i className={`fas ${exercise.icon}`}></i>
              </div>
              <h3>{exercise.title}</h3>
            </div>
            <MediaContent exercise={exercise} />

              
            
            <p>{exercise.description}</p>
            <span className="category-tag">{exercise.category}</span>
            <p>{ratings[exercise.id]}</p>
            <div className="rating-section">
              <label className="rating-label">Deine Bewertung (1–10):</label>
              <input
                type="range"
                min="1"
                max="10"
                value={ratings[exercise.id]} // Use the initial rating or updated value
                onChange={(e) => handleRatingSubmit(exercise.id, e.target.value)}
              />
              <button 
              onClick={() => alert(`Rating saved for ${exercise.title}`)}
              >Speichern</button>
            </div>
          </div>
        ))}
      </div>

      {/* Show Results Button */}
      <button className="show-results-btn">
        <i className="fas fa-trophy"></i> Gesamtergebnis anzeigen
      </button>
    </div>
  );
};

export default MobilityStretch;
