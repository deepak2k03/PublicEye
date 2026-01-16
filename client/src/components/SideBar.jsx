// src/components/SideBar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4">
        <h3 className="font-bold text-lg mb-4">PublicEye</h3>
        <nav className="flex flex-col space-y-2">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
          <Link to="/projects" className="text-gray-600 hover:text-gray-900">Projects</Link>
          <Link to="/contracts" className="text-gray-600 hover:text-gray-900">Contracts</Link>
          <Link to="/transactions" className="text-gray-600 hover:text-gray-900">Transactions</Link>
          <Link to="/feedback" className="text-gray-600 hover:text-gray-900">Feedback</Link>
        </nav>
      </div>
    </aside>
  );
}
