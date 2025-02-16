import React, { useEffect, useState } from "react";
import Axios from "../../Axios/Axios"; // Import Axios instance
import DashboardHomepage from "./DashboardHomepage";
import ThemeCustomizer from "./ThemeCustomizer";
import TermsPopup from "./TermsPopup";
import Layout from "../../layout/Layout";
import "./AdminSidebar.css";
import { fetchTranslations, fetchTranslationIfMissing } from "../../utils/fetchTranslations";

const DashboardPage = () => {
  const [showTerms, setShowTerms] = useState(false); // Controls popup visibility
  const [userRankData, setUserRankData] = useState(null); // Stores API response data
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


  useEffect(() => {
    // Check local storage for agreement status
    const hasAgreed = localStorage.getItem("hasAgreedToTerms");

    if (!hasAgreed) {
      // Show popup if the user hasn't agreed before
      setShowTerms(true);
    }
  }, []);

  const handleAgree = () => {
    // Set agreement status in local storage
    localStorage.setItem("hasAgreedToTerms", "true");
    setShowTerms(false); // Hide the popup
  };

  useEffect(() => {
    // Get the root element
    const rootElement = document.getElementById("root");

    // Add the "dashboard" class
    rootElement.classList.add("dashboard");

    // Cleanup function to remove the "dashboard" class when the component unmounts
    return () => {
      rootElement.classList.remove("dashboard");
    };
  }, []);

  useEffect(() => {
    // Fetch user_id from localhost and rank data from the API
    const fetchRankData = async () => {
      try {
        const userId = localStorage.getItem("id"); // Assuming user_id is stored in localhost
        if (!userId) {
          console.error("No id found in local storage");
          return;
        }
        const response = await Axios.get(`/rewards/users/${userId}/rank`);
        setUserRankData(response.data);
      } catch (error) {
        console.error("Error fetching rank data:", error);
      }
    };

    fetchRankData();
  }, []);

  return (
    <div>
      {showTerms && <TermsPopup onAgree={handleAgree} />}
      <Layout>
        {/* Show TermsPopup if not agreed */}

      {/* Sliding Text */}
      <div className="sliding-text-container">
        <div className="sliding-text">
          {userRankData ? (
            <>
              <img
                src={
                  userRankData.medal_id
                    ? `https://personalpeak360.biddabuzz.com/api/v1/rewards/medal/${userRankData.medal_id}`
                    : "https://via.placeholder.com/50" // Placeholder image if no medal
                }
                alt="Medal"
                className="medal-icon"
              />
              {checkAndFetchTranslation(userRankData.text)}
              <img
                src={
                  userRankData.medal_id
                    ? `https://personalpeak360.biddabuzz.com/api/v1/rewards/medal/${userRankData.medal_id}`
                    : "https://via.placeholder.com/50"
                }
                alt="Medal"
                className="medal-icon"
              />
            </>
          ) : (
            "Loading user rank data..."
          )}
        </div>
      </div>

      {/* Centered Dashboard Homepage */}
      <div className="dashboard-content">
        <DashboardHomepage userRankData={userRankData} />
      </div>

        {/* Theme Customizer */}
        <ThemeCustomizer />
      </Layout>
    </div>
  );
};

export default DashboardPage;
