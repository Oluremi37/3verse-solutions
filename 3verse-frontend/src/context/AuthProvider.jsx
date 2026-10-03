import { useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  const login = (tokenData, adminData) => {
    localStorage.setItem("token", tokenData);
    localStorage.setItem("admin", JSON.stringify(adminData));

    setToken(tokenData);
    setAdmin(adminData);
  };

  const updateAdmin = (adminData) => {
    localStorage.setItem("admin", JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    setToken(null);
    setAdmin(null);
  };

  const value = {
    token,
    admin,
    login,
    updateAdmin,
    logout,
    isAuthenticated: Boolean(token),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
