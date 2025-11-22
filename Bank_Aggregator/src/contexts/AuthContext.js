import React, { createContext, useContext, useState, useEffect } from "react";
import { loginApi } from "../api/authApi";
import { jwtDecode } from "jwt-decode"; // named import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          token,
          id: decoded.sub,
          roles: decoded.role ? [decoded.role] : [], // ensure roles array
        });
      } catch (err) {
        console.error("Invalid token:", err);
        setUser(null);
      }
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    if (!data) return false;

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    const decoded = jwtDecode(data.accessToken);
    setUser({
      token: data.accessToken,
      id: decoded.sub,
      roles: decoded.role ? [decoded.role] : [],
    });

    return true;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
