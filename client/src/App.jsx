// src/App.jsx
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// 1. IMPORT AUTH CONTEXT & GUARD
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import AppLayout from "./layouts/AppLayout";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";

// Lazy imports
const Home = React.lazy(() => import("./pages/Home"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Projects = React.lazy(() => import("./pages/Projects"));
const ProjectDetails = React.lazy(() => import("./pages/ProjectDetails"));
const Contracts = React.lazy(() => import("./pages/Contracts"));
const Transactions = React.lazy(() => import("./pages/Transactions"));
const VerifyBlockchain = React.lazy(() => import("./pages/VerifyBlockchain"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const Report = React.lazy(() => import("./pages/Report"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    // 2. WRAP APPLICATION IN AUTH PROVIDER
    <AuthProvider>
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center bg-[#020617]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-sm text-cyan-500 font-mono">
                LOADING_SYSTEM...
              </div>
            </div>
          </div>
        }
      >
        <Routes>
          {/* ================= PUBLIC ROUTES (NO NAVBAR) ================= */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= APP ROUTES (PROTECTED + LAYOUT) ================= */}
          {/* 3. WRAP THE APP LAYOUT IN PROTECTED ROUTE */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/report" element={<Report />} />
            <Route path="/verify" element={<VerifyBlockchain />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feedback" element={<Feedback />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}