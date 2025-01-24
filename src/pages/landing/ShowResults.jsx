import React from "react";
import "./MobilityStretch.css";
import { useNavigate } from "react-router-dom";

const ShowResult = ({ exercises, ratings, onClose }) => {
    const navigate = useNavigate();
    // console.log("exercose"/ exercises)
  const calculateScore = () => {
    const totalScore = Object.values(ratings).reduce((sum, score) => sum + score, 0);
    const maxScore = exercises.length * 10;
    return { totalScore, maxScore };
  };

  const getFeedbackMessage = (percentage) => {
    if (percentage < 30) {
      return `
        <b>Alarmstufe Rot!</b><br>
        Deine Werte zeigen erhebliche Defizite. Handle sofort, um langfristige Schäden zu vermeiden.
        <ul>
          <li>Chronische Schmerzen</li>
          <li>Erhöhter Gelenkverschleiß</li>
          <li>Bewegungseinschränkungen im Alltag</li>
          <li>Höheres Sturz- und Verletzungsrisiko</li>
        </ul>
      `;
    } else if (percentage < 60) {
      return `
        <b>Leicht unterdurchschnittliche Werte.</b><br>
        Arbeite an deinen Schwächen, um Risiken zu minimieren.
        <ul>
          <li>Anhaltende Muskelverspannungen</li>
          <li>Nachlassende Mobilität und Kraft</li>
          <li>Verletzungsrisiko bei Belastungen</li>
        </ul>
      `;
    } else if (percentage < 80) {
      return `
        <b>Gutes Resultat, aber noch Luft nach oben.</b><br>
        Halte deine Balance zwischen Spannung, Kraft und Mobilität.
      `;
    } else {
      return `
        <b>Exzellentes Niveau!</b><br>
        Achte weiterhin auf ausgewogene Spannungs- und Kraftverhältnisse.
      `;
    }
  };

  const getMotivationText = (score) => {
    if (score <= 3)
      return "Gelenke, Muskeln, Koordination – alles braucht Training! Lass dich nicht entmutigen!";
    if (score <= 6)
      return "Gute Basis, da geht noch mehr! Achte auf korrekte Spannungszustände.";
    if (score < 10)
      return "Stark! Versuche weiterhin, zu hohe Spannung/Schwächen zu vermeiden!";
    return "Perfekt – bleib wachsam, damit sich keine einseitigen Probleme einschleichen!";
  };

  const { totalScore, maxScore } = calculateScore();
  const percentage = (totalScore / maxScore) * 100;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Dein Gesamtergebnis</h2>
        <p>Bewertete Übungen: {Object.keys(ratings).length} / {exercises.length}</p>
        <div className="gauge-container">
          <svg>
            <circle className="gauge-bg"></circle>
            <circle
              className="gauge-fg"
              style={{
                strokeDashoffset: `${314 - (percentage / 100) * 314}px`,
                strokeDasharray: "314px",
              }}
            ></circle>
          </svg>
          <div className="gauge-text">{Math.round(percentage)}%</div>
        </div>
        <div className="score-bar">
          <div
            className="score-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p>Gesamtpunktzahl: {totalScore} / {maxScore}</p>
        <div
          className="feedback-message"
          dangerouslySetInnerHTML={{ __html: getFeedbackMessage(percentage) }}
        ></div>
        <ul className="rating-list">
          {Object.entries(ratings).map(([id, score]) => {
            const exercise = exercises.find((ex) => ex.id === parseInt(id, 10));
            return (
              <li key={id}>
                <strong>{exercises.title}:</strong> {score} Punkt(e) - {getMotivationText(score)}
              </li>
            );
          })}
        </ul>
        <div style={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
        <button onClick={onClose} className="close-modal-btn">Schließen</button>
        <button
          onClick={() => {
            navigate("/register");
          }}
        //   className="register-button"
        style={{background: '#ffd700'}}
        >
          Jetzt registrieren
        </button>
        </div>
      </div>
    </div>
  );
};

export default ShowResult;
