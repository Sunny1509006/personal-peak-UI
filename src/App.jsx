import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import { AuthProvider, useAuth } from "./hooks/useAuth"; // ✅ Import AuthProvider
import RegistrationPage from "./pages/registration/RegistrationPage";
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LandingPage from "./pages/landing/LandingPage";
import { ToastContainer } from "react-toastify";
import PreRegistration from "./pages/Admin/PreRegistration";
import ProtectedRoute from "./hooks/ProtectedRoutes";
import Unauthorized from "./hooks/Unauthorized";
import KanbanBoard from "./pages/KanbanBoard/KanbanBoard";
import MobilityStretch from "./pages/landing/MobilityStretch";
import MobilityAdd from "./pages/Settings/MobilityAdd";
import MobilityAddForm from "./pages/Settings/MobilityAddForm";
import { TranslationProvider } from "./context/LanguageContext";
import AdminPanel from "./pages/Admin/AdminPanel";

// Create Access Context
export const AccessContext = createContext();

function App() {
  const [hasAccess, setHasAccess] = useState(false);

  return (
    <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
      <AccessContext.Provider value={{ hasAccess, setHasAccess }}>
        <TranslationProvider>
          <ToastContainer position="top-center" autoClose={3000} />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/mobility-stretch-power" element={<MobilityStretch />} />

              {/* Protected Routes (Require Authentication) */}
              <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/pre-registration" element={<ProtectedRoute requiredRoles={["WLA", "SSA"]}><PreRegistration /></ProtectedRoute>} />
              <Route path="/admin-panel" element={
                <ProtectedRoute requiredRoles={["WLA", "SSA"]}>
                <AdminPanel />
              </ProtectedRoute>
              } 
              />
              <Route path="/kanban-board" element={<PrivateRoute><KanbanBoard /></PrivateRoute>} />
              <Route path="/mobility-add" element={<PrivateRoute><MobilityAdd /></PrivateRoute>} />
              <Route path="/mobility-add-new" element={<PrivateRoute><MobilityAddForm /></PrivateRoute>} />

              {/* Unauthorized Page */}
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
          </BrowserRouter>
        </TranslationProvider>
      </AccessContext.Provider>
    </AuthProvider>
  );
}

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // ✅ Get loading state

  if (loading) {
    return <div>Loading...</div>; // ✅ Prevent redirect while checking auth
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default App;
