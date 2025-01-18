import React from "react";

const DashboardCard = () => {
  const cards = [
    { title: "Admin Panel", text: "Access to administrative functions" },
    { title: "Nutrition & Analysis", text: "Monitor your diet and progress" },
    { title: "Training Hall", text: "Plan and track your workouts" },
    { title: "eCommerce Shop", text: "Unlock subscriptions and features" },
    { title: "Calendar", text: "Plan your activities and events" },
    { title: "Wiki", text: "Find helpful articles and tips" },
  ];

  return (
    <div className="container my-5" style={{backgroundColor: "transparent"}}>
      <div className="row g-4">
        {cards.map((card, index) => (
          <div className="col-md-4" key={index}>
            <div className="card p-3">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
