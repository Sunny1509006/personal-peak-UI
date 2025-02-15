import React, { useState, useEffect } from "react";
import "./DashboardHomepage.css"; // Make sure this file is correctly imported
import DashboardCard from "./DashboardCard";
import { BadgeCheck, Star } from "lucide-react";
import Axios from "../../Axios/Axios";
import { fetchTranslations, fetchTranslationIfMissing } from "../../utils/fetchTranslations";

const DashboardHomepage = ({ userRankData }) => {

  // Get language from localStorage OR default to "de"
    const [languageCode, setLanguageCode] = useState(() => {
      return localStorage.getItem("appLanguage") || "de";
    });

  console.log(userRankData);
  const component_name = "dashboard";
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [translations, setTranslations] = useState({});
  const [textsToTranslate, setTextsToTranslate] = useState(new Set());
  const [isTranslationLoaded, setIsTranslationLoaded] = useState(false);
  
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


  useEffect(() => {
    // Fetch YouTube videos from the API
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

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };

  const getVideoClass = (index) => {
    if (index === currentIndex) return "active";
    if (index === (currentIndex - 1 + videos.length) % videos.length)
      return "prev";
    if (index === (currentIndex + 1) % videos.length) return "next";
    return "hidden";
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

  const translatedRankingData = rankingData.map((user) => ({
    name: checkAndFetchTranslation(user.name),
    points: user.points,
    place: checkAndFetchTranslation(user.place),
    avatar: user.avatar,
  }));

  const translatedChallenges = challenges.map((challenge) => ({
    title: checkAndFetchTranslation(challenge.title),
    buttonText: checkAndFetchTranslation(challenge.buttonText),
    link: challenge.link,
  }));

  return (
    <div className="container1">
      {/* ✅ Ensure sections are inside a properly structured div */}
      <div>
        <div>
          <div className="dashboard-container">
            {/* Welcome Card */}
            <div className="welcome-card">
              <h1 className="title">
                {checkAndFetchTranslation("Welcome to 'Personal-Peak-360'")}
              </h1>
              <p className="subtitle">{checkAndFetchTranslation("PP360 Admin!")}</p>

              <span className="badge">
                <BadgeCheck size={16} />
                {checkAndFetchTranslation(
                  localStorage.getItem("user_type").replace(/"/g, "")
                )}
              </span>

              <img
                src={
                  userRankData?.medal_id
                    ? `https://personalpeak360.biddabuzz.com/api/v1/rewards/medal/${userRankData?.medal_id}`
                    : "https://via.placeholder.com/50" // Placeholder image if no medal
                }
                alt="Medal"
                className="medal"
              />

              <div className="points-container">
                <p className="points-text">
                  {checkAndFetchTranslation(
                    `You only need ${userRankData?.points_needed_for_next_rank} points to advance to level ${userRankData?.next_rank}.`
                  )}
                </p>
              </div>

              <p className="stay-tuned">{checkAndFetchTranslation("Stay tuned!")}</p>
            </div>
          </div>

          {/* ✅ Nutzer-Ranking */}
          <div className="section-dashboard ranking">
            <h2>{checkAndFetchTranslation("Nutzer-Ranking")}</h2>
            {translatedRankingData.map((user, index) => (
              <div className="ranking-item" key={index}>
                <img src={user.avatar} alt="Avatar" />
                <div className="details">
                  <strong>{user.name}</strong>
                  <br />
                  {checkAndFetchTranslation("Punkte:")}{" "}
                  <span className="points">{user.points}</span>
                </div>
                <span>{user.place}</span>
              </div>
            ))}
          </div>

          {/* ✅ Video Section */}
          {/* <div className="section-dashboard video">
          <h2>{t("Ihr persönliches Dashboard-Video", component_name)}</h2>
          <iframe
            src="https://www.youtube.com/embed/ScMzIvxBSi4"
            title="Dashboard Video"
            allowFullScreen
          ></iframe>
        </div> */}

          <div className="video-slider-container">
            <h2>{checkAndFetchTranslation("Ihr persönliches Dashboard-Video")}</h2>
            {videos.length > 0 ? (
              <div className="video-slider">
                {/* Left Arrow */}
                <button onClick={handlePrev} className="arrow left-arrow">
                  &#8592;
                </button>

                {/* Video Cards */}
                <div className="video-cards">
                  {videos.map((video, index) => (
                    <div
                      key={video.id}
                      className={`video-card ${getVideoClass(index)}`}
                    >
                      <iframe
                        // src={index === currentIndex ? video.youtube_url : ""}
                        src={video.youtube_url}
                        title={video.text}
                        allow={
                          index === currentIndex
                            ? "autoplay; encrypted-media"
                            : ""
                        }
                        allowFullScreen={index === currentIndex}
                        className="video-frame"
                        tabIndex={index === currentIndex ? "0" : "-1"}
                        style={{
                          pointerEvents:
                            index === currentIndex ? "auto" : "none", // Disable interaction for non-active videos
                        }}
                      ></iframe>
                    </div>
                  ))}
                </div>

                {/* Right Arrow */}
                <button onClick={handleNext} className="arrow right-arrow">
                  &#8594;
                </button>

                {/* Dots Navigation */}
                <div className="dots">
                  {videos.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${
                        index === currentIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    ></span>
                  ))}
                </div>
              </div>
            ) : (
              <p>Loading videos...</p>
            )}
          </div>

          {/* ✅ Challenges Section */}
          <div className="section-dashboard challenges">
            <h2>{checkAndFetchTranslation("Challenges")}</h2>
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
    </div>
  );
};

export default DashboardHomepage;
