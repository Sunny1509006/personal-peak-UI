import React, { useState, useEffect } from "react";
import Axios from "../../Axios/Axios";
import "./MobilityStretch.css"; // Include CSS styles as required
import MediaContent from "./MediaContent";
import ShowResults from "./ShowResults";
import ShowResult from "./ShowResults";

const MobilityStretch = () => {
  const [typedText, setTypedText] = useState("");
  const [typedIndex, setTypedIndex] = useState(0);
  const [theme, setTheme] = useState("blue");
  const [ratings, setRatings] = useState({});
  const [tempRatings, setTempRatings] = useState({});
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isWowModalOpen, setIsWowModalOpen] = useState(false);
const [submittedRating, setSubmittedRating] = useState(null);
const [submittedRatingTitle, setSubmittedRatingTitle] = useState("");






  // Fetch exercises from API using Axios
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await Axios.get("/content/items");
        const formattedData = response.data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.query,
          category: item.type, // You can adjust this field as needed
          icon: "fa-dumbbell", // Default icon or map based on item.type
          short_video_or_image: item.short_video_or_image,
          content_type: item.content_type,
        }));

        // Initialize tempRatings and ratings to 0 for all exercises
        const initialRatings = formattedData.reduce((acc, item) => {
          acc[item.id] = 0; // Default rating is 0
          return acc;
        }, {});

        setExercises(formattedData);
        setRatings(initialRatings);
        setTempRatings(initialRatings);
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
    return () => clearInterval(interval);1  
  }, [typedIndex]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    document.body.className = `theme-${e.target.value}`;
  };

  const handleTempRatingChange = (id, value) => {
    setTempRatings((prev) => ({ ...prev, [id]: parseInt(value, 10) || 0 }));
  };

  // const handleRatingSubmit = (id) => {
  //   setRatings((prev) => ({ ...prev, [id]: tempRatings[id] }));
  // };

  const handleRatingSubmit = (id, title) => {
    setRatings((prev) => ({
      ...prev,
      [id]: { rating: tempRatings[id], title },
    }));
    setSubmittedRating(tempRatings[id]); // Set the submitted rating
    setSubmittedRatingTitle(title); // Set the submitted title
    setIsWowModalOpen(true); // Open the modal
  };
  

  const closeWowModal = () => {
    setIsWowModalOpen(false);
    setSubmittedRating(null); // Reset the submitted rating
  };
  

  const calculateProgress = () => {
    const ratedExercises = Object.values(ratings).filter((rating) => rating > 0).length;
    return (ratedExercises / exercises.length) * 100;
  };

  const calculateScore = () => {
    const totalScore = Object.values(ratings).reduce((sum, score) => sum + score, 0);
    const maxScore = exercises.length * 10;
    return { totalScore, maxScore };
  };

  const getFeedbackMessage = (percentage) => {
    if (percentage < 30) {
      return "Alarmstufe Rot! Deine Werte zeigen erhebliche Defizite.";
    } else if (percentage < 60) {
      return "Leicht unterdurchschnittliche Werte. Arbeite an deinen Schwächen.";
    } else if (percentage < 80) {
      return "Gutes Resultat, aber noch Luft nach oben.";
    } else {
      return "Exzellentes Niveau! Achte weiterhin auf deine Balance.";
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="loading">Loading exercises...</div>;
  }

  const { totalScore, maxScore } = calculateScore();
  const percentage = (totalScore / maxScore) * 100;

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
      <div className="ribbon-badge">Übung {index + 1} / {exercises.length}</div>
      <div className="card-header-mobility">
        <div className="icon-circle">
          <i className={`fas ${exercise.icon}`}></i>
        </div>
        <h3>{exercise.title}</h3>
      </div>
      <MediaContent exercise={exercise} />
      <p>{exercise.description}</p>
      <span className="category-tag">{exercise.category}</span>
      
        {index === 7 || index === 8 ? (
          <p>Zeit (Sek.): {tempRatings[exercise.id]}</p>
        )
          :
          (
            <p>Bewertung: {tempRatings[exercise.id]}</p>
          )

        }
        
        
      <div className="rating-section">
        {index === 7 || index === 8 ? (
          <>
            <label className="rating-label">Deine Zeit (Sek.):</label>
            <input
              type="number"
              className="time-input"
              placeholder="z.B. 90"
              value={tempRatings[exercise.id]} // Temporary rating value
              onChange={(e) => handleTempRatingChange(exercise.id, e.target.value)}
            />
            <br />
          </>
        ) : (
          <>
            <label className="rating-label">Deine Bewertung (1–10):</label>
            <div className="slider-div">
              <input
                type="range"
                min="1"
                max="10"
                value={tempRatings[exercise.id]} // Temporary rating value
                onChange={(e) => handleTempRatingChange(exercise.id, e.target.value)}
              />
              <span className="slider-label-value">{tempRatings[exercise.id]}</span>
            </div>
          </>
        )}
        <button onClick={() => handleRatingSubmit(exercise.id, exercise.title)} className="submit-rating-btn">
          Speichern
        </button>
      </div>
    </div>
  ))}
</div>

{/* Wow Modal for Confirmation */}
{isWowModalOpen && (
  <div id="modalOverlay" className="modal-overlay">
    <div className="modal-box">
      <h4 id="modalTitle">Wow!</h4>
      <p id="modalMessage">Dein Wert: {submittedRating} für "{submittedRatingTitle}" gespeichert!</p>
      <button id="closeModalBtn" className="close-modal-btn" onClick={closeWowModal}>
        Okay
      </button>
    </div>
  </div>
)}


      {/* Show Results Button */}
      <button onClick={openModal} className="show-results-btn">
        <i className="fas fa-trophy"></i> Gesamtergebnis anzeigen
      </button>

      {/* Modal for Total Results */}
      {isModalOpen && (
        <ShowResult
          exercises={exercises}
          ratings={ratings}
          onClose={closeModal} // Pass the function to close the modal
        />
      )}
    </div>
  );
};

export default MobilityStretch;
