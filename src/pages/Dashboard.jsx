// src/pages/Dashboard.jsx
import React, { useMemo, useState } from "react";

/**
 * Enhanced Dashboard UI (React + Tailwind)
 * - Stats overview
 * - Spending sparkline + department bar chart (SVG)
 * - Recent projects with detailed stepwise progress
 * - Activity timeline (audit log)
 * - Alerts & quick actions
 * - CSV export for recent projects
 *
 * No external charting libs — lightweight SVG components included.
 */

const mockStats = [
  { title: "Active Projects", value: "500+" },
  { title: "Tracked Spending", value: "₹1,200 Cr" },
  { title: "Departments", value: "300+" },
  { title: "Citizen Reports", value: "50K+" },
];

const departmentSpending = [
  { dept: "Infrastructure", value: 420 },
  { dept: "Health", value: 240 },
  { dept: "Education", value: 180 },
  { dept: "Energy", value: 120 },
  { dept: "Digital", value: 90 },
];

const recentProjects = [
  {
    id: "P-001",
    name: "Smart City Development",
    dept: "Infrastructure",
    progress: 65,
    budget: "₹500 Cr",
    start: "2023-01-15",
    end: "2025-12-31",
    milestones: [
      { label: "Planning", status: "done", date: "2023-03-10" },
      { label: "Procurement", status: "done", date: "2023-08-05" },
      { label: "Construction", status: "in-progress", date: "2024-06-10" },
      { label: "Testing", status: "pending", date: null },
      { label: "Handover", status: "pending", date: null },
    ],
    lastUpdate: "2025-04-12",
    blockchainHash: "0xabc123...e9f",
  },
  {
    id: "P-002",
    name: "Rural Broadband Expansion",
    dept: "Digital",
    progress: 80,
    budget: "₹120 Cr",
    start: "2022-06-01",
    end: "2024-12-31",
    milestones: [
      { label: "Survey", status: "done", date: "2022-07-02" },
      { label: "Laying Fiber", status: "done", date: "2023-05-10" },
      { label: "Last-mile", status: "in-progress", date: "2024-08-15" },
      { label: "Activation", status: "pending", date: null },
    ],
    lastUpdate: "2024-11-02",
    blockchainHash: "0xdef456...a1b",
  },
  {
    id: "P-003",
    name: "Green Energy Program",
    dept: "Energy",
    progress: 42,
    budget: "₹300 Cr",
    start: "2024-02-01",
    end: "2026-06-30",
    milestones: [
      { label: "Feasibility", status: "done", date: "2024-05-20" },
      { label: "Site Setup", status: "in-progress", date: "2024-11-01" },
      { label: "Panel Install", status: "pending", date: null },
      { label: "Grid Tie", status: "pending", date: null },
    ],
    lastUpdate: "2025-02-01",
    blockchainHash: "0xghi789...k3m",
  },
];

const mockActivity = [
  { time: "2 hours ago", text: "Transaction logged for P-001: ₹5Cr", type: "transaction" },
  { time: "1 day ago", text: "New audit note added to P-002", type: "audit" },
  { time: "3 days ago", text: "Citizen report filed regarding delay on P-001", type: "report" },
];

const mockAlerts = [
  { id: 1, level: "High", text: "Anomaly detected in spending pattern for Infrastructure", time: "10m" },
  { id: 2, level: "Medium", text: "Delay observed in last-mile activities for Rural Broadband", time: "6h" },
];

/* Small utility: CSV export */
function exportCSV(rows, filename = "export.csv") {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => `"${(r[h] ?? "").toString().replace(/"/g, '""')}"`).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* Simple Sparkline (line) */
function Sparkline({ data = [], width = 250, height = 60 }) {
  const max = Math.max(...data, 1);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1 || 1)) * width;
      const y = height - (d / max) * height;
      return `${x},${y}`;
    })
    .join(" ");
  const last = data[data.length - 1] ?? 0;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Spending sparkline">
      <polyline points={points} fill="none" stroke="#0f6fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width - 2} cy={height - (last / max) * height} r="3" fill="#0f6fff" />
    </svg>
  );
}

/* Simple BarChart for department spending */
function BarChart({ data = [], width = 380, height = 180 }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barW = width / (data.length * 1.5);
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Department spending">
      {data.map((d, i) => {
        const x = i * (barW * 1.5) + 20;
        const barH = (d.value / max) * (height - 40);
        const y = height - barH - 20;
        return (
          <g key={d.dept}>
            <rect x={x} y={y} width={barW} height={barH} rx="6" fill="#0f6fff" opacity="0.85" />
            <text x={x + barW / 2} y={height - 2} fontSize="11" textAnchor="middle" fill="#374151">
              {d.dept}
            </text>
            <text x={x + barW / 2} y={y - 6} fontSize="11" textAnchor="middle" fill="#111827">
              {d.value}Cr
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ProjectStep component: detailed step stylings */
function ProjectSteps({ steps = [] }) {
  return (
    <ol className="space-y-4">
      {steps.map((s, idx) => {
        const done = s.status === "done";
        const inProgress = s.status === "in-progress";
        return (
          <li key={idx} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  done ? "bg-blue-600 text-white" : inProgress ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-600"
                }`}
                aria-hidden
              >
                {done ? "✓" : inProgress ? "●" : idx + 1}
              </div>
              {idx !== steps.length - 1 && <div className="w-px bg-gray-200 h-full mt-1" style={{ minHeight: 48 }} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800">{s.label}</p>
                {s.date && <span className="text-xs text-gray-500">• {s.date}</span>}
                {inProgress && <span className="text-xs text-yellow-600 ml-2">In progress</span>}
              </div>
              <p className="text-sm text-gray-600">{s.note ?? ""}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function Dashboard() {
  const [filterDept, setFilterDept] = useState("All");
  const [showOnlyOngoing, setShowOnlyOngoing] = useState(false);

  const filteredProjects = useMemo(() => {
    let list = recentProjects;
    if (filterDept !== "All") list = list.filter((p) => p.dept === filterDept);
    if (showOnlyOngoing) list = list.filter((p) => p.progress < 100);
    return list;
  }, [filterDept, showOnlyOngoing]);

  const spendingSeries = [120, 150, 180, 200, 240, 300, 320, 360, 400, 420]; // mock monthly spending trend

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Transparency Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Real-time project tracking — immutable records & audit trails. Mock data for frontend preview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm hover:shadow-md"
            onClick={() => {
              // simulate refresh
              const el = document.querySelector("[data-toast]");
              if (el) el.textContent = "Refreshed at " + new Date().toLocaleTimeString();
            }}
            aria-label="Refresh data"
          >
            Refresh
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            onClick={() => exportCSV(filteredProjects.map(p => ({ id: p.id, name: p.name, dept: p.dept, progress: p.progress, budget: p.budget })), 'recent-projects.csv')}
            aria-label="Export projects CSV"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStats.map((s, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg">
            <p className="text-sm text-gray-500">{s.title}</p>
            <div className="flex items-center justify-between mt-3">
              <h2 className="text-2xl font-bold text-blue-900">{s.value}</h2>
              {/* mini sparkline */}
              <div className="hidden sm:block">
                <Sparkline data={spendingSeries.slice(-10)} />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Live data (mock)</p>
          </div>
        ))}
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Charts & Departments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Spending + department chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Spending Overview (Last 12 months)</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <select
                  aria-label="Select time range"
                  className="border rounded-md px-2 py-1"
                  defaultValue="12"
                >
                  <option value="3">3M</option>
                  <option value="6">6M</option>
                  <option value="12">12M</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="md:col-span-2 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm text-gray-500">Monthly spending</p>
                    <h4 className="text-xl font-bold text-gray-800">₹420 Cr</h4>
                  </div>
                  <div className="text-sm text-gray-500">Trend</div>
                </div>
                <div className="mt-2">
                  {/* Big sparkline area (svg) */}
                  <svg viewBox="0 0 360 80" className="w-full h-20">
                    <polyline
                      fill="none"
                      stroke="#0f6fff"
                      strokeWidth="3"
                      points={spendingSeries
                        .map((d, i) => `${(i / (spendingSeries.length - 1)) * 360},${80 - (d / Math.max(...spendingSeries)) * 70}`)
                        .join(" ")}
                    />
                    {/* gradient fill under curve */}
                    <polyline
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="0"
                      points={spendingSeries
                        .map((d, i) => `${(i / (spendingSeries.length - 1)) * 360},${80 - (d / Math.max(...spendingSeries)) * 70}`)
                        .join(" ")}
                    />
                  </svg>
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-sm text-gray-500">Department Spending</h4>
                <div className="mt-2">
                  <BarChart data={departmentSpending} width={320} height={140} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Projects with stepwise progress */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Ongoing Projects — Detailed Progress</h3>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Dept:</label>
                <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="border rounded-md px-2 py-1 text-sm">
                  <option>All</option>
                  {[...new Set(recentProjects.map((p) => p.dept))].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" checked={showOnlyOngoing} onChange={(e) => setShowOnlyOngoing(e.target.checked)} />
                  Ongoing only
                </label>
              </div>
            </div>

            <div className="space-y-6">
              {filteredProjects.map((p) => (
                <div key={p.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800">{p.name}</h4>
                          <p className="text-xs text-gray-500">{p.dept} • {p.start} → {p.end}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Budget</p>
                          <p className="font-semibold text-gray-800">{p.budget}</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                          <div className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-400" style={{ width: `${p.progress}%` }} />
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                          <span>{p.progress}% complete</span>
                          <span>Last update: {p.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Milestones</h5>
                      <ProjectSteps steps={p.milestones} />
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Audit & Verification</h5>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600 mb-2">Blockchain Hash</p>
                        <div className="flex items-center justify-between gap-3">
                          <code className="text-xs bg-white p-2 rounded-md border border-gray-100 break-all">{p.blockchainHash}</code>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1 bg-white border rounded-md text-sm hover:shadow" aria-label="View on explorer">Explorer</button>
                            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700" aria-label="Verify on blockchain">Verify</button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Full audit trail recorded and timestamped (mock).</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredProjects.length === 0 && <p className="text-gray-500">No projects match the filters.</p>}
            </div>
          </div>
        </div>

        {/* Right column: activity, alerts, quick filters */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h4 className="text-md font-semibold text-gray-800 mb-3">Quick Filters</h4>
            <div className="flex flex-col gap-2">
              <button className="text-left px-3 py-2 rounded-md hover:bg-gray-100">All Projects</button>
              <button className="text-left px-3 py-2 rounded-md hover:bg-gray-100">Delayed Projects</button>
              <button className="text-left px-3 py-2 rounded-md hover:bg-gray-100">High Spending</button>
              <button className="text-left px-3 py-2 rounded-md hover:bg-gray-100">Pending Verifications</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-semibold text-gray-800">Recent Activity</h4>
              <button className="text-sm text-blue-600">View all</button>
            </div>
            <ul className="space-y-3">
              {mockActivity.map((a, i) => (
                <li key={i} className="text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-2" />
                    <div>
                      <p className="text-gray-800">{a.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{a.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-semibold text-gray-800">Alerts</h4>
              <button className="text-sm text-gray-500">Dismiss all</button>
            </div>
            <div className="space-y-3">
              {mockAlerts.map((al) => (
                <div key={al.id} className="p-3 rounded-md border border-gray-100 bg-yellow-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{al.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{al.time} ago — {al.level}</p>
                    </div>
                    <div>
                      <button className="px-3 py-1 bg-white border rounded-md text-sm">Investigate</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="dev-note" className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-gray-500" data-toast="">
              Toggle filters to simulate different views. This is a frontend mock — connect to backend APIs for live data.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
