import { useState, useEffect, createContext, useContext } from "react";

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const userType = JSON.parse(localStorage.getItem("user_type")); // Get stored roles

    if (token && userType) {
      setUser({ id, token, userType }); // ✅ Store userType (roles)
    }
    setLoading(false);
  }, []);

  // Login Function (Saves token & roles)
  const login = (id, token, userType) => {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("user_type", JSON.stringify(userType)); // ✅ Save user roles
    setUser({ token, userType });
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for Authentication
export const useAuth = () => {
  return useContext(AuthContext);
};
