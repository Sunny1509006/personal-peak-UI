import React from "react";
import "./DashboardHomepage.css"; // Create a CSS file to include the styles
import DashboardCard from "./DashboardCard";

const DashboardHomepage = () => {
  const rankingData = [
    { name: "PP360 Admin", points: 1051, place: "🏆 Platz 1", avatar: "/assets/images/avatars/01.png" },
    { name: "Lukas Wärner", points: 3, place: "🥈 Platz 2", avatar: "/assets/images/avatars/02.png" },
  ];

  const challenges = [
    { title: "Testchallenge: Hanteln bestellen", link: "https://www.amazon.de", buttonText: "Jetzt starten" },
    { title: "Weekly Challenge: 5x Laufen", link: "#", buttonText: "Mehr erfahren" },
  ];

  return (
    <div className="container-dashboard">
      {/* Nutzer-Ranking */}
      <div className="card ms-auto me-auto">
            <h1>Welcome to 'Personal-Peak-360'</h1>
            <p className="role">PP360 Admin!</p>
            <span className="badge">Super-Admin</span>
            <img
              src="/assets/images/medel.jpg"
              alt="Medal"
              className="ms-auto me-auto"
            />
            <p className="points">You only need -391 points to advance to level 3.</p>
            <p className="stay-tuned">Stay tuned!</p>
          </div>
      <div className="section-dashboard ranking">
        <h2>Nutzer-Ranking</h2>
        {rankingData.map((user, index) => (
          <div className="ranking-item" key={index}>
            <img src={user.avatar} alt="Avatar" />
            <div className="details">
              <strong>{user.name}</strong>
              <br />
              Punkte: <span className="points">{user.points}</span>
            </div>
            <span>{user.place}</span>
          </div>
        ))}
      </div>

      {/* Video */}
      <div className="section-dashboard video">
        <h2>Ihr persönliches Dashboard-Video</h2>
        <iframe
          src="https://www.youtube.com/embed/ScMzIvxBSi4"
          title="Dashboard Video"
          allowFullScreen
        ></iframe>
      </div>

      {/* Challenges */}
      <div className="section-dashboard challenges">
        <h2>Challenges</h2>
        {challenges.map((challenge, index) => (
          <div className="challenge-item" key={index}>
            <span>{challenge.title}</span>
            <button onClick={() => window.open(challenge.link, "_blank")}>
              {challenge.buttonText}
            </button>
          </div>
        ))}
      </div>
      <DashboardCard />
    </div>
  );
};

export default DashboardHomepage;
