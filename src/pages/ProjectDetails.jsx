import React from "react";
import { useParams, Link } from "react-router-dom";

// Dummy data for demonstration
const projectData = [
  {
    id: "1",
    title: "Smart City Development",
    description:
      "Building sustainable, technology-driven cities across India. This project aims to integrate digital services, smart infrastructure, and citizen engagement to improve urban living standards.",
    images: [
      "https://images.unsplash.com/photo-1596079890744-1c671d4bfa0c",
      "https://images.unsplash.com/photo-1612832021193-4161c63f4c62",
    ],
    startDate: "2023-01-15",
    endDate: "2025-12-31",
    budget: "₹500 Cr",
    department: "Ministry of Urban Development",
    progress: 65, // in percentage
  },
  {
    id: "2",
    title: "Rural Broadband Expansion",
    description:
      "Connecting rural communities with high-speed internet access to empower education, healthcare, and local businesses.",
    images: [
      "https://images.unsplash.com/photo-1603791452906-bb7b4f3f3a4b",
      "https://images.unsplash.com/photo-1612832021193-4161c63f4c62",
    ],
    startDate: "2022-06-01",
    endDate: "2024-12-31",
    budget: "₹120 Cr",
    department: "Department of Telecommunications",
    progress: 80,
  },
];

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projectData.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold text-lg">Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Project Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{project.title}</h1>
        <p className="text-gray-700 mb-6">{project.description}</p>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {project.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${project.title} ${index + 1}`}
              className="w-full h-60 object-cover rounded-xl shadow-md"
            />
          ))}
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="font-semibold text-gray-800">Start Date:</p>
            <p className="text-gray-700">{project.startDate}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">End Date:</p>
            <p className="text-gray-700">{project.endDate}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Budget:</p>
            <p className="text-gray-700">{project.budget}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Department:</p>
            <p className="text-gray-700">{project.department}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <p className="font-semibold text-gray-800 mb-1">Progress: {project.progress}%</p>
          <div className="w-full bg-gray-200 h-4 rounded-full">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-4">
          <Link
            to="/feedback"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Give Feedback
          </Link>
          <Link
            to="/projects"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
