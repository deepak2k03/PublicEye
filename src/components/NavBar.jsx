import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/faviconImage.png"; // adjust path to your src folder

<img
  src={Logo}
  alt="Logo"
  className="ml-2 h-6 w-6 object-contain"
/>

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
    { name: "Verify", path: "/verify" },
    { name: "Admin", path: "/adminlogin" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo + Site Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold text-gray-800">
              PublicEye
              <img
                src={Logo}      // Place your logo in the public folder
                alt="Logo"
                className="ml-2 h-10 w-10 mt-1 object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links */}
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* You can add a mobile menu toggle here later */}
            <span className="text-gray-600">Menu</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
