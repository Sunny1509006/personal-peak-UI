import { useState, useEffect, createContext, useContext } from "react";

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const userType = JSON.parse(localStorage.getItem("user_type"));

    if (token && id && userType) {
      return { id, token, userType };
    }
    return null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const userType = JSON.parse(localStorage.getItem("user_type"));

    if (token && id && userType) {
      setUser({ id, token, userType }); // ✅ Ensure state is restored
    }
    setLoading(false);
  }, []);

  // ✅ Login function (ensures data persists)
  const login = (id, token, userType) => {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("user_type", JSON.stringify(userType));

    setUser({ id, token, userType }); // ✅ Ensure state updates properly
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("hasAgreedToTerms");
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
