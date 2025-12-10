// src/pages/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Modern, interactive Home page for Transparency Platform.
 * - No real data (placeholders only)
 * - Signup / Login sits mid-page (between modules and highlights)
 * - Clean, minimal Tailwind styling and small UI interactions
 *
 * Drop into src/pages/Home.jsx
 */

const ModuleCard = ({ title, desc, accent = "from-sky-500 to-indigo-600" }) => (
  <article
    className={`group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r ${accent} text-white shadow-lg transform transition hover:-translate-y-1`}
    aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}
    role="region"
  >
    <div
      aria-hidden
      className="absolute -right-10 -top-6 w-36 h-36 rounded-full bg-white/10 blur-xl transform rotate-12"
    />
    <h3 id={title} className="text-lg font-semibold mb-2">
      {title}
    </h3>
    <p className="text-sm opacity-90 leading-relaxed">{desc}</p>

    <div className="mt-5 flex items-center gap-3 text-xs">
      <span className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.6" />
        </svg>
        Live
      </span>
      <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
        Audit-ready
      </span>
    </div>

    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
      <button className="bg-white/20 px-3 py-2 rounded-md text-white text-sm hover:bg-white/30">
        Preview
      </button>
      <button className="bg-white text-indigo-700 px-3 py-2 rounded-md text-sm font-semibold">
        Docs
      </button>
    </div>
  </article>
);

const FeatureItem = ({ title, subtitle, icon }) => (
  <div className="flex gap-4 items-start">
    <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-indigo-600 shrink-0">
      {icon}
    </div>
    <div>
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="text-xs text-slate-500">{subtitle}</div>
    </div>
  </div>
);

export default function Home() {
  const [authModal, setAuthModal] = useState(null); // "login" | "signup" | null
  const [role, setRole] = useState("citizen");
  const [demoLive, setDemoLive] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <header className="bg-gradient-to-b from-white via-sky-50 to-white pb-12">
        <div className="max-w-7xl mx-auto px-6 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
                Transparent governance. Verified on-chain.
              </h1>
              <p className="mt-4 text-slate-600 max-w-xl">
                A blockchain-backed platform to monitor contracts, tenders, project progress and
                spending in real time — built for citizens, auditors and administrators.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 items-center">
                <button
                  onClick={() => setAuthModal("signup")}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-md transition"
                >
                  Create account
                </button>

                <button
                  onClick={() => setAuthModal("login")}
                  className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2.5 rounded-lg text-slate-700 hover:shadow"
                >
                  Sign in
                </button>

                <Link to="/verify" className="ml-2 text-sm text-indigo-600 hover:underline">
                  Verify a record
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white rounded-full shadow-sm text-sm">Immutable Records</span>
                <span className="px-3 py-1 bg-white rounded-full shadow-sm text-sm">Real-time Logs</span>
                <span className="px-3 py-1 bg-white rounded-full shadow-sm text-sm">Citizen Reports</span>
              </div>
            </div>

            {/* Mock Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm font-semibold">Live Preview</div>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => setDemoLive((s) => !s)}
                      aria-pressed={demoLive}
                      className={`px-2 py-1 rounded-md text-xs ${demoLive ? "bg-emerald-100" : "bg-gray-100"}`}
                    >
                      {demoLive ? "Live" : "Paused"}
                    </button>
                    <div className="text-xs text-slate-400">demo</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-3 bg-gradient-to-r from-emerald-400 to-blue-500 transition-all"
                      style={{ width: demoLive ? "58%" : "36%" }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Avg. Project Completion</span>
                    <span className="font-medium text-slate-800">{demoLive ? "58%" : "36%"}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg text-center text-xs">
                      <div className="text-xs text-slate-400">Active</div>
                      <div className="font-semibold text-slate-800">128</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg text-center text-xs">
                      <div className="text-xs text-slate-400">Alerts</div>
                      <div className="font-semibold text-rose-500">3</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg text-center text-xs">
                      <div className="text-xs text-slate-400">Pending</div>
                      <div className="font-semibold text-amber-600">12</div>
                    </div>
                  </div>

                  <div className="mt-3 border-t pt-3 text-xs text-slate-500">
                    Latest txn: <span className="text-slate-800 font-medium">0xabc...9f3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 -mt-8">
        {/* Modules */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ModuleCard
            title="Government Data Management"
            desc="Upload and update contracts, budgets and project metadata — with full provenance and audit trails."
            accent="from-sky-500 to-indigo-600"
          />
          <ModuleCard
            title="Transparency Dashboard"
            desc="Public visualizations — charts, timelines and real-time transaction logs for everyone to inspect."
            accent="from-emerald-400 to-teal-500"
          />
          <ModuleCard
            title="Citizen Interaction"
            desc="Submit reports, flag irregularities and track follow-ups tied to transaction IDs."
            accent="from-yellow-400 to-orange-500"
          />
        </section>

        {/* SIGNUP / LOGIN - MID PAGE */}
        <section className="mt-10 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-slate-900">Join the transparency movement</h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                Create an account to follow projects, submit reports, or get audit access. Choose a role
                to preview tailored experiences (citizen, official, auditor).
              </p>

              <div className="mt-4 flex flex-wrap gap-3 items-center">
                <button
                  onClick={() => setAuthModal("signup")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
                >
                  Sign up
                </button>

                <button
                  onClick={() => setAuthModal("login")}
                  className="border border-slate-200 px-4 py-2 rounded-lg text-slate-700 hover:shadow-sm"
                >
                  Log in
                </button>

                <div className="ml-2 flex items-center gap-2">
                  <label className="text-xs text-slate-500">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                    aria-label="Select role"
                  >
                    <option value="citizen">Citizen</option>
                    <option value="official">Official</option>
                    <option value="auditor">Auditor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            <aside className="w-full lg:w-80">
              <div className="rounded-lg border p-4 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Selected role</div>
                    <div className="font-medium text-slate-900">{role}</div>
                  </div>
                  <div className="text-xs text-slate-400">Demo</div>
                </div>

                <ul className="mt-4 text-sm text-slate-600 space-y-2">
                  <li>• Follow projects & receive alerts</li>
                  <li>• Submit feedback & file reports</li>
                  <li>• Verify records on blockchain</li>
                </ul>

                <div className="mt-4">
                  <Link
                    to="/dashboard"
                    className="block text-center bg-white border border-slate-200 px-3 py-2 rounded-md hover:bg-slate-50"
                  >
                    Explore dashboard (demo)
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Platform highlights */}
        <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Platform highlights</h3>
            <p className="text-sm text-slate-600">
              Built to be auditable, resilient and usable — focus on clarity, verifiability and citizen action.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <FeatureItem
                title="Immutable Records"
                subtitle="All changes anchored on-chain for verifiable audit logs."
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 8h.01M6 16h.01M10 8h.01M10 16h.01M14 8h.01M14 16h.01M18 8h.01M18 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
              <FeatureItem
                title="Real-time Tracking"
                subtitle="Live streams of transactions and milestones for public visibility."
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 12h3l3 8 4-16 3 8h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
              <FeatureItem
                title="Smart Contracts"
                subtitle="Rule-based fund release & automated workflows."
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                }
              />
              <FeatureItem
                title="Role-based Access"
                subtitle="Tailored views for citizens, officials and auditors."
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h4 className="text-md font-semibold text-slate-900 mb-3">Recent activity (preview)</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex justify-between">
                <div>Contract #PX-001 uploaded</div>
                <div className="text-xs text-slate-400">2h ago</div>
              </li>
              <li className="flex justify-between">
                <div>Payment released for Milestone 3</div>
                <div className="text-xs text-amber-600">1d ago</div>
              </li>
              <li className="flex justify-between">
                <div>Citizen report #R-102 filed</div>
                <div className="text-xs text-rose-500">3d ago</div>
              </li>
            </ul>

            <div className="mt-4 text-xs text-slate-400">
              Demo preview only — no real data displayed on this page.
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-sm text-slate-500 pb-12">
          © {new Date().getFullYear()} Transparency Platform — Built for accountable governance
        </footer>
      </main>

      {/* AUTH MODAL (mid-page signup/login) */}
      {authModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setAuthModal(null)}
            aria-hidden
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold">{authModal === "signup" ? "Create account" : "Sign in"}</h4>
                <p className="text-xs text-slate-500 mt-1">Continue as <span className="font-medium">{role}</span></p>
              </div>
              <button aria-label="Close" className="text-slate-400 hover:text-slate-600" onClick={() => setAuthModal(null)}>
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Mock behaviour - close modal; implement auth later
                setAuthModal(null);
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="block text-xs text-slate-600">Email</label>
                <input type="email" required className="mt-1 w-full border rounded px-3 py-2 text-sm" placeholder="you@domain.com" />
              </div>

              {authModal === "signup" && (
                <div>
                  <label className="block text-xs text-slate-600">Full name</label>
                  <input type="text" required className="mt-1 w-full border rounded px-3 py-2 text-sm" placeholder="Your name" />
                </div>
              )}

              <div>
                <label className="block text-xs text-slate-600">Password</label>
                <input type="password" required className="mt-1 w-full border rounded px-3 py-2 text-sm" placeholder="••••••••" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input id="remember" type="checkbox" className="h-4 w-4" defaultChecked />
                  <label htmlFor="remember" className="text-xs text-slate-500">Remember</label>
                </div>

                <div className="text-xs text-indigo-600">Forgot?</div>
              </div>

              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md">
                  {authModal === "signup" ? "Create account" : "Sign in"}
                </button>
                <button type="button" onClick={() => setAuthModal(authModal === "signup" ? "login" : "signup")} className="flex-1 border rounded-md px-4 py-2">
                  {authModal === "signup" ? "Already have an account?" : "Create account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
