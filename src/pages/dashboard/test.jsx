import React, { useState, useEffect } from "react";
import "./DashboardHomepage.css"; // Ensure this file is correctly imported
import DashboardCard from "./DashboardCard";
import { BadgeCheck } from "lucide-react";
import Axios from "../../Axios/Axios";
import { fetchTranslations, fetchTranslationIfMissing } from "../../utils/fetchTranslations";

const DashboardHomepage = ({ userRankData }) => {
  console.log(userRankData);
  const component_name = "dashboard";

  // Get language from localStorage OR default to "de"
  const [languageCode, setLanguageCode] = useState(() => {
    return localStorage.getItem("appLanguage") || "de";
  });

  const [translations, setTranslations] = useState({});
  const [textsToTranslate, setTextsToTranslate] = useState(new Set());
  const [isTranslationLoaded, setIsTranslationLoaded] = useState(false);
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch translations when languageCode changes
  useEffect(() => {
    const fetchComponentTranslations = async () => {
      setIsTranslationLoaded(false);
      const fetchedTranslations = await fetchTranslations(component_name, languageCode);
      setTranslations(fetchedTranslations);
      setIsTranslationLoaded(true);
    };

    fetchComponentTranslations();
  }, [languageCode]);

  // Listen to localStorage changes for language updates
  useEffect(() => {
    const handleStorageChange = () => {
      const storedLanguage = localStorage.getItem("appLanguage") || "de";
      if (storedLanguage !== languageCode) {
        setLanguageCode(storedLanguage);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [languageCode]);

  // Fetch YouTube videos from the API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await Axios.get("/content/yt-videos/");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Function to fetch missing translation immediately and update state
  const fetchAndUpdateTranslation = async (text) => {
    if (!translations[text]) {
      const translatedText = await fetchTranslationIfMissing(component_name, text);
      setTranslations((prev) => ({ ...prev, [text]: translatedText }));
    }
  };

  // Function to check if translation exists, if not, queue it for fetching
  const checkAndFetchTranslation = (text) => {
    if (!isTranslationLoaded) return "Loading...";

    if (!translations[text] && !textsToTranslate.has(text)) {
      setTextsToTranslate((prev) => new Set(prev).add(text));
      fetchAndUpdateTranslation(text);
    }

    return translations[text] || text;
  };

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

  return (
    <div className="container1">
      {/* ✅ Welcome Section */}
      <div className="dashboard-container">
        <div className="welcome-card">
          <h1 className="title">{checkAndFetchTranslation("Welcome to 'Personal-Peak-360'")}</h1>
          <p className="subtitle">{checkAndFetchTranslation("PP360 Admin!")}</p>

          <span className="badge">
            <BadgeCheck size={16} />
            {checkAndFetchTranslation(localStorage.getItem("user_type").replace(/"/g, ""))}
          </span>

          <img
            src={
              userRankData?.medal_id
                ? `https://personalpeak360.biddabuzz.com/api/v1/rewards/medal/${userRankData?.medal_id}`
                : "https://via.placeholder.com/50"
            }
            alt="Medal"
            className="medal"
          />

          <div className="points-container">
            <p className="points-text">
              {checkAndFetchTranslation(`You only need ${userRankData?.points_needed_for_next_rank} points to advance to level ${userRankData?.next_rank}.`)}
            </p>
          </div>

          <p className="stay-tuned">{checkAndFetchTranslation("Stay tuned!")}</p>
        </div>
      </div>

      {/* ✅ Ranking Section */}
      <div className="section-dashboard ranking">
        <h2>{checkAndFetchTranslation("Nutzer-Ranking")}</h2>
        {rankingData.map((user, index) => (
          <div className="ranking-item" key={index}>
            <img src={user.avatar} alt="Avatar" />
            <div className="details">
              <strong>{checkAndFetchTranslation(user.name)}</strong>
              <br />
              {checkAndFetchTranslation("Punkte:")} <span className="points">{user.points}</span>
            </div>
            <span>{checkAndFetchTranslation(user.place)}</span>
          </div>
        ))}
      </div>

      {/* ✅ Video Section */}
      <div className="video-slider-container">
        <h2>{checkAndFetchTranslation("Ihr persönliches Dashboard-Video")}</h2>
        {videos.length > 0 ? (
          <div className="video-slider">
            <button onClick={() => setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)} className="arrow left-arrow">
              &#8592;
            </button>

            <div className="video-cards">
              {videos.map((video, index) => (
                <div key={video.id} className={`video-card ${index === currentIndex ? "active" : ""}`}>
                  <iframe src={video.youtube_url} title={video.text} allowFullScreen className="video-frame"></iframe>
                </div>
              ))}
            </div>

            <button onClick={() => setCurrentIndex((prev) => (prev + 1) % videos.length)} className="arrow right-arrow">
              &#8594;
            </button>
          </div>
        ) : (
          <p>Loading videos...</p>
        )}
      </div>

      {/* ✅ Challenges Section */}
      <div className="section-dashboard challenges">
        <h2>{checkAndFetchTranslation("Challenges")}</h2>
        {challenges.map((challenge, index) => (
          <div className="challenge-item" key={index}>
            <span>{checkAndFetchTranslation(challenge.title)}</span>
            <button onClick={() => window.open(challenge.link, "_blank")}>{checkAndFetchTranslation(challenge.buttonText)}</button>
          </div>
        ))}
      </div>

      {/* ✅ Dashboard Cards */}
      <DashboardCard />
    </div>
  );
};

export default DashboardHomepage;
