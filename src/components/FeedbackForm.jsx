// src/components/FeedbackForm.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const sampleProjects = [
  "Smart City Development",
  "Rural Broadband Expansion",
  "Green Energy Program",
  "Healthcare Infrastructure Upgrade",
  "Water Supply Modernization",
];

const RatingLabel = ({ value }) => {
  if (!value) return "No rating";
  if (value >= 5) return "Excellent";
  if (value >= 4) return "Very good";
  if (value >= 3) return "Good";
  if (value >= 2) return "Fair";
  return "Poor";
};

export default function FeedbackForm() {
  const location = useLocation();
  const prefillProject = location.state?.projectName || "";

  const [form, setForm] = useState({
    projectName: prefillProject || "",
    name: "",
    email: "",
    rating: 0,
    anonymous: false,
    message: "",
    attachment: null,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setCharCount(form.message.length);
  }, [form.message]);

  useEffect(() => {
    // when route provides prefill, update form
    if (prefillProject) setForm((s) => ({ ...s, projectName: prefillProject }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillProject]);

  const validate = () => {
    const err = {};
    if (!form.projectName) err.projectName = "Please select a project";
    if (!form.name && !form.anonymous) err.name = "Please enter your name or mark anonymous";
    if (!form.email && !form.anonymous) err.email = "Email required for follow-up";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Please enter a valid email";
    if (!form.rating) err.rating = "Please provide a rating";
    if (!form.message || form.message.trim().length < 10) err.message = "Please enter at least 10 characters";
    if (form.message.length > 1000) err.message = "Message exceeds maximum length (1000)";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((s) => ({ ...s, [name]: checked }));
      if (name === "anonymous" && checked) {
        // clear name/email errors
        setErrors((p) => {
          const copy = { ...p };
          delete copy.name;
          delete copy.email;
          return copy;
        });
      }
      return;
    }
    if (type === "file") {
      setForm((s) => ({ ...s, attachment: files && files[0] ? files[0] : null }));
      return;
    }
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleStarClick = (v) => {
    setForm((s) => ({ ...s, rating: v }));
    setErrors((p) => {
      const copy = { ...p };
      delete copy.rating;
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // Mock API delay
    setTimeout(() => {
      const ticketId = `RPT-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
      const payload = {
        ...form,
        ticketId,
        submittedAt: new Date().toISOString(),
        attachmentName: form.attachment ? form.attachment.name : null,
      };

      // reset (preserve project selection for convenience)
      setSubmittedData(payload);
      setForm((s) => ({
        projectName: s.projectName,
        name: "",
        email: "",
        rating: 0,
        anonymous: s.anonymous,
        message: "",
        attachment: null,
      }));
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSubmitting(false);
      setErrors({});
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-semibold text-gray-800">Submit Feedback / Report</h2>
            <p className="mt-2 text-sm text-gray-500">
              Tell us about project issues, irregularities or suggestions. Reports are logged and can be
              audited. (This is a demo — no data is sent.)
            </p>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
              {/* Project */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Project</label>
                <select
                  name="projectName"
                  value={form.projectName}
                  onChange={handleChange}
                  className={`mt-2 block w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.projectName ? "border-rose-400" : "border-gray-200"
                  }`}
                >
                  <option value="">— Select project —</option>
                  {prefillProject && <option value={prefillProject}>{prefillProject} (prefill)</option>}
                  {sampleProjects.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {errors.projectName && <div className="mt-1 text-rose-600 text-xs">{errors.projectName}</div>}
              </div>

              {/* Name / Email / anonymous */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={form.anonymous}
                    placeholder={form.anonymous ? "Anonymous reporting" : "Full name"}
                    className={`mt-2 block w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
                      errors.name ? "border-rose-400 focus:ring-rose-200" : "border-gray-200 focus:ring-indigo-200"
                    }`}
                  />
                  {errors.name && <div className="mt-1 text-rose-600 text-xs">{errors.name}</div>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={form.anonymous}
                    placeholder={form.anonymous ? "Optional (anonymous)" : "you@domain.com"}
                    className={`mt-2 block w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
                      errors.email ? "border-rose-400 focus:ring-rose-200" : "border-gray-200 focus:ring-indigo-200"
                    }`}
                  />
                  {errors.email && <div className="mt-1 text-rose-600 text-xs">{errors.email}</div>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="anon"
                  name="anonymous"
                  type="checkbox"
                  checked={form.anonymous}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label htmlFor="anon" className="text-sm text-gray-600">
                  Submit anonymously
                </label>
              </div>

              {/* Rating */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <div className="text-xs text-gray-500">{form.rating ? <RatingLabel value={form.rating} /> : "No rating"}</div>
                </div>

                <div className="mt-2 flex items-center gap-2" role="radiogroup" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => handleStarClick(v)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") handleStarClick(v);
                      }}
                      aria-pressed={form.rating === v}
                      className={`rounded px-2 py-1 text-lg transition ${
                        form.rating >= v ? "text-amber-400" : "text-gray-300 hover:text-amber-300"
                      } focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {errors.rating && <div className="mt-1 text-rose-600 text-xs">{errors.rating}</div>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Feedback / Report</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  maxLength={1000}
                  placeholder="Describe the issue or suggestion. Add transaction IDs, locations or evidence where possible."
                  className={`mt-2 block w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                    errors.message ? "border-rose-400 focus:ring-rose-200" : "border-gray-200 focus:ring-indigo-200"
                  }`}
                />
                <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                  <div>{errors.message ? <span className="text-rose-600">{errors.message}</span> : "Please be as specific as possible."}</div>
                  <div>{charCount}/1000</div>
                </div>
              </div>

              {/* Attachment */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Attach evidence (optional)</label>
                <div className="mt-2 flex items-center gap-3">
                  <label
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-gray-200 cursor-pointer text-sm"
                    aria-hidden
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="attachment"
                      accept=".png,.jpg,.jpeg,.pdf,.docx"
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="text-sm text-gray-700">Choose file</span>
                  </label>

                  <div className="text-sm text-gray-600">
                    {form.attachment ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M16.5 6.5L7.5 15.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {form.attachment.name}
                      </span>
                    ) : (
                      "No file chosen"
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit feedback"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      projectName: prefillProject || "",
                      name: "",
                      email: "",
                      rating: 0,
                      anonymous: false,
                      message: "",
                      attachment: null,
                    })
                  }
                  className="px-4 py-2 rounded-lg border border-gray-200"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Right panel: help + recent submission preview */}
          <div className="bg-slate-50 border-t md:border-t-0 md:border-l px-6 py-5">
            <h4 className="text-sm font-semibold text-gray-800">How to make a helpful report</h4>
            <ul className="mt-3 text-sm text-gray-600 space-y-2">
              <li>• Include transaction IDs or contract references when possible.</li>
              <li>• Attach photos, PDFs or screenshots as evidence.</li>
              <li>• Be specific about date, location and department.</li>
            </ul>

            <div className="mt-6">
              <h5 className="text-sm font-medium text-gray-700">Recent submission (demo)</h5>
              {submittedData ? (
                <div className="mt-3 bg-white p-3 rounded-lg shadow-sm text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs text-gray-500">Ticket</div>
                      <div className="font-medium text-gray-800">{submittedData.ticketId}</div>
                    </div>
                    <div className="text-xs text-gray-400">{new Date(submittedData.submittedAt).toLocaleString()}</div>
                  </div>

                  <div className="mt-3 text-gray-700">
                    <div className="text-xs text-gray-500">Project</div>
                    <div className="font-medium">{submittedData.projectName}</div>

                    <div className="mt-2 text-xs text-gray-500">Message</div>
                    <div className="text-sm text-gray-700">{submittedData.message || "—"}</div>

                    {submittedData.attachmentName && (
                      <div className="mt-2 text-xs text-gray-500">Attachment</div>
                    )}
                    {submittedData.attachmentName && (
                      <div className="text-sm text-gray-700">{submittedData.attachmentName}</div>
                    )}

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => navigator.clipboard?.writeText(submittedData.ticketId)}
                        className="px-2 py-1 rounded bg-slate-100 text-sm"
                      >
                        Copy ticket
                      </button>
                      <button
                        onClick={() => setSubmittedData(null)}
                        className="px-2 py-1 rounded border text-sm"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-3 text-sm text-gray-500">No recent submissions</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
