// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import api from "../api/axios";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Check if user is logged in (cookie exists)
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await api.get("/api/auth/me"); // backend must support /me
        if (!ignore) setUser(res.data.user);
      } catch {
        // not logged in
      } finally {
        if (!ignore) setAuthLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  const register = async ({ email, password }) => {
    try {
      const res = await api.post("/api/auth/register", { email, password });
      return { success: true, message: res.data?.message || "Registered" };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Registration failed" };
    }
  };

  const login = async ({ email, password }) => {
  try {
    const res = await api.post("/api/auth/login", { email, password });
    setUser(res.data?.user || null); // ✅ directly set user from backend
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Invalid credentials",
    };
  }
};


  const logout = async () => {
    try {
      await api.get("/api/auth/logout");
    } catch {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
