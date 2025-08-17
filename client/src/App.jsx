import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyBooks from "./pages/MyBooks.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-full bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl p-4 sm:p-6">
        <Routes>
          {/* Always render Home on / regardless of user */}
          <Route path="/" element={<Home />} />

          {/* Protect mybooks route */}
          <Route
            path="/mybooks"
            element={
              <ProtectedRoute>
                <MyBooks />
              </ProtectedRoute>
            }
          />
          
          {/* Login and Register never redirect logged-in users here */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
