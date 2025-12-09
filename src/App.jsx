import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom"; // No BrowserRouter here
import Navbar from "./components/NavBar";
import Sidebar from "./components/SideBar";

// Import all pages
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Contracts from "./pages/Contracts";
import Transactions from "./pages/Transactions";
// import Feedback from "./pages/Feedback";
// import SubmitReport from "./pages/SubmitReport";
import VerifyBlockchain from "./pages/VerifyBlockchain";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import FeedbackForm from "./components/FeedbackForm";
import Report from "./pages/Report";
// import ViewProject from "./components/ViewProject";

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-4 flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/feedback" element={<FeedbackForm/>} />
            <Route path="/report" element={<Report />} />
            <Route path="/verify" element={<VerifyBlockchain />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            {/* <Route path="/login" element={<AdminPanel />} /> */}

            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
