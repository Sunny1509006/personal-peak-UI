import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import { useState, createContext, useContext } from "react";

// Create Context for Access Control
export const AccessContext = createContext();

function App() {
  const [hasAccess, setHasAccess] = useState(false); // State to manage access control

  return (
    <AccessContext.Provider value={{ hasAccess, setHasAccess }}>
      <>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/mobility-stretch-power"
              element={
                <PrivateRoute>
                  <MobilityStretch />
                </PrivateRoute>
              }
            />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route
              path="/pre-registration"
              element={
                <ProtectedRoute requiredRoles={["WLA", "SSA"]}>
                  <PreRegistration />
                </ProtectedRoute>
              }
            />
            <Route path="/kanban-board" element={<KanbanBoard />} />
            <Route path="/mobility-add" element={<MobilityAdd />} />
            <Route path="/mobility-add-new" element={<MobilityAddForm />} />
            {/* Unauthorized Route */}
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </BrowserRouter>
      </>
    </AccessContext.Provider>
  );
}

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const { hasAccess } = useContext(AccessContext); // Access the state from context
  return hasAccess ? children : <Navigate to="/" replace />;
};

export default App;
