import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ethers } from "ethers";
import { 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Activity, 
  Calendar, 
  Wallet, 
  ArrowLeft,
  AlertCircle,
  FileText,
  Clock,
  ExternalLink,
  Lock
} from "lucide-react";

// --- BLOCKCHAIN CONFIGURATION ---
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
const CONTRACT_ABI = [
  "function createProject(uint256 _id, string memory _title, uint256 _budget) public",
  "function verifyAndRelease(uint256 _id) public",
];

// The public address of Account #0 from your Hardhat terminal
const ADMIN_WALLET_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1596079890744-1c671d4bfa0c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=1200&auto=format&fit=crop",
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumSignificantDigits: 3
  }).format(amount);
};

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // --- 1. ADMIN ACCESS CHECK ---
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setIsAdmin(accounts[0].toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase());
          }
        } catch (err) {
          console.error("Error checking wallet address:", err);
        }
      }
    };

    checkAdminStatus();

    // Re-check status if user switches accounts in MetaMask
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setIsAdmin(accounts[0].toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase());
        } else {
          setIsAdmin(false);
        }
      });
    }
  }, []);

  // --- 2. FETCH PROJECT DATA ---
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        const data = await res.json();
        const found = data.find((p) => p._id === id);
        
        if (found) {
          const enriched = {
            ...found,
            image: PROJECT_IMAGES[found._id.charCodeAt(found._id.length - 1) % PROJECT_IMAGES.length],
            spent: found.budget * (found.fundsReleased ? 0.9 : 0.4),
            progress: found.fundsReleased ? 100 : found.status === 'In Progress' ? 65 : 10,
            milestones: generateMilestones(found),
            timeline: generateTimeline(found)
          };
          setProject(enriched);
        } else {
          setError("Project not found");
        }
      } catch (err) {
        setError("Failed to load project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  // --- 3. HANDLE BLOCKCHAIN VERIFICATION (ADMIN ONLY) ---
  const handleVerify = async () => {
    if (!isAdmin) {
      alert("Unauthorized: Only the designated Admin wallet can verify projects.");
      return;
    }

    setIsVerifying(true);
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected! Please install the extension.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const numericId = parseInt(id.substring(id.length - 8), 16);

      // --- STEP A: ENSURE PROJECT IS REGISTERED ON-CHAIN ---
      try {
        const txCreate = await contract.createProject(numericId, project.title, project.budget);
        console.log("Registering project on-chain...");
        await txCreate.wait(); 
      } catch (e) {
        console.log("Registration skipped (project likely exists). Proceeding to verify...");
      }

      // --- STEP B: TRIGGER VERIFICATION & RELEASE ---
      const tx = await contract.verifyAndRelease(numericId);
      const receipt = await tx.wait(); 

      // --- STEP C: UPDATE MONGODB ---
      const res = await fetch(`http://localhost:5000/api/projects/verify/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionHash: receipt.hash })
      });
      const updatedData = await res.json();
      
      setProject(prev => ({
        ...prev,
        ...updatedData,
        status: "Verified",
        fundsReleased: true,
        progress: 100,
        transactionHash: receipt.hash
      }));
      
      setShowModal(true); 
    } catch (err) {
      console.error("Blockchain error:", err);
      const errorMessage = err.reason || err.message || "Unknown Error";
      alert("Verification Failed: " + errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  // --- HELPERS ---
  const generateMilestones = (p) => [
    { title: "Project Approval & Budgeting", date: "2023-08-10", status: "completed" },
    { title: "Vendor Procurement", date: "2023-09-15", status: "completed" },
    { title: "Phase 1 Implementation", date: "2024-01-20", status: p.fundsReleased ? "completed" : "in-progress" },
    { title: "Final Inspection & Audit", date: "2024-05-30", status: p.fundsReleased ? "completed" : "pending" },
  ];

  const generateTimeline = (p) => [
    { date: new Date(p.createdAt).toLocaleDateString(), title: "Project Initiated", desc: "Project proposal submitted by Dept." },
    { date: "2 Weeks Later", title: "Smart Contract Deployed", desc: "Budget locked in immutable ledger." },
    ...(p.fundsReleased ? [{ date: "Today", title: "Verification Complete", desc: "On-chain consensus reached. Funds released." }] : [])
  ];

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-slate-400">
      <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
      <h2 className="text-xl text-white font-bold">Project Not Found</h2>
      <button onClick={() => navigate('/projects')} className="mt-4 text-cyan-400 hover:underline">Return to Projects</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 pb-20">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

      {/* --- HERO HEADER --- */}
      <div className="relative h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/60 to-[#020617] z-10" />
        <img src={project.image} alt="Cover" className="w-full h-full object-cover opacity-60" />
        
        <div className="absolute top-24 left-0 right-0 z-20 px-6">
          <div className="max-w-7xl mx-auto">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-white mb-6 transition-colors bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${
                    project.fundsReleased 
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  }`}>
                    {project.fundsReleased ? "Verified" : project.status}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Created: {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h1>
                <p className="text-lg text-slate-400 mt-2 max-w-2xl flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-500" /> {project.location}
                </p>
              </div>

              {/* Action Box: Restricted to Admin */}
              <div className="flex flex-col items-end gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Total Budget</p>
                  <p className="text-3xl font-mono font-bold text-white">{formatCurrency(project.budget)}</p>
                </div>
                
                {project.fundsReleased ? (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Verified On-Chain</span>
                  </div>
                ) : isAdmin ? (
                  <button
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="flex items-center gap-2 bg-white text-slate-950 px-6 py-3 rounded-xl font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50"
                  >
                    {isVerifying ? (
                      <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ShieldCheck className="w-5 h-5" />
                    )}
                    Verify & Release Funds
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-slate-800/50 border border-white/5 px-4 py-2 rounded-lg text-slate-500 italic text-sm backdrop-blur-sm">
                    <Lock className="w-3.5 h-3.5" /> Admin Access Required
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-3">Project Summary</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-purple-400" /> Financials
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Funds Released</span>
                    <span className="text-white font-mono">{project.fundsReleased ? formatCurrency(project.budget) : formatCurrency(0)}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: project.fundsReleased ? "100%" : "0%" }}
                      className="h-full bg-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-400" /> Audit Trail
              </h3>
              <div className="space-y-4 relative">
                <div className="absolute left-1.5 top-2 bottom-2 w-px bg-white/10" />
                {project.timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 ${idx === project.timeline.length - 1 ? "bg-orange-500 border-orange-500" : "bg-slate-900 border-slate-600"}`} />
                    <p className="text-xs text-slate-500 mb-0.5">{item.date}</p>
                    <p className="text-sm font-bold text-slate-200">{item.title}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Development Milestones</h3>
                <span className="text-2xl font-mono font-bold text-cyan-400">{project.progress}%</span>
              </div>
              <div className="space-y-4">
                {project.milestones.map((ms, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      ms.status === 'completed' ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"
                    }`}>
                      {ms.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold ${ms.status === 'completed' ? "text-white" : "text-slate-400"}`}>
                        {ms.title}
                      </h4>
                      <p className="text-xs text-slate-500">Target: {ms.date}</p>
                    </div>
                    <div className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                      ms.status === 'completed' ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-500"
                    }`}>
                      {ms.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SUCCESS MODAL --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#0F172A] border border-emerald-500/30 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl shadow-emerald-500/20">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Funds Released!</h2>
              <p className="text-slate-400 mb-6 text-sm">
                The smart contract has verified the milestone and released 
                <span className="text-white font-mono font-bold mx-1">{formatCurrency(project.budget)}</span>
                to the vendor wallet on-chain.
              </p>
              
              <div className="bg-black/40 rounded-xl p-4 mb-6 text-left border border-white/5">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Blockchain Transaction Hash</p>
                <p className="text-[10px] font-mono text-emerald-400 break-all leading-relaxed">
                  {project.transactionHash}
                </p>
              </div>

              <button 
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" /> Close Receipt
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}