import React from "react";

export default function Dashboard() {
  const stats = [
    { title: "Active Projects", value: "500+" },
    { title: "Tracked Spending", value: "₹1200Cr+" },
    { title: "Government Departments", value: "300+" },
    { title: "Citizen Reports", value: "50K+" },
  ];

  const recentProjects = [
    { name: "Smart City Development", status: "Ongoing" },
    { name: "Rural Broadband Expansion", status: "Ongoing" },
    { name: "Green Energy Program", status: "Upcoming" },
    { name: "Healthcare Infrastructure Upgrade", status: "Completed" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">{stat.value}</h2>
            <p className="text-gray-700 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Projects Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Projects</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Project Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentProjects.map((project, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{project.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
