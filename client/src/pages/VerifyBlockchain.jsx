
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  AlertOctagon, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  Box,
  Hash,
  Terminal,
  Activity
} from "lucide-react";

// --- MOCK DB ---
const MOCK_DB = {
  "0xabc123": {
    id: "0xabc123",
    projectTitle: "Smart City Development - Phase 2",
    recordedAt: "2024-08-01T10:24:00Z",
    txHash: "0x7a9f...b2c1",
    blockNumber: 18871245,
    status: "VALID",
    issuedBy: "Ministry of Urban Development",
    notes: "Initial milestone recorded: site survey completed.",
  },
  "0xdeadbeef": {
    id: "0xdeadbeef",
    projectTitle: "Rural Broadband Expansion",
    recordedAt: "2024-09-12T08:15:00Z",
    txHash: "0xdead...beef",
    blockNumber: 19000222,
    status: "TAMPERED",
    issuedBy: "Department of Telecommunications",
    notes: "Mismatch detected between on-chain summary and submitted document.",
  },
};

const RECENT_HISTORY = [
  { id: "0xabc...123", project: "Smart City Phase 2", when: "2m ago", result: "VALID" },
  { id: "0xfee...afe", project: "Green Energy Grid", when: "1h ago", result: "NOT_FOUND" },
  { id: "0xdea...eef", project: "Rural Broadband", when: "3h ago", result: "TAMPERED" },
];

/**
 * --- COMPONENTS ---
 */

const StatusBadge = ({ status }) => {
  const styles = {
    VALID: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    TAMPERED: "bg-red-500/10 text-red-400 border-red-500/20",
    NOT_FOUND: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };
  
  const icons = {
    VALID: <ShieldCheck className="w-3 h-3" />,
    TAMPERED: <ShieldAlert className="w-3 h-3" />,
    NOT_FOUND: <AlertOctagon className="w-3 h-3" />,
  };

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {icons[status]}
      {status}
    </div>
  );
};

// Spotlight Card
const GlassPanel = ({ children, className = "" }) => (
  <div className={`bg-slate-900/60 backdrop-blur-xl border border-white/5 shadow-xl ${className}`}>
    {children}
  </div>
);

export default function VerifyBlockchain() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [scanProgress, setScanProgress] = useState(0);

  const handleVerify = async (e) => {
    e.preventDefault();
    setResult(null);
    setError("");
    setScanProgress(0);

    const query = input.trim();
    if (!query) {
      setError("Please enter a valid Transaction Hash or Record ID.");
      return;
    }

    setLoading(true);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => Math.min(prev + Math.random() * 10, 90));
    }, 100);

    await new Promise((r) => setTimeout(r, 1500));
    clearInterval(interval);
    setScanProgress(100);

    const key = query.toLowerCase();
    const record = MOCK_DB[key];

    if (!record) {
      setResult({ found: false, txHash: query });
    } else {
      setResult({
        found: true,
        ...record,
        confirmations: Math.floor(10 + Math.random() * 150),
        verifiedOn: new Date().toISOString(),
      });
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Add toast logic here
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-12">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-6">
            <Activity className="w-3 h-3 animate-pulse" />
            LIVE VERIFICATION NODE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Verify Record Authenticity
          </h1>
          <p className="text-slate-500 max-w-2xl text-lg">
            Cryptographically verify any government contract or permit by querying the Polygon ledger directly.
          </p>
        </div>

        {/* --- MAIN INTERFACE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: SCANNER */}
          <div className="lg:col-span-2 space-y-6">
            <GlassPanel className="p-1 rounded-2xl">
              <div className="bg-slate-950/50 rounded-xl p-6 sm:p-8">
                <form onSubmit={handleVerify} className="relative">
                  <div className="relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-slate-500" />
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Enter Record ID (e.g., 0xabc123) or Tx Hash..."
                      className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-12 pr-32 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="absolute right-2 top-2 bottom-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Scanning..." : "Verify"}
                    </button>
                  </div>
                  
                  {/* Loading Bar */}
                  {loading && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 rounded-b-xl overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${scanProgress}%` }}
                        className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                      />
                    </div>
                  )}
                </form>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2"
                  >
                    <AlertOctagon className="w-4 h-4" /> {error}
                  </motion.div>
                )}
              </div>
            </GlassPanel>

            {/* RESULTS AREA */}
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {result.found ? (
                    <GlassPanel className="rounded-2xl overflow-hidden border-t-4 border-t-emerald-500">
                      {/* Result Header */}
                      <div className="p-6 border-b border-white/5 flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-bold text-white">{result.projectTitle}</h2>
                            <StatusBadge status={result.status} />
                          </div>
                          <p className="text-sm text-slate-400">{result.notes}</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-slate-500 uppercase tracking-widest">Confirmations</p>
                          <p className="text-2xl font-mono text-white font-bold">{result.confirmations}</p>
                        </div>
                      </div>

                      {/* Technical Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                        <div className="bg-slate-900/50 p-6 hover:bg-slate-900/80 transition-colors group">
                          <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs uppercase tracking-wider">
                            <Hash className="w-3 h-3" /> Transaction Hash
                          </div>
                          <div className="flex items-center justify-between">
                            <code className="text-sm text-cyan-400 font-mono truncate mr-4">{result.txHash}</code>
                            <button onClick={() => copyToClipboard(result.txHash)} className="text-slate-500 hover:text-white transition-colors">
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 p-6 hover:bg-slate-900/80 transition-colors">
                          <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs uppercase tracking-wider">
                            <Box className="w-3 h-3" /> Block Height
                          </div>
                          <div className="text-sm text-white font-mono">#{result.blockNumber}</div>
                        </div>

                        <div className="bg-slate-900/50 p-6 hover:bg-slate-900/80 transition-colors">
                          <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs uppercase tracking-wider">
                            <CheckCircle2 className="w-3 h-3" /> Issuer
                          </div>
                          <div className="text-sm text-white">{result.issuedBy}</div>
                        </div>

                        <div className="bg-slate-900/50 p-6 hover:bg-slate-900/80 transition-colors">
                          <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs uppercase tracking-wider">
                            <Clock className="w-3 h-3" /> Timestamp
                          </div>
                          <div className="text-sm text-white">{new Date(result.verifiedOn).toLocaleString()}</div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="p-4 bg-slate-950/30 flex justify-end gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
                          <Download className="w-3 h-3" /> Download Proof
                        </button>
                        <a 
                          href="#" 
                          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded transition-colors"
                        >
                          View on Etherscan <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </GlassPanel>
                  ) : (
                    // NOT FOUND STATE
                    <GlassPanel className="p-8 text-center border-t-4 border-t-amber-500">
                      <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500">
                        <AlertOctagon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Record Not Found</h3>
                      <p className="text-slate-400 max-w-md mx-auto mb-6">
                        The transaction hash <span className="font-mono text-amber-400">{result.txHash}</span> could not be located on the current network.
                      </p>
                      <button 
                        onClick={() => setInput("")}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        Try Another ID
                      </button>
                    </GlassPanel>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: HISTORY & TOOLS */}
          <aside className="space-y-6">
            
            {/* Recent History */}
            <GlassPanel className="p-5 rounded-2xl">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Terminal className="w-3 h-3" /> Recent Queries
              </h3>
              <div className="space-y-1">
                {RECENT_HISTORY.map((h, i) => (
                  <div key={i} className="group p-3 rounded-lg hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/5">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-mono text-cyan-500">{h.id}</span>
                      <span className="text-[10px] text-slate-600">{h.when}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300 font-medium">{h.project}</span>
                      <StatusBadge status={h.result} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>

            {/* Quick Demo Tools */}
            <div className="p-5 rounded-2xl border border-dashed border-slate-800 bg-white/[0.02]">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Debug Tools</h4>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => { setInput("0xabc123"); }}
                  className="text-left px-3 py-2 text-xs font-mono text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 rounded transition-colors"
                >
                  Load Valid Hash
                </button>
                <button 
                  onClick={() => { setInput("0xdeadbeef"); }}
                  className="text-left px-3 py-2 text-xs font-mono text-red-400 bg-red-500/5 hover:bg-red-500/10 rounded transition-colors"
                >
                  Load Tampered Hash
                </button>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}

// Helper icon
const Download = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);

