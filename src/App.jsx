import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/registration/RegistrationPage";
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LandingPage from "./pages/landing/LandingPage";
import { ToastContainer } from "react-toastify";
import PreRegistration from "./pages/Admin/PreRegistration";
import ProtectedRoute from "./hooks/ProtectedRoutes";
import Unauthorized from "./hooks/Unauthorized";

function App() {
  return (
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
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pre-registration" element={
            <ProtectedRoute requiredRoles={["WLA", "SSA"]}>
            <PreRegistration />
            </ProtectedRoute>
            } />
            {/* Unauthorized Route */}
      <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
