import React from "react";
import { useTranslation } from "../../context/LanguageContext";
import {
  Settings,
  Utensils,
  Dumbbell,
  ShoppingBag,
  Calendar,
  BookOpen,
} from "lucide-react"; // ✅ Import icons
import "./DashboardCard.css"; // ✅ Import CSS file

const DashboardCard = () => {
  const { t } = useTranslation();
  const component_name = "dashboard";

  // ✅ Define cards with Lucide icons
  const cards = [
    {
      title: "Admin Panel",
      text: "Access to administrative functions",
      icon: <Settings size={30} color="#007bff" />,
    },
    {
      title: "Nutrition & Analysis",
      text: "Monitor your diet and progress",
      icon: <Utensils size={30} color="#007bff" />,
    },
    {
      title: "Training Hall",
      text: "Plan and track your workouts",
      icon: <Dumbbell size={30} color="#007bff" />,
    },
    {
      title: "eCommerce Shop",
      text: "Activate subscriptions and features",
      icon: <ShoppingBag size={30} color="#007bff" />,
    },
    {
      title: "Calendar",
      text: "Plan your activities and events",
      icon: <Calendar size={30} color="#007bff" />,
    },
    {
      title: "Wiki",
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
              {/* ✅ Icon inside a circular background */}
              <div className="card-icon-wrapper">{card.icon}</div>
              <h5 className="card-title">{t(card.title, component_name)}</h5>
              <p className="card-text">{t(card.text, component_name)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
