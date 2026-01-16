// src/pages/Report.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  MapPin, 
  Camera, 
  UploadCloud, 
  Shield, 
  CheckCircle2, 
  FileWarning, 
  Construction,
  Droplets,
  Zap,
  Trash2,
  X
} from "lucide-react";

const CATEGORIES = [
  { id: "roads", label: "Roads & Transport", icon: <Construction className="w-6 h-6" />, color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { id: "water", label: "Water Supply", icon: <Droplets className="w-6 h-6" />, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { id: "electricity", label: "Power Grid", icon: <Zap className="w-6 h-6" />, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { id: "corruption", label: "Corruption/Bribery", icon: <FileWarning className="w-6 h-6" />, color: "text-red-400 bg-red-500/10 border-red-500/20" },
];

export default function Report() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    description: "",
    isAnonymous: false,
    files: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    // Mock file add
    setFormData(prev => ({ ...prev, files: [...prev.files, "evidence_photo.jpg"] }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-slate-900/50 border border-emerald-500/30 rounded-3xl p-8 text-center backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-emerald-500/5 z-0" />
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 relative z-10">Report Filed</h2>
          <p className="text-slate-400 mb-8 relative z-10">
            Your report ID is <span className="font-mono text-emerald-400">#RPT-8291</span>. <br/>
            {formData.isAnonymous ? "You chose to remain anonymous." : "We will notify you of updates."}
          </p>
          <button 
            onClick={() => { setSubmitted(false); setFormData({ category: "", location: "", description: "", isAnonymous: false, files: [] }); }}
            className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-emerald-400 transition-colors relative z-10"
          >
            File Another Report
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 mb-4">
            <AlertTriangle className="w-3 h-3" /> WHISTLEBLOWER PORTAL
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Report an Issue
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Help us maintain integrity. Report infrastructure failures, delays, or corruption securely. 
            All reports are cryptographically hashed for immutability.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Category Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Select Issue Category</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${
                      formData.category === cat.id 
                        ? `${cat.color} ring-1 ring-white/20 scale-[1.02]` 
                        : "bg-slate-950/50 border-white/5 text-slate-500 hover:bg-slate-900 hover:border-white/10"
                    }`}
                  >
                    {cat.icon}
                    <span className="text-xs font-bold text-center">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 2. Location & Details */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all"
                      placeholder="e.g., Sector 62 Main Road"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                  <textarea 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all h-32 resize-none"
                    placeholder="Describe the issue in detail..."
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              {/* 3. Evidence Upload */}
              <div className="space-y-6">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Evidence (Photos/Docs)</label>
                    <div 
                      onClick={handleFileDrop}
                      className="w-full h-full min-h-[160px] border-2 border-dashed border-white/10 rounded-xl bg-slate-950/30 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group"
                    >
                      {formData.files.length > 0 ? (
                        <div className="space-y-2 w-full px-8">
                          {formData.files.map((file, i) => (
                            <div key={i} className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-white/10">
                              <div className="flex items-center gap-2 text-sm text-white">
                                <Camera className="w-4 h-4 text-cyan-400" /> {file}
                              </div>
                              <button type="button" onClick={(e) => { e.stopPropagation(); setFormData(p => ({...p, files: []}))}}>
                                <X className="w-4 h-4 text-slate-500 hover:text-red-400" />
                              </button>
                            </div>
                          ))}
                          <p className="text-xs text-center text-slate-500 mt-2">+ Add more files</p>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-cyan-400" />
                          </div>
                          <p className="text-sm text-slate-400 font-medium">Click to upload or drag & drop</p>
                          <p className="text-xs text-slate-600 mt-1">JPG, PNG, PDF up to 10MB</p>
                        </>
                      )}
                    </div>
                 </div>
              </div>
            </div>

            {/* 4. Footer Actions */}
            <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Privacy Toggle */}
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setFormData({...formData, isAnonymous: !formData.isAnonymous})}
              >
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.isAnonymous ? "bg-emerald-500" : "bg-slate-700"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${formData.isAnonymous ? "translate-x-6" : "translate-x-0"}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className={`w-4 h-4 ${formData.isAnonymous ? "text-emerald-400" : "text-slate-400"}`} />
                    Submit Anonymously
                  </p>
                  <p className="text-xs text-slate-500">Your identity will be hidden on the public ledger.</p>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Encrypting Data..." : "Submit Report"}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}