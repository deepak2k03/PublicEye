// src/App.jsx
import React, { Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";   // must match filename exactly
import SideBar from "./components/SideBar";
import FeedbackForm from "./components/FeedbackForm";

const Home = React.lazy(() => import("./pages/Home"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Projects = React.lazy(() => import("./pages/Projects"));
const ProjectDetails = React.lazy(() => import("./pages/ProjectDetails"));
const Contracts = React.lazy(() => import("./pages/Contracts"));
const Transactions = React.lazy(() => import("./pages/Transactions"));
const VerifyBlockchain = React.lazy(() => import("./pages/VerifyBlockchain"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const AdminPanel = React.lazy(() => import("./pages/AdminPanel"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AdminLogin = React.lazy(() => import("./pages/AdminLogin"));
const Report = React.lazy(() => import("./pages/Report"));

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <NavBar />

        <main className="p-4 flex-1">
          <Suspense
            fallback={
              <div className="w-full h-64 flex items-center justify-center">
                <div className="text-sm text-gray-600">Loading...</div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/feedback" element={<FeedbackForm />} />
              <Route path="/report" element={<Report />} />
              <Route path="/verify" element={<VerifyBlockchain />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
