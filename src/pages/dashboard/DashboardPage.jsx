import React, { useEffect, useState } from "react";
import Axios from "../../Axios/Axios"; // Import Axios instance
import DashboardHomepage from "./DashboardHomepage";
import ThemeCustomizer from "./ThemeCustomizer";
import TermsPopup from "./TermsPopup";
import Layout from "../../layout/Layout";
import "./AdminSidebar.css";

const DashboardPage = () => {
  const [showTerms, setShowTerms] = useState(false); // Controls popup visibility
  const [userRankData, setUserRankData] = useState(null); // Stores API response data

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
        const userId = localStorage.getItem("user_id"); // Assuming user_id is stored in localhost
        if (!userId) {
          console.error("No user_id found in local storage");
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
                    ? `https://your-api-url/rewards/medal/${userRankData.medal_id}`
                    : "https://via.placeholder.com/50" // Placeholder image if no medal
                }
                alt="Medal"
                className="medal-icon"
              />
              {userRankData.text}
              <img
                src={
                  userRankData.medal_id
                    ? `https://your-api-url/rewards/medal/${userRankData.medal_id}`
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
        <DashboardHomepage />
      </div>

        {/* Theme Customizer */}
        <ThemeCustomizer />
      </Layout>
    </div>
  );
};

export default DashboardPage;
