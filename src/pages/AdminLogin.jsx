import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Login data:", formData);
    // Add admin authentication API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 shadow-lg rounded-2xl w-full max-w-md p-8 text-white">
        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-300 text-center mt-4">
          Back to{" "}
          <Link to="/" className="text-yellow-400 font-semibold hover:underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
