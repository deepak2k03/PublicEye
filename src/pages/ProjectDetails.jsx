// src/pages/ProjectDetails.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

/**
 * Detailed Project Details / Progress Tracker (frontend only)
 * - Milestones stepper
 * - Timeline
 * - Spending breakdown
 * - Recent transactions
 * - Audit trail
 * - Mock blockchain verification modal
 */

/* Dummy dataset (expand as needed) */
const projectData = [
  {
    id: "1",
    title: "Smart City Development",
    description:
      "Building sustainable, technology-driven cities across India. This project integrates digital services, smart infrastructure, and citizen engagement to improve urban living standards.",
    images: [
      "https://images.unsplash.com/photo-1596079890744-1c671d4bfa0c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5a2f6a1f2c5a9fef1a9b2b3d5d7f3c8d",
    ],
    startDate: "2023-01-15",
    endDate: "2025-12-31",
    budget: 500000000, // in rupees
    spent: 325000000,
    department: "Ministry of Urban Development",
    progress: 65, // aggregate %
    blockchainHash: "0x9f8b...a2c4",
    milestones: [
      {
        id: "m1",
        title: "Planning & Tendering",
        description: "Complete project planning, tender invitation and award contracts.",
        dueDate: "2023-06-30",
        progress: 100,
        status: "completed",
      },
      {
        id: "m2",
        title: "Phase 1 Infrastructure",
        description: "Build basic infrastructure (roads, power upgrades, fiber backbone).",
        dueDate: "2024-06-30",
        progress: 75,
        status: "in-progress",
      },
      {
        id: "m3",
        title: "Civic Services Integration",
        description: "Integrate municipal services into the digital platform.",
        dueDate: "2025-03-31",
        progress: 40,
        status: "in-progress",
      },
      {
        id: "m4",
        title: "Public Launch & Handover",
        description: "Final testing, public launch and handover to local authorities.",
        dueDate: "2025-12-31",
        progress: 0,
        status: "pending",
      },
    ],
    timeline: [
      { date: "2023-01-15", text: "Project kick-off" },
      { date: "2023-05-10", text: "Tender published" },
      { date: "2023-07-22", text: "Contract awarded to Contractor A" },
      { date: "2024-02-15", text: "Phase 1 civil works started" },
      { date: "2024-11-01", text: "Fiber backbone completed" },
    ],
    transactions: [
      { id: "t1", date: "2023-07-25", desc: "Initial mobilization payment", amount: 50000000 },
      { id: "t2", date: "2024-02-20", desc: "Material purchase - steel & concrete", amount: 120000000 },
      { id: "t3", date: "2024-10-12", desc: "Subcontractor payout", amount: 55000000 },
    ],
    auditTrail: [
      { id: "a1", who: "Procurement Officer", action: "Tender uploaded", time: "2023-05-10 11:23" },
      { id: "a2", who: "Admin", action: "Contract approved", time: "2023-07-22 09:10" },
      { id: "a3", who: "Engineer", action: "Phase 1 milestone updated to 75%", time: "2024-09-15 16:05" },
    ],
  },
  // ... more projects
];

function rupees(n) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projectData.find((p) => p.id === id) || projectData[0];

  // Modal state for blockchain verification
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(null); // null | true | false

  const handleVerify = () => {
    setVerifying(true);
    setVerified(null);
    // mock verification delay
    setTimeout(() => {
      // simple mock: if hash exists, verified true
      const ok = !!project.blockchainHash;
      setVerified(ok);
      setVerifying(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">{project.title}</h1>
            <p className="text-gray-600 mt-1">{project.department}</p>
            <p className="text-sm text-gray-500 mt-2">{project.description}</p>
            <div className="flex items-center gap-3 mt-3">
              <div className="text-sm text-gray-700">
                <span className="font-medium">Start:</span> {project.startDate}
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">End:</span> {project.endDate}
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">Progress:</span> {project.progress}%
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Budget</div>
              <div className="text-lg font-semibold">{rupees(project.budget)}</div>
              <div className="text-sm text-gray-500 mt-1">Spent: <span className="font-medium">{rupees(project.spent)}</span></div>
            </div>

            <div className="flex flex-col items-end">
              <div className="px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-700">Status: <span className="font-semibold ml-1">{project.progress >= 100 ? "Completed" : project.progress >= 50 ? "On Track" : "At Risk"}</span></div>
              <button
                onClick={handleVerify}
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
                aria-label="Verify on blockchain"
              >
                🔗 Verify on Blockchain
              </button>
              <div className="text-xs text-gray-500 mt-2">Hash: <span className="font-mono">{project.blockchainHash}</span></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: images & spending */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image */}
            <div className="bg-white rounded-2xl shadow p-4">
              <img src={project.images[0]} alt={project.title} className="w-full h-48 object-cover rounded-lg" />
            </div>

            {/* Spending breakdown */}
            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Spending Breakdown</h3>
              {/* Example categories */}
              {[
                { name: "Infrastructure", amount: 200000000 },
                { name: "Equipment", amount: 80000000 },
                { name: "Services", amount: 45000000 },
              ].map((cat) => {
                const pct = Math.round((cat.amount / project.budget) * 100);
                return (
                  <div key={cat.name} className="mb-3">
                    <div className="flex justify-between text-sm">
                      <div className="text-gray-700">{cat.name}</div>
                      <div className="text-gray-600 font-medium">{rupees(cat.amount)} <span className="text-gray-500">({pct}%)</span></div>
                    </div>
                    <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
                      <div className="h-3 rounded-full bg-green-600" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent transactions */}
            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Recent Transactions</h3>
              <ul className="space-y-2">
                {project.transactions.map((t) => (
                  <li key={t.id} className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-700">{t.desc}</div>
                      <div className="text-xs text-gray-500">{t.date}</div>
                    </div>
                    <div className="text-sm font-semibold">{rupees(t.amount)}</div>
                  </li>
                ))}
              </ul>
              <Link to="/transactions" className="block mt-3 text-sm text-blue-600 hover:underline">View all transactions →</Link>
            </div>
          </div>

          {/* Center column: milestones & timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall progress bar */}
            <div className="bg-white rounded-2xl shadow p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">Project Progress</h3>
                <div className="text-sm text-gray-600 font-medium">{project.progress}%</div>
              </div>
              <div className="w-full bg-gray-200 h-4 rounded-full">
                <div className="h-4 rounded-full bg-blue-600" style={{ width: `${project.progress}%` }} />
              </div>
              <div className="mt-4 text-sm text-gray-600">Milestone completion & detailed progress below.</div>
            </div>

            {/* Milestones stepper */}
            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Milestones</h3>
              <div className="space-y-6">
                {project.milestones.map((m, idx) => (
                  <div key={m.id} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${m.status === "completed" ? "bg-green-600" : m.status === "in-progress" ? "bg-yellow-500" : "bg-gray-300"}`}>
                        {m.status === "completed" ? "✓" : idx + 1}
                      </div>
                      {idx !== project.milestones.length - 1 && <div className="w-px h-12 bg-gray-200 mt-1" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-800">{m.title}</div>
                          <div className="text-sm text-gray-500">{m.description}</div>
                        </div>
                        <div className="text-sm text-gray-500">{m.dueDate}</div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <div>Milestone progress</div>
                          <div className="font-medium">{m.progress}%</div>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full">
                          <div className={`h-3 rounded-full ${m.status === "completed" ? "bg-green-600" : "bg-blue-600"}`} style={{ width: `${m.progress}%` }} />
                        </div>

                        <div className="mt-2 flex gap-2">
                          <button className="px-3 py-1 bg-gray-100 rounded text-sm text-gray-700">View Documents</button>
                          <button className="px-3 py-1 bg-gray-100 rounded text-sm text-gray-700">Log Update</button>
                          {/* Removed public "Mark as Complete" button — only authorized officials should change milestone state */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline & Audit Trail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Timeline</h3>
                <ol className="border-l border-gray-200 ml-2 space-y-4">
                  {project.timeline.map((ev, i) => (
                    <li key={i} className="pl-4">
                      <div className="text-sm text-gray-600">{ev.date}</div>
                      <div className="text-gray-800">{ev.text}</div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-white rounded-2xl shadow p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Audit Trail</h3>
                <ul className="space-y-3">
                  {project.auditTrail.map((a) => (
                    <li key={a.id} className="text-sm">
                      <div className="flex justify-between text-gray-700">
                        <div>
                          <div className="font-medium">{a.who}</div>
                          <div className="text-gray-600">{a.action}</div>
                        </div>
                        <div className="text-gray-500">{a.time}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link to="/admin" className="mt-3 inline-block text-sm text-blue-600 hover:underline">View full audit logs →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mock verification modal */}
      { (verifying || verified !== null) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-3">Blockchain Verification</h3>

            {verifying && <div className="text-gray-600">Verifying <span className="font-mono">{project.blockchainHash}</span> ...</div>}
            {!verifying && verified === true && (
              <div className="text-green-700">
                ✅ Verified on-chain.<br />
                Timestamp: <span className="font-mono">2024-10-12T08:34:21Z</span><br />
                Explorer: <a className="text-blue-600 underline" href="#" onClick={(e)=>e.preventDefault()}>Mock Explorer</a>
              </div>
            )}
            {!verifying && verified === false && (
              <div className="text-red-600">
                ❌ Not found on-chain. The record may be missing or not yet published.
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => { setVerifying(false); setVerified(null); }} className="px-4 py-2 rounded-md bg-gray-100">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
