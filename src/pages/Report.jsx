import React, { useState } from "react";

export default function DynamicReportForm() {
  const domains = {
    Infrastructure: ["Project Name", "Location", "Issue Description", "Severity"],
    Health: ["Hospital/Clinic Name", "Issue Description", "Patient Impact"],
    Education: ["School/College Name", "Issue Description", "Affected Students"],
    Finance: ["Department/Program", "Issue Description", "Financial Impact"],
    Other: ["Title", "Description"],
  };

  const [selectedDomain, setSelectedDomain] = useState("");
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleDomainChange = (e) => {
    const domain = e.target.value;
    setSelectedDomain(domain);

    // Initialize formData with empty strings for all fields in this domain
    const newFormData = {};
    domains[domain]?.forEach((field) => {
      newFormData[field] = "";
    });
    setFormData(newFormData);
  };

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dynamic report submitted:", { domain: selectedDomain, ...formData });
    setSubmitted(true);
    setSelectedDomain("");
    setFormData({});
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Submit a Report
        </h2>

        {submitted && (
          <p className="text-green-700 font-semibold mb-4 text-center">
            Thank you! Your report has been submitted.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Domain Selector */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Domain / Category</label>
            <select
              value={selectedDomain}
              onChange={handleDomainChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
            >
              <option value="">Select Domain</option>
              {Object.keys(domains).map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Fields */}
          {selectedDomain &&
            domains[selectedDomain].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium mb-1">{field}</label>
                {field === "Issue Description" || field === "Description" || field === "Patient Impact" || field === "Financial Impact" ? (
                  <textarea
                    value={formData[field]}
                    onChange={(e) => handleChange(e, field)}
                    rows="4"
                    placeholder={`Enter ${field}`}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    required
                  ></textarea>
                ) : (
                  <input
                    type="text"
                    value={formData[field]}
                    onChange={(e) => handleChange(e, field)}
                    placeholder={`Enter ${field}`}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                    required
                  />
                )}
              </div>
            ))}

          {/* Submit Button */}
          {selectedDomain && (
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Submit Report
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
