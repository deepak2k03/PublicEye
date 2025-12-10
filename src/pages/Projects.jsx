// src/pages/Projects.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();

  const allProjects = [
    {
      id: 1,
      name: "Smart City Development",
      desc: "Sustainable tech-driven cities integrating IoT & digital services.",
      status: "Ongoing",
      img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=60",
      progress: 64,
      budget: "₹500 Cr",
      department: "Ministry of Urban Development",
    },
    {
      id: 2,
      name: "Rural Broadband Expansion",
      desc: "High-speed internet for rural education and health services.",
      status: "Ongoing",
      img: "https://www.techspot.com/images2/news/bigimage/2022/01/2022-01-31-image-6.jpg",
      progress: 82,
      budget: "₹120 Cr",
      department: "Dept. of Telecommunications",
    },
    {
      id: 3,
      name: "Green Energy Program",
      desc: "Solar & wind deployments for sustainable power.",
      status: "Upcoming",
      img: "https://s40598.pcdn.co/wp-content/uploads/2022/06/Solar-panels-wind-turbines-installed-on-a-field.jpg",
      progress: 8,
      budget: "₹300 Cr",
      department: "Ministry of New & Renewable Energy",
    },
    {
      id: 4,
      name: "Healthcare Infrastructure Upgrade",
      desc: "Upgrading hospitals & diagnostic centers nationwide.",
      status: "Completed",
      img: "https://www.businesstoday.com.my/wp-content/uploads/2020/10/javier-matheu-AHDeiqdiC7Q-unsplash-2048x1367.jpg",
      progress: 100,
      budget: "₹220 Cr",
      department: "Ministry of Health",
    },
    {
      id: 5,
      name: "Water Supply Modernization",
      desc: "Smart water pipelines and real-time monitoring.",
      status: "Ongoing",
      img: "https://ktf.bcie.org/fileadmin/_processed_/7/0/csm_shutterstock_1026609469_09b5a5d860.jpg",
      progress: 47,
      budget: "₹140 Cr",
      department: "Ministry of Water Resources",
    },
    {
      id: 6,
      name: "Public Transportation Revamp",
      desc: "Modernizing buses and metro systems for cities.",
      status: "Upcoming",
      img: "https://www.constructionworld.in/assets/uploads/1421137938911c3f82638d519563aa37dea0b5706185e.jpg",
      progress: 12,
      budget: "₹400 Cr",
      department: "Ministry of Transport",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent"); // recent | progress-desc | progress-asc

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleStatusChange = (status) => setStatusFilter(status);
  const handleSortChange = (e) => setSortBy(e.target.value);

  const filteredProjects = allProjects
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "progress-desc") return b.progress - a.progress;
      if (sortBy === "progress-asc") return a.progress - b.progress;
      return b.id - a.id; // recent by id desc as fallback
    });

  const statusOptions = ["All", "Ongoing", "Completed", "Upcoming"];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">All Government Projects</h1>
            <p className="text-gray-600 mt-1">Track progress, budgets, and department details.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700">Ongoing</span>
              <span className="px-3 py-1 rounded-full bg-green-50 text-green-700">Completed</span>
              <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700">Upcoming</span>
            </div>

            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-3 py-2 border rounded-lg bg-white text-sm"
            >
              <option value="recent">Sort: Recent</option>
              <option value="progress-desc">Sort: Progress ↑</option>
              <option value="progress-asc">Sort: Progress ↓</option>
            </select>
          </div>
        </header>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search projects, department or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          />

          <div className="flex gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === status
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src={project.img}
                    alt={project.name}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                  {/* Status pill over image */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        project.status === "Ongoing"
                          ? "bg-blue-700 text-white"
                          : project.status === "Upcoming"
                          ? "bg-yellow-600 text-white"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  {/* Budget and dept chips */}
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                    <span className="bg-white/80 px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                      {project.budget}
                    </span>
                    <span className="bg-white/80 px-3 py-1 rounded-full text-xs text-gray-700">
                      {project.department}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.desc}</p>

                  {/* Progress block */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-gray-500">Progress</div>
                      <div className="text-sm font-medium text-gray-700">{project.progress}%</div>
                    </div>
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-400 transition-all"
                        style={{ width: `${project.progress}%` }}
                        role="progressbar"
                        aria-valuenow={project.progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>

                    {/* Milestone preview */}
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <div>Start: <span className="text-gray-700 ml-1">2023-01-15</span></div>
                      <div>ETA: <span className="text-gray-700 ml-1">2025-12-31</span></div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition"
                      >
                        View Project
                      </button>
                      <button
                        onClick={() =>
                          navigate("/feedback", { state: { projectName: project.name } })
                        }
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 rounded-lg transition"
                      >
                        Give Feedback
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-6">No projects found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}
