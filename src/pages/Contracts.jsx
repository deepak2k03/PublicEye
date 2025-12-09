import React, { useState } from "react";

export default function Contracts() {
  const allContracts = [
    { name: "Smart City Development Contract", desc: "Construction & IT infrastructure", status: "Active" },
    { name: "Rural Broadband Expansion Contract", desc: "Fiber optic installation in villages", status: "Active" },
    { name: "Green Energy Program Contract", desc: "Solar panel & wind farm deployment", status: "Pending" },
    { name: "Healthcare Infrastructure Upgrade", desc: "Hospital renovation and equipment", status: "Completed" },
    { name: "Water Supply Modernization Contract", desc: "Smart water pipelines", status: "Active" },
    { name: "Public Transport Revamp Contract", desc: "Bus and metro modernization", status: "Pending" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleStatusChange = (status) => setStatusFilter(status);

  const filteredContracts = allContracts.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ["All", "Active", "Completed", "Pending"];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Government Contracts</h1>

      {/* Search & Status Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search contracts..."
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

      {/* Contracts Grid */}
      {filteredContracts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContracts.map((contract, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{contract.name}</h3>
              <p className="text-gray-600 mb-4">{contract.desc}</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  contract.status === "Active"
                    ? "bg-blue-100 text-blue-800"
                    : contract.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {contract.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-6">No contracts found matching your criteria.</p>
      )}
    </div>
  );
}
