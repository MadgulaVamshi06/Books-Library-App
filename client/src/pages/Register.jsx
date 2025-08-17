import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");
    const res = await register({ email, password });
    if (res.success) {
      setOk(res.message || "Registered successfully!");
      setTimeout(() => navigate("/login"), 1000); // redirect to login
    } else {
      setErr(res.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <section className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
          Create your account
        </h1>

        {ok && (
          <p className="mb-4 text-green-600 bg-green-50 border border-green-200 rounded-md px-3 py-2 text-sm">
            {ok}
          </p>
        )}
        {err && (
          <p className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 text-sm">
            {err}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md px-3 py-2 font-medium transition"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </section>
    </div>
  );
}
