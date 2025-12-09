import React, { useState } from "react";

export default function Transactions() {
  const allTransactions = [
    { date: "2025-10-01", project: "Smart City Development", type: "Funding", amount: "₹50Cr", status: "Success" },
    { date: "2025-10-05", project: "Rural Broadband Expansion", type: "Payment", amount: "₹20Cr", status: "Pending" },
    { date: "2025-10-07", project: "Green Energy Program", type: "Grant", amount: "₹15Cr", status: "Success" },
    { date: "2025-10-10", project: "Healthcare Infrastructure", type: "Funding", amount: "₹30Cr", status: "Failed" },
    { date: "2025-10-12", project: "Public Transport Revamp", type: "Payment", amount: "₹25Cr", status: "Pending" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = allTransactions.filter(
    (t) =>
      t.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.amount.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Transactions</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by project, type, or amount..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{t.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{t.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{t.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{t.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        t.status === "Success"
                          ? "bg-green-100 text-green-800"
                          : t.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-600">
                  No transactions found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
