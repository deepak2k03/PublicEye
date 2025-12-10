// src/components/NavBar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/faviconImage.png"; // adjust path if necessary

export default function NavBar() {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Projects", path: "/projects" },
    { name: "Contracts", path: "/contracts" },
    { name: "Transactions", path: "/transactions" },
    { name: "Feedback", path: "/feedback" },
    { name: "Report", path: "/report" },
    { name: "Verify", path: "/verify" }
    // { name: "Admin", path: "/adminlogin" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold text-gray-800">
              <img src={Logo} alt="Logo" className="h-8 w-8 mr-2 object-contain" />
              PublicEye
            </Link>
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.path
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <span className="text-gray-600">Menu</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
