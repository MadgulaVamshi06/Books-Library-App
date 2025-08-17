import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    const res = await login({ email, password });
    if (res.success) {
      navigate("/", { replace: true }); 
    } else {
      setErr(res.message || "Login failed");
    }
  };

  return (
    <section className="mx-auto max-w-md bg-white rounded-lg shadow p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Login</h1>
      {err && <p className="mb-3 text-red-600">{err}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-md px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-md px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-2"
        >
          Sign in
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </section>
  );
}
