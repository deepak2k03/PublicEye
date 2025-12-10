import React, { useState } from "react";

/**
 * Modern dynamic report page (src/pages/Report.jsx)
 * - Domain selection drives fields
 * - Severity slider + visual
 * - Optional location + attachment (mock)
 * - Confirmation modal before final submit
 */

const domains = {
  Infrastructure: ["Project Name", "Location", "Issue Description"],
  Health: ["Hospital/Clinic Name", "Issue Description", "Patient Impact"],
  Education: ["School/College Name", "Issue Description", "Affected Students"],
  Finance: ["Department/Program", "Issue Description", "Financial Impact"],
  Other: ["Title", "Description"],
};

export default function Report() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [formData, setFormData] = useState({});
  const [severity, setSeverity] = useState(3);
  const [attachment, setAttachment] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const startDomain = (d) => {
    setSelectedDomain(d);
    const fd = {};
    domains[d]?.forEach((f) => (fd[f] = ""));
    setFormData(fd);
  };

  const handleChange = (f, v) => setFormData({ ...formData, [f]: v });

  const handleFile = (e) => setAttachment(e.target.files?.[0] || null);

  const canSubmit = selectedDomain && Object.values(formData).every((v) => v && v.trim().length > 0);

  const submit = () => {
    // mock submit action
    console.log("Report submitted:", { domain: selectedDomain, severity, attachmentName: attachment?.name, ...formData });
    setSubmitted(true);
    setConfirmOpen(false);
    // reset after small delay
    setTimeout(() => {
      setSelectedDomain("");
      setFormData({});
      setSeverity(3);
      setAttachment(null);
      setSubmitted(false);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Submit a Report</h2>
          <p className="text-sm text-gray-500 mb-4">Select the domain that best fits the issue and provide details. Reports are reviewed by the authorities.</p>

          {/* domain quick buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(domains).map((d) => (
              <button key={d} onClick={() => startDomain(d)} className={`px-3 py-2 rounded-md text-sm ${selectedDomain === d ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                {d}
              </button>
            ))}
          </div>

          {/* dynamic form */}
          {!selectedDomain ? (
            <div className="py-12 text-center text-sm text-slate-500">Choose a domain above to start the report.</div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setConfirmOpen(true); }} className="space-y-4">
              {domains[selectedDomain].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>

                  {(field === "Issue Description" || field === "Description" || field.includes("Impact")) ? (
                    <textarea value={formData[field] || ""} onChange={(e) => handleChange(field, e.target.value)} rows="4" className="w-full border rounded px-3 py-2 text-sm" required />
                  ) : (
                    <input value={formData[field] || ""} onChange={(e) => handleChange(field, e.target.value)} className="w-full border rounded px-3 py-2 text-sm" required />
                  )}
                </div>
              ))}

              {/* severity slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                <div className="flex items-center gap-4">
                  <input type="range" min="1" max="5" value={severity} onChange={(e) => setSeverity(Number(e.target.value))} />
                  <div className="text-sm font-semibold">
                    {["Low","Moderate","Elevated","High","Critical"][severity - 1]}
                  </div>
                </div>
              </div>

              {/* location & attachment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Location (optional)</label>
                  <input placeholder="City, district or coordinates" className="w-full border rounded px-3 py-2 text-sm" onChange={(e)=>handleChange("Location", e.target.value)} value={formData["Location"] || ""} />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Attachment (photo)</label>
                  <input type="file" onChange={handleFile} className="text-sm" />
                  {attachment && <div className="text-xs text-slate-600 mt-1">{attachment.name}</div>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button type="submit" disabled={!canSubmit} className={`px-4 py-2 rounded ${canSubmit ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}>
                  Submit Report
                </button>
                <button type="button" onClick={() => { setSelectedDomain(""); setFormData({}); setAttachment(null); }} className="px-4 py-2 border rounded">Cancel</button>
                <div className="ml-auto text-sm text-slate-500">Required: all dynamic fields</div>
              </div>
            </form>
          )}
        </div>

        {/* confirmation modal */}
        {confirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={()=>setConfirmOpen(false)} />
            <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
              <h3 className="font-semibold text-lg">Confirm submission</h3>
              <p className="text-sm text-slate-600 mt-2">You are about to submit this report. Are you sure?</p>

              <div className="mt-4 flex gap-2 justify-end">
                <button onClick={()=>setConfirmOpen(false)} className="px-3 py-2 border rounded">Edit</button>
                <button onClick={submit} className="px-4 py-2 bg-red-600 text-white rounded">Yes, submit</button>
              </div>
            </div>
          </div>
        )}

        {/* submitted toast */}
        {submitted && (
          <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow p-4 text-sm">
            <div className="text-green-700 font-semibold">Report submitted</div>
            <div className="text-xs text-slate-500">Thanks — officials will review it.</div>
          </div>
        )}
      </div>
    </div>
  );
}
