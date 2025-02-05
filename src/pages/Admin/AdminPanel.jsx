import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation
import "./AdminPanel.css";
import Layout from "../../layout/Layout";

const AdminPanel = () => {
  // Dashboard Tiles with Links
  const tiles = [
    {
      icon: "bi-file-earmark-text",
      title: "Pre Registrations",
      description: "Manage user registrations for version 2.0.",
      link: "/pre-registration", // ✅ Add route path
    },
    {
      icon: "bi-people",
      title: "Users",
      description: "Manage users and assign roles.",
      link: "/users",
    },
    {
      icon: "bi-bar-chart",
      title: "Analysis",
      description: "View and analyze user data.",
      link: "/analysis",
    },
    {
      icon: "bi-cash-stack",
      title: "Accounting",
      description: "Manage memberships and invoices.",
      link: "/accounting",
    },
    {
      icon: "bi-gear",
      title: "(WhiteLabel) Settings",
      description: "Customize white-label instances.",
      link: "/settings",
    },
    {
      icon: "bi-file-earmark",
      title: "Plans",
      description: "Create and manage training plans.",
      link: "/plans",
    },
    {
      icon: "bi-kanban",
      title: "Kanban Board",
      description: "Plan and manage projects.",
      link: "/kanban-board",
    },
    {
      icon: "bi-cart",
      title: "E-Commerce",
      description: "Buy to get access.",
      link: "/ecommerce",
    },
  ];

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          {tiles.map((tile, index) => (
            <div key={index} className="col-md-4 mb-3">
              {/* ✅ Wrap card in Link to make it clickable */}
              <Link to={tile.link} className="card-tile text-decoration-none">
                <i className={`bi ${tile.icon}`}></i>
                <h5>{tile.title}</h5>
                <p>{tile.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
