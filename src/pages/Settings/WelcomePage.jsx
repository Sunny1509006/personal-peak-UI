import React from "react";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import "./WelcomePage.css"; // Add custom styles for the card

export const WelcomePage = () => {
  return (
    <Layout>
      <div className="welcome-page">
        <Link to="/yt-video-management" className="welcome-page-card-link">
          <div className="welcome-page-card">
            <h2>Youtube Video Management</h2>
            <p>Manage your YouTube videos effectively.</p>
          </div>
        </Link>
      </div>
    </Layout>
  );
};
