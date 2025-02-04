import React from "react";
import "./DashboardHomepage.css"; // Make sure this file is correctly imported
import DashboardCard from "./DashboardCard";
import { useTranslation } from "../../context/LanguageContext";
import { BadgeCheck, Star } from "lucide-react";

const DashboardHomepage = () => {
  const { t } = useTranslation();
  const component_name = "dashboard";

  const rankingData = [
    {
      name: "PP360 Admin",
      points: 1051,
      place: "🏆 Platz 1",
      avatar: "/assets/images/avatars/01.png",
    },
    {
      name: "Lukas Wärner",
      points: 3,
      place: "🥈 Platz 2",
      avatar: "/assets/images/avatars/02.png",
    },
    {
      name: "PP360 Admin",
      points: 1051,
      place: "🏆 Platz 1",
      avatar: "/assets/images/avatars/01.png",
    },
  ];

  const challenges = [
    {
      title: "Testchallenge: Hanteln bestellen",
      link: "https://www.amazon.de",
      buttonText: "Jetzt starten",
    },
    {
      title: "Weekly Challenge: 5x Laufen",
      link: "#",
      buttonText: "Mehr erfahren",
    },
  ];

  const translatedRankingData = rankingData.map((user) => ({
    name: t(user.name, component_name),
    points: user.points,
    place: t(user.place, component_name),
    avatar: user.avatar,
  }));

  const translatedChallenges = challenges.map((challenge) => ({
    title: t(challenge.title, component_name),
    buttonText: t(challenge.buttonText, component_name),
    link: challenge.link,
  }));

  return (
    <div
      className="container"
      style={{ backgroundColor: "white", width: "100%" }}
    >
      {/* ✅ Ensure sections are inside a properly structured div */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          width: "100%",
        }}
      >
        <div className="dashboard-container">
          {/* Welcome Card */}
          <div className="welcome-card">
            <h1 className="title">{t("Welcome to 'Personal-Peak-360'", component_name)}</h1>
            <p className="subtitle">{t("PP360 Admin!", component_name)}</p>

            <span className="badge">
              <BadgeCheck size={16} />
              {t("Super-Admin", component_name)}
            </span>

            <img
              src="/assets/images/medel.jpg"
              alt="Medal"
              className="ms-auto me-auto"
            />

            <div className="points-container">
              <p className="points-text">
                {t("You only need -391 points to advance to level 3.", component_name)}
              </p>
            </div>

            <p className="stay-tuned">{t("Stay tuned!", component_name)}</p>
          </div>
        </div>

        {/* ✅ Nutzer-Ranking */}
        <div className="section-dashboard ranking">
          <h2>{t("Nutzer-Ranking", component_name)}</h2>
          {translatedRankingData.map((user, index) => (
            <div className="ranking-item" key={index}>
              <img src={user.avatar} alt="Avatar" />
              <div className="details">
                <strong>{user.name}</strong>
                <br />
                {t("Punkte:", component_name)}{" "}
                <span className="points">{user.points}</span>
              </div>
              <span>{user.place}</span>
            </div>
          ))}
        </div>

        {/* ✅ Video Section */}
        <div className="section-dashboard video">
          <h2>{t("Ihr persönliches Dashboard-Video", component_name)}</h2>
          <iframe
            src="https://www.youtube.com/embed/ScMzIvxBSi4"
            title="Dashboard Video"
            allowFullScreen
          ></iframe>
        </div>

        {/* ✅ Challenges Section */}
        <div className="section-dashboard challenges">
          <h2>{t("Challenges", component_name)}</h2>
          {translatedChallenges.map((challenge, index) => (
            <div className="challenge-item" key={index}>
              <span>{challenge.title}</span>
              <button onClick={() => window.open(challenge.link, "_blank")}>
                {challenge.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <DashboardCard />
      </div>
    </div>
  );
};

export default DashboardHomepage;
