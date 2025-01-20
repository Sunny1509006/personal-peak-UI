import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ requiredRoles, children }) => {
  const userRoles = JSON.parse(localStorage.getItem("user_type")) || []; // Get user roles from localStorage

  // Check if the user has any of the required roles
  const hasAccess = requiredRoles.some((role) => userRoles.includes(role));

  return hasAccess ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
