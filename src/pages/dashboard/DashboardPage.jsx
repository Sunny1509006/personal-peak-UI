import React, { useEffect, useState } from "react";
import DashboardHomepage from "./DashboardHomepage";
import ThemeCustomizer from "./ThemeCustomizer";
import TermsPopup from "./TermsPopup";
import Layout from "../../layout/Layout";
import "./AdminSidebar.css"

const DashboardPage = () => {
  const [showTerms, setShowTerms] = useState(false); // Controls popup visibility

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

  return (
    <Layout>
      {/* Show TermsPopup if not agreed */}
      {showTerms && <TermsPopup onAgree={handleAgree} />}

      {/* Dashboard Homepage */}
      <DashboardHomepage />

      {/* Theme Customizer */}
      <ThemeCustomizer />
    </Layout>
  );
};

export default DashboardPage;
