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
import { Link } from "react-router-dom";

const DashboardCard = () => {
  const component_name = "dashboard";

 // Get language from localStorage OR default to "de"
 const [languageCode, setLanguageCode] = useState(() => {
  return localStorage.getItem("appLanguage") || "de";
});

// Load translations from sessionStorage for this specific component
const [translations, setTranslations] = useState(() => {
  const savedTranslations = JSON.parse(sessionStorage.getItem(`translations_${component_name}_${languageCode}`));
  return savedTranslations || {};
});

const [textsToTranslate, setTextsToTranslate] = useState(new Set());
const [isTranslationLoaded, setIsTranslationLoaded] = useState(
  sessionStorage.getItem(`translations_${component_name}_${languageCode}`) !== null
);

useEffect(() => {
  const fetchComponentTranslations = async () => {
    if (!isTranslationLoaded) {
      setIsTranslationLoaded(false);
      const fetchedTranslations = await fetchTranslations(component_name, languageCode);
      setTranslations(fetchedTranslations);
      sessionStorage.setItem(`translations_${component_name}_${languageCode}`, JSON.stringify(fetchedTranslations));
      setIsTranslationLoaded(true);
    }
  };
  fetchComponentTranslations();
}, [languageCode]);

useEffect(() => {
  const handleStorageChange = () => {
    const storedLanguage = localStorage.getItem("appLanguage") || "de";
    if (storedLanguage !== languageCode) {
      setLanguageCode(storedLanguage);
      setTranslations({}); // Reset translations when language changes
      setIsTranslationLoaded(false);
    }
  };
  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, [languageCode]);

const checkAndFetchTranslation = (text) => {
  if (!isTranslationLoaded) return "Loading...";

  if (!translations[text] && !textsToTranslate.has(text)) {
    setTextsToTranslate((prev) => new Set(prev).add(text));
    fetchTranslationIfMissing(component_name, text).then((translatedText) => {
      setTranslations((prev) => {
        const updatedTranslations = { ...prev, [text]: translatedText };
        sessionStorage.setItem(`translations_${component_name}_${languageCode}`, JSON.stringify(updatedTranslations));
        return updatedTranslations;
      });
    });
  }
  return translations[text] || text;
};

  const cards = [
    {
      key: "Admin Panel",
      text: "Access to administrative functions",
      icon: <Settings size={30} color="#007bff" />,
      link: "/admin-panel",
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
            {card.link ? (
              <Link to={card.link} className="dashboard-card-link">
                <div className="dashboard-card">
                  <div className="card-icon-wrapper">{card.icon}</div>
                  <h5 className="card-title">{checkAndFetchTranslation(card.key)}</h5>
                  <p className="card-text">{checkAndFetchTranslation(card.text)}</p>
                </div>
              </Link>
            ) : (
              <div className="dashboard-card">
                <div className="card-icon-wrapper">{card.icon}</div>
                <h5 className="card-title">{checkAndFetchTranslation(card.key)}</h5>
                <p className="card-text">{checkAndFetchTranslation(card.text)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
