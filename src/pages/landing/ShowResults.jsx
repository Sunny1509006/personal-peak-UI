import React from "react";
import "./MobilityStretch.css";
import { useNavigate } from "react-router-dom";

const ShowResult = ({ exercises, ratings, onClose }) => {

  const filteredRatings = Object.entries(ratings).filter(([id, value]) => {
    // Check if the value is an object with `rating` and `title`
    return typeof value === "object" && value?.rating !== undefined && value?.title !== undefined;
  });

  console.log("ratings" , ratings)

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

  const calculateSingleLegRating = (sec) => {
    if (sec <= 20) return 1;
    if (sec <= 25) return 2;
    if (sec <= 40) return 3;
    if (sec <= 45) return 4;
    if (sec <= 60) return 5;
    if (sec <= 80) return 6;
    if (sec <= 100) return 7;
    if (sec <= 120) return 8;
    if (sec <= 150) return 9;
    return 10;
  };
    const navigate = useNavigate();
    // console.log("exercose"/ exercises)
  // const calculateScore = () => {
  //   const totalScore = Object.values(ratings).reduce((sum, score) => sum + score, 0);
  //   const maxScore = exercises.length * 10;
  //   return { totalScore, maxScore };
  // };

  const calculateScore = () => {
    // Filter ratings to include only valid entries with `rating` and `title`
    const filteredRatings = Object.entries(ratings).filter(([id, value]) => {
      // Check if the value is an object with `rating` and `title`
      return typeof value === "object" && value?.rating !== undefined && value?.title !== undefined;
    });
  
    const totalScore = filteredRatings.reduce((sum, [id, value]) => {
      const { rating } = value; // Destructure the rating
      const exercise = exercises.find((ex) => ex.id === id); // Find the exercise
  
      if (exercise?.customLogic === "plank") {
        return sum + calculatePlankRating(rating); // Apply custom logic for plank
      }
      if (exercise?.customLogic === "singleLeg") {
        return sum + calculateSingleLegRating(rating); // Apply custom logic for single leg
      }
  
      // Default logic: add the rating, capped at 10
      return sum + Math.min(rating, 10);
    }, 0);
  
    // Maximum score is based on the number of valid ratings
    const maxScore = 90;
  
    return { totalScore, maxScore };
  };
  

  // const getFeedbackMessage = (percentage) => {
  //   if (percentage < 30) {
  //     return `
  //       <b>Alarmstufe Rot!</b><br>
  //       Deine Werte zeigen erhebliche Defizite. Handle sofort, um langfristige Schäden zu vermeiden.
  //       <ul>
  //         <li>Chronische Schmerzen</li>
  //         <li>Erhöhter Gelenkverschleiß</li>
  //         <li>Bewegungseinschränkungen im Alltag</li>
  //         <li>Höheres Sturz- und Verletzungsrisiko</li>
  //       </ul>
  //     `;
  //   } else if (percentage < 60) {
  //     return `
  //       <b>Leicht unterdurchschnittliche Werte.</b><br>
  //       Arbeite an deinen Schwächen, um Risiken zu minimieren.
  //       <ul>
  //         <li>Anhaltende Muskelverspannungen</li>
  //         <li>Nachlassende Mobilität und Kraft</li>
  //         <li>Verletzungsrisiko bei Belastungen</li>
  //       </ul>
  //     `;
  //   } else if (percentage < 80) {
  //     return `
  //       <b>Gutes Resultat, aber noch Luft nach oben.</b><br>
  //       Halte deine Balance zwischen Spannung, Kraft und Mobilität.
  //     `;
  //   } else {
  //     return `
  //       <b>Exzellentes Niveau!</b><br>
  //       Achte weiterhin auf ausgewogene Spannungs- und Kraftverhältnisse.
  //     `;
  //   }
  // };

  const getMotivationText = (score) => {
    if (score <= 3)
      return "Gelenke, Muskeln, Koordination – alles braucht Training! Lass dich nicht entmutigen!";
    if (score <= 6)
      return "Gute Basis, da geht noch mehr! Achte auf korrekte Spannungszustände.";
    if (score < 10)
      return "Stark! Versuche weiterhin, zu hohe Spannung/Schwächen zu vermeiden!";
    return "Perfekt – bleib wachsam, damit sich keine einseitigen Probleme einschleichen!";
  };

  const getFeedbackMessage = (percentage) => {
    if (percentage < 30) {
      return `
        <b>Alarmstufe Rot!</b><br>
          Deine Daten deuten auf erhebliche Probleme in Spannung, Kraft oder Koordination hin. 
          <br><br>
          <u>Folgen können sein:</u>
          <ul style="text-align:left;margin:0 auto 1rem;max-width:400px;">
            <li>Chronische Schmerzen (z.B. in Knien oder Rücken)</li>
            <li>Erhöhter Gelenkverschleiß (Arthrose-Risiko)</li>
            <li>Starke Bewegungs-Einschränkungen im Alltag</li>
            <li>Höheres Sturz- und Verletzungsrisiko</li>
          </ul>
          Bitte handle sofort – egal ob präventiv, akut oder rehabilitierend! 
          <br><br>
          <b>PersonalPeak 360</b> (Start: 15.03.2025) bietet dir 
          kostenfreie Expert:innen-Hilfe (Therapeut:innen, Ärzt:innen, Psycholog:innen, 
          Ernährungscoaches, etc.). 
          Sichere dir jetzt deine unverbindliche Voranmeldung, bevor es schlimmer wird!
      `;
    } else if (percentage < 60) {
      return `
        <b>Leicht unterdurchschnittliche Werte.</b><br>
          Hier und da sind Spannungszustände oder Koordinationsdefizite erkennbar. 
          <br><br>
          <u>Gefahr:</u> 
          <ul style="text-align:left;margin:0 auto 1rem;max-width:400px;">
            <li>Anhaltende Muskelverspannungen, die zu Gelenkschäden führen können</li>
            <li>Nachlassende Mobilität und Kraft im Alltag</li>
            <li>Schnelleres Ermüden oder Verletzungsrisiko bei Belastungen</li>
          </ul>
          Mit <b>PersonalPeak 360</b> (kostenfreie Probephase ab 15.03.2025) kannst du 
          frühzeitig gegensteuern.  
          Melde dich unverbindlich an und arbeite gemeinsam mit unseren Expert:innen 
          an deinen Baustellen!
      `;
    } else if (percentage < 80) {
      return `
        <b>Gutes Resultat, aber noch Luft nach oben.</b><br>
          Du hast eine solide Basis, trotzdem können erhöhte Spannung und 
          suboptimale Koordination immer wieder zu Schmerzen oder Verletzungen führen. 
          <br><br>
          <u>Denke an:</u>
          <ul style="text-align:left;margin:0 auto 1rem;max-width:400px;">
            <li>Regelmäßige Lockerung / Dehnung bei erhöhter Muskelspannung</li>
            <li>Kraftaufbau zur Stabilisierung deiner Gelenke</li>
            <li>Koordinationstraining, um Stürzen und Fehlbewegungen vorzubeugen</li>
          </ul>
          Mit <b>PersonalPeak 360</b> (ab 15.03.2025) bleibst du auf Kurs 
          oder kannst noch weiter aufbauen. Jetzt unverbindlich anmelden und 
          die kostenfreie Testphase nutzen!
      `;
    } else {
      return `
        <b>Exzellentes Niveau!</b><br>
          Trotzdem besteht selbst bei Top-Werten ein Risiko, dass versteckte 
          Schwächen (z.B. einseitige Kraft, mangelnde Dehnung) langfristig zu 
          Gelenkproblemen, Schmerzen oder Mobilitätseinbußen führen können. 
          <br><br>
          <u>Wichtig:</u>
          <ul style="text-align:left;margin:0 auto 1rem;max-width:400px;">
            <li>Kontrolliere regelmäßig deinen Spannungszustand und Kraftbalance</li>
            <li>Bleib bei Koordinationsübungen am Ball – Stürze verhindern!</li>
            <li>Achte auf Warnsignale deines Körpers</li>
          </ul>
          <b>PersonalPeak 360</b> (Start: 15.03.2025) ist auch für dich perfekt: 
          Erhalte ganzheitliche Betreuung von Profis –  
          melde dich unverbindlich an und bleib auf diesem Top-Level!
      `;
    }
  };

  const { totalScore, maxScore } = calculateScore();
  const percentage = (totalScore / maxScore) * 100;

  return (
    // <div className="modal-overlay" >
    //   <div className="modal-box">
    //     <h2>Dein Gesamtergebnis</h2>
    //     <p>Bewertete Übungen: {Object.keys(ratings).length} / {exercises.length}</p>
    //     <div className="gauge-container">
    //       <svg>
    //         <circle className="gauge-bg"></circle>
    //         <circle
    //           className="gauge-fg"
    //           style={{
    //             strokeDashoffset: `${314 - (percentage / 100) * 314}px`,
    //             strokeDasharray: "314px",
    //           }}
    //         ></circle>
    //       </svg>
    //       <div className="gauge-text">{Math.round(percentage)}%</div>
    //     </div>
    //     <div className="score-bar">
    //       <div
    //         className="score-fill"
    //         style={{ width: `${percentage}%` }}
    //       ></div>
    //     </div>
    //     <p>Gesamtpunktzahl: {totalScore} / {maxScore}</p>
    //     <div
    //       className="feedback-message"
    //       dangerouslySetInnerHTML={{ __html: getFeedbackMessage(percentage) }}
    //     ></div>
    //     <ul className="rating-list">
    //       {Object.entries(ratings).map(([id, score]) => {
    //         const exercise = exercises.find((ex) => ex.id === parseInt(id, 10));
    //         return (
    //           <li key={id}>
    //             <strong>{exercises.title}:</strong> {score} Punkt(e)  {getMotivationText(score)}
    //           </li>
    //         );
    //       })}
    //     </ul>
    //     <div style={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
    //     <button onClick={onClose} className="close-modal-btn">Schließen</button>
    //     <button
    //       onClick={() => {
    //         navigate("/register");
    //       }}
    //     //   className="register-button"
    //     style={{background: '#ffd700'}}
    //     >
    //       Jetzt registrieren
    //     </button>
    //     </div>
    //   </div>
    // </div>
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Dein Gesamtergebnis</h2>
        <p>
          Bewertete Übungen: {Object.keys(filteredRatings).length} / {exercises.length}
        </p>
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
        <p>Gesamt-Punktzahl: {totalScore} / {maxScore}</p>
       
        <ul className="rating-list">
  {Object.entries(ratings).map(([id, { rating, title }]) => {
    const exercise = exercises.find((ex) => ex.id === parseInt(id, 10));
    return (
      (title &&
      <li key={id}>
        <strong>{title || "Unbekannt"}:</strong> {rating} Punkt(e)
      </li>
    )
    );
  })}
</ul>

        <div
          className="feedback-message"
          dangerouslySetInnerHTML={{ __html: getFeedbackMessage(percentage) }}
        ></div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <button onClick={onClose} className="close-modal-btn">
            Schließen
          </button>
          <button
            onClick={() => {
              navigate("/register");
            }}
            style={{ background: "#ffd700" }}
          >
            Jetzt registrieren
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowResult;
