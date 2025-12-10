// src/pages/Transactions.jsx
import React, { useEffect, useMemo, useState } from "react";

const initialTransactions = [
  { id: 1, date: "2025-10-01", project: "Smart City Development", type: "Funding", amount: 500000000, status: "Success" },
  { id: 2, date: "2025-10-05", project: "Rural Broadband Expansion", type: "Payment", amount: 200000000, status: "Pending" },
  { id: 3, date: "2025-10-07", project: "Green Energy Program", type: "Grant", amount: 150000000, status: "Success" },
  { id: 4, date: "2025-10-10", project: "Healthcare Infrastructure", type: "Funding", amount: 300000000, status: "Failed" },
  { id: 5, date: "2025-10-12", project: "Public Transport Revamp", type: "Payment", amount: 250000000, status: "Pending" },
];

const statusClasses = {
  Success: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Failed: "bg-red-100 text-red-800",
};

const formatAmount = (n) => {
  if (!n && n !== 0) return "—";
  // show crore style: ₹xxx Cr
  const crore = Math.round((n / 10000000) * 100) / 100;
  return `₹${crore} Cr`;
};

export default function Transactions() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [liveMode, setLiveMode] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 5;

  // Simulate incoming transaction when liveMode is on
  useEffect(() => {
    if (!liveMode) return;
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const id = prev.length ? prev[prev.length - 1].id + 1 : 1;
        const sampleProjects = [
          "Smart City Development",
          "Rural Broadband Expansion",
          "Green Energy Program",
          "Water Supply Modernization",
        ];
        const newTx = {
          id,
          date: new Date().toISOString().slice(0, 10),
          project: sampleProjects[Math.floor(Math.random() * sampleProjects.length)],
          type: ["Payment", "Funding", "Grant"][Math.floor(Math.random() * 3)],
          amount: (Math.floor(Math.random() * 200) + 10) * 1000000,
          status: ["Success", "Pending", "Failed"][Math.floor(Math.random() * 3)],
        };
        return [newTx, ...prev].slice(0, 200); // cap list for demo
      });
    }, 4000); // every 4s
    return () => clearInterval(interval);
  }, [liveMode]);

  // Filtering logic
  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      // search
      const q = searchTerm.trim().toLowerCase();
      if (q) {
        const match = `${t.project} ${t.type} ${formatAmount(t.amount)}`.toLowerCase();
        if (!match.includes(q)) return false;
      }
      // status
      if (statusFilter !== "All" && t.status !== statusFilter) return false;
      // date range
      if (fromDate && t.date < fromDate) return false;
      if (toDate && t.date > toDate) return false;
      return true;
    });
  }, [transactions, searchTerm, statusFilter, fromDate, toDate]);

  // totals
  const totals = useMemo(() => {
    const totalCount = filtered.length;
    const totalAmount = filtered.reduce((s, t) => s + (t.amount || 0), 0);
    const byStatus = filtered.reduce(
      (acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      },
      { Success: 0, Pending: 0, Failed: 0 }
    );
    return { totalCount, totalAmount, byStatus };
  }, [filtered]);

  // Pagination slice
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    // Reset page when filters change
    setPage(1);
  }, [searchTerm, statusFilter, fromDate, toDate]);

  // Export CSV
  const exportCSV = () => {
    const rows = [
      ["Date", "Project", "Type", "Amount (₹)", "Status"],
      ...filtered.map((t) => [t.date, t.project, t.type, t.amount, t.status]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_export_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Transactions Ledger</h1>
          <p className="text-gray-600 mt-1">Track payments, fund releases and transaction status across public projects.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLiveMode((s) => !s)}
            className={`px-4 py-2 rounded-lg font-medium transition ${liveMode ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"}`}
            title="Toggle simulated live updates"
          >
            {liveMode ? "Live: ON" : "Live: OFF"}
          </button>

          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition"
            title="Export visible transactions to CSV"
          >
            Export CSV
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Visible Transactions</div>
          <div className="text-2xl font-bold text-gray-800">{totals.totalCount}</div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Total Amount (visible)</div>
          <div className="text-2xl font-bold text-blue-900">{formatAmount(totals.totalAmount)}</div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Success</div>
          <div className="text-2xl font-bold text-green-700">{totals.byStatus.Success}</div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Pending / Failed</div>
          <div className="text-2xl font-bold text-yellow-700">
            {totals.byStatus.Pending} / <span className="text-red-700">{totals.byStatus.Failed}</span>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="bg-white rounded-2xl shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Search by project, type, or amount..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <div className="flex gap-2 items-center">
            {["All", "Success", "Pending", "Failed"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-lg font-medium transition ${
                  statusFilter === s ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-sm text-gray-600">From</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="px-3 py-2 border rounded-lg" />
            <label className="text-sm text-gray-600">To</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="px-3 py-2 border rounded-lg" />
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginated.length > 0 ? (
              paginated.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{t.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{t.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{t.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-800 font-semibold">{formatAmount(t.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClasses[t.status] || "bg-gray-100 text-gray-800"}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  No transactions found. Adjust filters or toggle <strong>Live: ON</strong> to simulate incoming data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Pagination */}
      <footer className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Showing <strong>{(page - 1) * perPage + 1}</strong> to <strong>{Math.min(page * perPage, filtered.length)}</strong> of <strong>{filtered.length}</strong> transactions
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          <div className="px-3 py-1 rounded-md bg-white border">{page} / {totalPages}</div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}
