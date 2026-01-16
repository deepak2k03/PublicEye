// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    // Check if user is logged in (persist session)
    const storedUser = localStorage.getItem("publicEyeUser");
    const token = localStorage.getItem("publicEyeToken");
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // --- REAL LOGIN FUNCTION ---
  const login = async (email, password, role) => {
    setError(null);
    try {
      // 1. Send data to Backend
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }), 
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Login failed");
      }

      // 2. If successful, save token and user
      localStorage.setItem("publicEyeToken", data.token);
      localStorage.setItem("publicEyeUser", JSON.stringify(data.user));
      setUser(data.user);
      return true; // Success!

    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message);
      return false; // Failed
    }
  };

  // --- REAL REGISTER FUNCTION ---
  const register = async (userData) => {
    setError(null);
    try {
      // 1. Send data to Backend
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Registration failed");
      }

      // 2. If successful, save token and user (Auto-login)
      localStorage.setItem("publicEyeToken", data.token);
      localStorage.setItem("publicEyeUser", JSON.stringify(data.user));
      setUser(data.user);
      return true; // Success!

    } catch (err) {
      console.error("Register Error:", err.message);
      setError(err.message);
      return false; // Failed
    }
  };

  const logout = () => {
    localStorage.removeItem("publicEyeToken");
    localStorage.removeItem("publicEyeUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);