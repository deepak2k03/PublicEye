// src/pages/Contracts.jsx
import React, { useMemo, useState, useEffect } from "react";

/**
 * Contracts page - interactive UI with search, filters, sort, modal details, CSV export
 * Frontend-only (mock data + mock verify)
 */

const MOCK_CONTRACTS = [
  {
    id: "C-001",
    name: "Smart City Development Contract",
    desc: "Construction & IT infrastructure across sector 12.",
    status: "Active",
    department: "Urban Dev",
    startDate: "2023-01-10",
    endDate: "2025-12-31",
    budget: "₹500 Cr",
    progress: 62,
    blockchainHash: "0x9f3a...a1b2",
    audit: [
      { by: "official_raj", action: "Created", time: "2023-01-10 10:12" },
      { by: "auditor_k", action: "Approved", time: "2023-02-05 16:33" },
      { by: "official_raj", action: "Milestone 1 Completed", time: "2024-03-01 09:22" },
    ],
  },
  {
    id: "C-002",
    name: "Rural Broadband Expansion Contract",
    desc: "Fiber installation across rural clusters.",
    status: "Active",
    department: "Telecom",
    startDate: "2022-06-01",
    endDate: "2024-12-31",
    budget: "₹120 Cr",
    progress: 81,
    blockchainHash: "0x4b2c...d3e4",
    audit: [
      { by: "official_ali", action: "Created", time: "2022-06-01 11:10" },
      { by: "auditor_s", action: "Inspected", time: "2023-12-12 08:33" },
    ],
  },
  {
    id: "C-003",
    name: "Green Energy Program Contract",
    desc: "Solar + Wind deployment on public land.",
    status: "Pending",
    department: "Renewables",
    startDate: "2024-02-01",
    endDate: "2026-05-31",
    budget: "₹220 Cr",
    progress: 10,
    blockchainHash: "0x7a8b...f9e0",
    audit: [{ by: "official_megha", action: "Drafted", time: "2024-02-15 14:00" }],
  },
  {
    id: "C-004",
    name: "Water Supply Modernization Contract",
    desc: "Smart water pipelines and meters.",
    status: "Completed",
    department: "Water",
    startDate: "2021-03-10",
    endDate: "2023-08-20",
    budget: "₹75 Cr",
    progress: 100,
    blockchainHash: "0xa1b2...c3d4",
    audit: [
      { by: "official_rahul", action: "Created", time: "2021-03-10 09:10" },
      { by: "auditor_k", action: "Finalized", time: "2023-08-22 12:00" },
    ],
  },
  // add more as needed...
];

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString();
  } catch {
    return dateStr;
  }
}

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [department, setDepartment] = useState("All");
  const [sortBy, setSortBy] = useState("progressDesc");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);

  // simulate fetch
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setContracts(MOCK_CONTRACTS);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  const departments = useMemo(() => {
    const setD = new Set(contracts.map((c) => c.department));
    return ["All", ...Array.from(setD)];
  }, [contracts]);

  const statusOptions = ["All", "Active", "Pending", "Completed"];

  const filtered = useMemo(() => {
    let list = contracts.filter((c) => {
      const matchesQ =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.id.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All" || c.status === status;
      const matchesDept = department === "All" || c.department === department;
      return matchesQ && matchesStatus && matchesDept;
    });

    if (sortBy === "progressDesc") list.sort((a, b) => b.progress - a.progress);
    if (sortBy === "progressAsc") list.sort((a, b) => a.progress - b.progress);
    if (sortBy === "recent") list.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    return list;
  }, [contracts, query, status, department, sortBy]);

  // CSV export (client-side)
  const exportCSV = () => {
    const headers = ["ID", "Name", "Department", "Status", "Progress", "Start Date", "End Date", "Budget", "Hash"];
    const rows = filtered.map((c) => [
      c.id,
      c.name,
      c.department,
      c.status,
      `${c.progress}%`,
      c.startDate,
      c.endDate,
      c.budget,
      c.blockchainHash,
    ]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contracts_export_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // mock verify function
  const handleVerify = (contract) => {
    setVerifyingId(contract.id);
    // simulate network + blockchain verification
    setTimeout(() => {
      alert(`Mock verify: Contract ${contract.id}\nHash: ${contract.blockchainHash}\nStatus: Verified ✅`);
      setVerifyingId(null);
    }, 900);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Government Contracts</h1>
          <p className="text-gray-600 mt-1">Browse, verify and audit government contracts — mock data for demo.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition"
            aria-label="Export visible contracts to CSV"
          >
            Export CSV
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={() => {
              setQuery("");
              setStatus("All");
              setDepartment("All");
              setSortBy("progressDesc");
            }}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            aria-label="Reset filters"
          >
            Reset
          </button>
        </div>
      </header>

      {/* Controls */}
      <section className="mb-6 bg-white p-4 rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <input
            type="search"
            aria-label="Search contracts"
            placeholder="Search by name or id (e.g. C-001)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium text-gray-700 mr-2">Status</label>
            <div className="flex gap-2">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    status === s ? "bg-blue-700 text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  aria-pressed={status === s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <label className="text-sm font-medium text-gray-700">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none"
              aria-label="Sort contracts"
            >
              <option value="progressDesc">Progress (High → Low)</option>
              <option value="progressAsc">Progress (Low → High)</option>
              <option value="recent">Most Recent Start</option>
            </select>
          </div>
        </div>
      </section>

      {/* Content */}
      <section>
        {loading ? (
          // skeleton grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="bg-white p-4 rounded-2xl animate-pulse h-44" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl text-center text-gray-600 shadow-sm">
            No contracts match your search and filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <article
                key={c.id}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition flex flex-col"
                role="article"
                aria-labelledby={`contract-${c.id}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 id={`contract-${c.id}`} className="text-lg font-semibold text-gray-800">
                      {c.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{c.department} • {c.id}</p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        c.status === "Active"
                          ? "bg-blue-100 text-blue-800"
                          : c.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mt-4 line-clamp-2">{c.desc}</p>

                {/* progress + budget */}
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div
                        className="h-3 bg-blue-600 rounded-full transition-all"
                        style={{ width: `${c.progress}%` }}
                        aria-valuenow={c.progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        role="progressbar"
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{c.progress}% complete</div>
                  </div>

                  <div className="ml-3 text-sm text-gray-700 font-medium">{c.budget}</div>
                </div>

                {/* footer actions */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelected(c)}
                      className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleVerify(c)}
                      className="px-3 py-2 rounded-lg bg-white border text-sm hover:bg-gray-50"
                      disabled={!!verifyingId}
                      aria-disabled={!!verifyingId}
                    >
                      {verifyingId === c.id ? "Verifying..." : "Verify"}
                    </button>
                  </div>

                  <div className="text-xs text-gray-500">
                    Hash:{" "}
                    <span className="font-mono text-gray-700">
                      {c.blockchainHash.slice(0, 8)}...
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contract-modal-title"
        >
          <div className="absolute inset-0 bg-black opacity-30" onClick={() => setSelected(null)} />
          <div className="relative max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-auto">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 id="contract-modal-title" className="text-2xl font-bold text-gray-800">
                    {selected.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{selected.department} • {selected.id}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close details"
                  className="text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700">{selected.desc}</p>

                  <ul className="mt-4 text-sm text-gray-600 space-y-2">
                    <li><strong>Budget:</strong> {selected.budget}</li>
                    <li><strong>Start:</strong> {formatDate(selected.startDate)}</li>
                    <li><strong>End:</strong> {formatDate(selected.endDate)}</li>
                    <li><strong>Progress:</strong> {selected.progress}%</li>
                    <li><strong>Status:</strong> {selected.status}</li>
                    <li><strong>Blockchain Hash:</strong> <span className="font-mono">{selected.blockchainHash}</span></li>
                  </ul>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => { navigator.clipboard?.writeText(selected.blockchainHash); alert("Hash copied"); }}
                      className="px-4 py-2 rounded-lg bg-blue-700 text-white"
                    >
                      Copy Hash
                    </button>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); alert("Open mock explorer"); }}
                      className="px-4 py-2 rounded-lg bg-gray-100"
                    >
                      View on Explorer
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700">Audit Trail</h4>
                  <div className="mt-3 space-y-3 max-h-56 overflow-auto pr-2">
                    {selected.audit.map((a, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-600" />
                        <div>
                          <div className="text-sm text-gray-800 font-medium">{a.action}</div>
                          <div className="text-xs text-gray-500">{a.by} • {a.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-700">Admin Actions</h4>
                    <div className="mt-2 flex gap-2">
                      <button
                        className="px-3 py-2 bg-green-600 text-white rounded-lg"
                        onClick={() => { alert("Mock approve action"); }}
                      >
                        Approve
                      </button>
                      <button
                        className="px-3 py-2 bg-yellow-500 text-white rounded-lg"
                        onClick={() => { alert("Mock request changes"); }}
                      >
                        Request Changes
                      </button>
                      <button
                        className="px-3 py-2 bg-red-500 text-white rounded-lg"
                        onClick={() => { alert("Mock revoke"); }}
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-right">
                <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-lg bg-gray-100">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
