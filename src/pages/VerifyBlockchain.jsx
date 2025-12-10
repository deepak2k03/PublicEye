// src/pages/VerifyBlockchain.jsx
import React, { useState } from "react";

/**
 * VerifyBlockchain page (frontend-only, mock verification)
 * - Input a record ID or transaction hash
 * - Simulate a verification call with loading state
 * - Show verification result (valid / not found / tampered) with details
 * - Show recent verifications (mock history) and an audit trail timeline
 * - Allow copying hash and viewing a mock "block explorer" link
 *
 * Tailwind CSS is used for styling. No external libraries required.
 */

const MOCK_DB = {
  // mock records keyed by id/hash
  "0xabc123": {
    id: "0xabc123",
    projectTitle: "Smart City Development - Phase 2",
    recordedAt: "2024-08-01T10:24:00Z",
    txHash: "0xabc123",
    blockNumber: 18871245,
    status: "VALID",
    issuedBy: "Ministry of Urban Development",
    notes: "Initial milestone recorded: site survey completed.",
  },
  "0xdeadbeef": {
    id: "0xdeadbeef",
    projectTitle: "Rural Broadband Expansion",
    recordedAt: "2024-09-12T08:15:00Z",
    txHash: "0xdeadbeef",
    blockNumber: 19000222,
    status: "TAMPERED",
    issuedBy: "Department of Telecommunications",
    notes: "Mismatch detected between on-chain summary and submitted document.",
  },
};

const RECENT_HISTORY = [
  {
    id: "0xabc123",
    project: "Smart City Development - Phase 2",
    when: "2 days ago",
    result: "VALID",
  },
  {
    id: "0xfeedcafe",
    project: "Green Energy Program",
    when: "5 days ago",
    result: "NOT_FOUND",
  },
  {
    id: "0xdeadbeef",
    project: "Rural Broadband Expansion",
    when: "9 days ago",
    result: "TAMPERED",
  },
];

export default function VerifyBlockchain() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // null | { ... }
  const [error, setError] = useState("");

  function reset() {
    setResult(null);
    setError("");
  }

  async function handleVerify(e) {
    e.preventDefault();
    reset();

    const query = input.trim();
    if (!query) {
      setError("Enter a transaction hash or record ID to verify.");
      return;
    }

    setLoading(true);

    // Simulate network latency & verification logic
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 800));

    // Simplified matching: normalize to lowercase
    const key = query.toLowerCase();
    const record = MOCK_DB[key];

    if (!record) {
      setResult({
        found: false,
        txHash: query,
      });
    } else {
      // build mock verification metadata
      setResult({
        found: true,
        ...record,
        confirmations: Math.floor(10 + Math.random() * 150),
        verifiedOn: new Date().toISOString(),
      });
    }

    setLoading(false);
  }

  function copyToClipboard(text) {
    if (!navigator?.clipboard) return alert("Clipboard API not supported.");
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // subtle UX: temporary visual feedback could be added
        alert("Copied to clipboard");
      })
      .catch(() => alert("Failed to copy"));
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Blockchain Verification
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Verify a project record or transaction hash to confirm its authenticity. Enter a
            transaction hash or record ID below — the UI simulates a blockchain verification check
            and shows an audit trail and recent verifications.
          </p>
        </header>

        {/* Main panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Verification Card */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <form onSubmit={handleVerify} className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Record ID / Tx Hash</label>
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g. 0xabc123 or 0xYourTransactionHash"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </form>

            {/* Result area */}
            <div className="mt-6">
              {!result && (
                <div className="rounded-lg border border-dashed border-gray-200 p-6 text-gray-500">
                  Enter a record ID or hash and click <span className="font-semibold">Verify</span> to
                  see the verification result.
                </div>
              )}

              {result && !result.found && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-yellow-700">Not Found</p>
                      <p className="text-sm text-yellow-800 mt-1">
                        We could not find this record on the mock blockchain. It might not be
                        recorded or the hash is incorrect.
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        Queried: <span className="font-mono">{result.txHash}</span>
                      </p>
                    </div>
                    <div>
                      {/* Mock explorer link */}
                      <a
                        href={`/mock-explorer/tx/${encodeURIComponent(result.txHash)}`}
                        className="inline-block px-4 py-2 bg-yellow-600 text-white rounded-md"
                        onClick={(e) => e.preventDefault()}
                        title="Open mock block explorer"
                      >
                        View on Explorer
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {result && result.found && (
                <div className="rounded-2xl border border-green-100 bg-white p-6 mt-4 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {result.projectTitle}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">{result.notes}</p>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500">Transaction Hash</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-mono text-sm">{result.txHash}</span>
                            <button
                              onClick={() => copyToClipboard(result.txHash)}
                              className="text-xs px-2 py-1 bg-gray-100 rounded ml-2"
                            >
                              Copy
                            </button>
                          </div>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500">Block Number</p>
                          <p className="mt-1 font-medium">{result.blockNumber}</p>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500">Confirmations</p>
                          <p className="mt-1 font-medium">{result.confirmations}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          result.status === "VALID"
                            ? "bg-green-100 text-green-800"
                            : result.status === "TAMPERED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {result.status}
                      </div>

                      <a
                        href={`/mock-explorer/tx/${encodeURIComponent(result.txHash)}`}
                        onClick={(e) => e.preventDefault()}
                        className="text-xs text-blue-600 underline"
                      >
                        Open in Block Explorer (mock)
                      </a>

                      <div className="w-28 h-28 bg-gray-50 rounded-md flex items-center justify-center">
                        {/* simple QR placeholder */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="64"
                          height="64"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-gray-400"
                        >
                          <rect x="3" y="3" width="7" height="7" />
                          <rect x="14" y="3" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" />
                          <rect x="8" y="8" width="2" height="2" />
                          <rect x="11" y="11" width="2" height="2" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Audit timeline */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Audit Trail</h3>
                    <ol className="border-l-2 border-gray-100">
                      {/* mock timeline items */}
                      <li className="mb-6 ml-6">
                        <div className="absolute -left-3 mt-1 w-6 h-6 rounded-full bg-green-600"></div>
                        <p className="text-sm text-gray-700 font-semibold">Recorded on-chain</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(result.recordedAt).toLocaleString()}
                        </p>
                      </li>

                      <li className="mb-6 ml-6">
                        <div className="absolute -left-3 mt-1 w-6 h-6 rounded-full bg-gray-300"></div>
                        <p className="text-sm text-gray-700 font-semibold">Verified by Auditor</p>
                        <p className="text-xs text-gray-500 mt-1">Auditor: National Audit Office</p>
                      </li>

                      <li className="mb-6 ml-6">
                        <div
                          className={`absolute -left-3 mt-1 w-6 h-6 rounded-full ${
                            result.status === "TAMPERED" ? "bg-red-600" : "bg-gray-300"
                          }`}
                        ></div>
                        <p className="text-sm text-gray-700 font-semibold">
                          {result.status === "TAMPERED"
                            ? "Tamper detected"
                            : "No anomalies detected"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {result.status === "TAMPERED"
                            ? "Hash mismatch between submitted doc and on-chain summary."
                            : "On-chain record matches submitted metadata."}
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Right: Recent verifications + quick tools */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent verifications</h3>
              <ul className="space-y-3">
                {RECENT_HISTORY.map((h) => (
                  <li
                    key={h.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">{h.project}</p>
                      <p className="text-xs text-gray-500">{h.when}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        h.result === "VALID"
                          ? "bg-green-100 text-green-800"
                          : h.result === "TAMPERED"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {h.result}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Tools</h3>
              <div className="flex flex-col gap-3">
                <button
                  className="w-full px-3 py-2 border border-gray-200 rounded hover:bg-gray-50 text-sm text-gray-700"
                  onClick={() => {
                    // fill input with a valid mock hash to demo quickly
                    const el = document.querySelector('input[placeholder^="e.g."]');
                    if (el) el.value = "0xabc123";
                    setInput("0xabc123");
                    setResult(null);
                    setError("");
                  }}
                >
                  Load demo: valid record
                </button>

                <button
                  className="w-full px-3 py-2 border border-gray-200 rounded hover:bg-gray-50 text-sm text-gray-700"
                  onClick={() => {
                    setInput("0xdeadbeef");
                    setResult(null);
                    setError("");
                  }}
                >
                  Load demo: tampered record
                </button>

                <button
                  className="w-full px-3 py-2 border border-gray-200 rounded hover:bg-gray-50 text-sm text-gray-700"
                  onClick={() => {
                    setInput("0xnotfound");
                    setResult(null);
                    setError("");
                  }}
                >
                  Load demo: not found
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Notes</h3>
              <p className="text-xs text-gray-600">
                This page is frontend-only. Replace mock verification with a backend call to your
                blockchain node or explorer API (e.g. Etherscan, Infura) to perform real checks.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
