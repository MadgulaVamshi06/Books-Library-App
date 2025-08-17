import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // icons

export default function Navbar() {
  const { user, logout } = useAuth();
  const loc = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (path) =>
    `block px-3 py-2 rounded-md text-base font-medium transition ${
      loc.pathname === path
        ? "text-yellow-300"
        : "text-white hover:text-yellow-200"
    }`;

  return (
    <header className="bg-blue-800 shadow sticky top-0 z-40">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          My Library
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={linkClass("/")}>Home</Link>

          {user && <Link to="/mybooks" className={linkClass("/mybooks")}>My Books</Link>}

          {!user && (
            <>
              <Link to="/login" className={linkClass("/login")}>Login</Link>
              <Link to="/register" className={linkClass("/register")}>Register</Link>
            </>
          )}

          {user && (
            <>
              <button
                onClick={logout}
                className="text-base font-medium px-4 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
              >
                Logout
              </button>
              <span
                className={`text-sm px-3 py-1 rounded-full font-semibold ${
                  user.email
                    ? "bg-yellow-300 text-blue-900"
                    : "bg-red-500 text-white"
                } select-none max-w-xs truncate`}
                title={user.email || "No email available"}
              >
                {user.email || "User"}
              </span>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4 space-y-2">
          <Link to="/" className={linkClass("/")} onClick={() => setMenuOpen(false)}>Home</Link>

          {user && (
            <Link to="/mybooks" className={linkClass("/mybooks")} onClick={() => setMenuOpen(false)}>My Books</Link>
          )}

          {!user && (
            <>
              <Link to="/login" className={linkClass("/login")} onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className={linkClass("/register")} onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}

          {user && (
            <>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="w-full text-left text-base font-medium px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
              >
                Logout
              </button>
              <span
                className="block text-sm px-3 py-1 rounded-md bg-yellow-300 text-blue-900 font-semibold truncate"
                title={user.email}
              >
                {user.email}
              </span>
            </>
          )}
        </div>
      )}
    </header>
  );
}
