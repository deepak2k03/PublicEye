import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();

  const allProjects = [
    {
      id: 1,
      name: "Smart City Development",
      desc: "Sustainable tech-driven cities",
      status: "Ongoing",
      img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      name: "Rural Broadband Expansion",
      desc: "High-speed internet in rural areas",
      status: "Ongoing",
      img: "https://www.techspot.com/images2/news/bigimage/2022/01/2022-01-31-image-6.jpg",
    },
    {
      id: 3,
      name: "Green Energy Program",
      desc: "Solar & wind energy initiatives",
      status: "Upcoming",
      img: "https://s40598.pcdn.co/wp-content/uploads/2022/06/Solar-panels-wind-turbines-installed-on-a-field.jpg",
    },
    {
      id: 4,
      name: "Healthcare Infrastructure Upgrade",
      desc: "Improving hospitals and clinics",
      status: "Completed",
      img: "https://tse3.mm.bing.net/th/id/OIP.IH8_Es-EV-Cqu6A9OR4flgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 5,
      name: "Water Supply Modernization",
      desc: "Better water management systems",
      status: "Ongoing",
      img: "https://ktf.bcie.org/fileadmin/_processed_/7/0/csm_shutterstock_1026609469_09b5a5d860.jpg",
    },
    {
      id: 6,
      name: "Public Transportation Revamp",
      desc: "Modernizing buses and metro",
      status: "Upcoming",
      img: "https://www.constructionworld.in/assets/uploads/1421137938911c3f82638d519563aa37dea0b5706185e.jpg",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleStatusChange = (status) => setStatusFilter(status);

  const filteredProjects = allProjects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ["All", "Ongoing", "Completed", "Upcoming"];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Government Projects</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
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
            <div key={project.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col">
              {/* Project Image */}
              <img
                src={project.img}
                alt={project.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.desc}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      project.status === "Ongoing"
                        ? "bg-blue-100 text-blue-800"
                        : project.status === "Upcoming"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition"
                  >
                    View Project
                  </button>
                  <button
                    onClick={() => navigate("/feedback", { state: { projectName: project.name } })}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 rounded-lg transition"
                  >
                    Give Feedback
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-6">No projects found matching your criteria.</p>
      )}
    </div>
  );
}
