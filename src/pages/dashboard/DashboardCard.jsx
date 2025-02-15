import React, { useState, useEffect } from "react";
import { fetchTranslations, fetchTranslationIfMissing } from "../../utils/fetchTranslations";
import {
  Settings,
  Utensils,
  Dumbbell,
  ShoppingBag,
  Calendar,
  BookOpen,
} from "lucide-react";
import "./DashboardCard.css";

const DashboardCard = () => {
  const component_name = "dashboard";

  // Get language from localStorage OR default to "de"
  const [languageCode, setLanguageCode] = useState(() => {
    return localStorage.getItem("appLanguage") || "de";
  });

  const [translations, setTranslations] = useState({});
  const [textsToTranslate, setTextsToTranslate] = useState(new Set());
  const [isTranslationLoaded, setIsTranslationLoaded] = useState(false); // Track loading state

  // Fetch translations when languageCode changes
  useEffect(() => {
    const fetchComponentTranslations = async () => {
      setIsTranslationLoaded(false); // Start fetching translations
      const fetchedTranslations = await fetchTranslations(component_name, languageCode);
      setTranslations(fetchedTranslations);
      setIsTranslationLoaded(true); // Mark translations as loaded
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

  // Function to fetch translation immediately and update state
  const fetchAndUpdateTranslation = async (text) => {
    if (!translations[text]) {
      const translatedText = await fetchTranslationIfMissing(component_name, text);
      setTranslations((prev) => ({ ...prev, [text]: translatedText }));
    }
  };

  // Function to check if translation exists, if not, queue it for fetching
  const checkAndFetchTranslation = (text) => {
    if (!isTranslationLoaded) return "Loading..."; // Prevent fallback before fetching completes

    console.log("Current translations:", translations);
    console.log("Texts queued for translation:", textsToTranslate);

    if (!translations[text] && !textsToTranslate.has(text)) {
      setTextsToTranslate((prev) => new Set(prev).add(text)); // Add to Set to ensure uniqueness
      fetchAndUpdateTranslation(text); // Call translation API immediately
    }

    return translations[text] || text;
  };

  const cards = [
    {
      key: "Admin Panel",
      text: "Access to administrative functions",
      icon: <Settings size={30} color="#007bff" />,
    },
    {
      key: "Nutrition & Analysis",
      text: "Monitor your diet and progress",
      icon: <Utensils size={30} color="#007bff" />,
    },
    {
      key: "Training Hall",
      text: "Plan and track your workouts",
      icon: <Dumbbell size={30} color="#007bff" />,
    },
    {
      key: "eCommerce Shop",
      text: "Activate subscriptions and features",
      icon: <ShoppingBag size={30} color="#007bff" />,
    },
    {
      key: "Calendar",
      text: "Plan your activities and events",
      icon: <Calendar size={30} color="#007bff" />,
    },
    {
      key: "Wiki",
      text: "Find helpful articles and tips",
      icon: <BookOpen size={30} color="#007bff" />,
    },
  ];

  return (
    <div className="my-5">
      <div className="row g-4 justify-content-center">
        {cards.map((card, index) => (
          <div className="col-md-4 col-sm-4 col-8" key={index}>
            <div className="dashboard-card">
              <div className="card-icon-wrapper">{card.icon}</div>
              <h5 className="card-title">
                {checkAndFetchTranslation(card.key)}
              </h5>
              <p className="card-text">
                {checkAndFetchTranslation(card.text)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
