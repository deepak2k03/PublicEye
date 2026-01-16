// src/components/ProjectCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  ArrowUpRight, 
  Copy, 
  ShieldCheck
} from "lucide-react";

export default function ProjectCard({ project, loading = false }) {
  if (loading) {
    return (
      <div className="w-full h-[320px] rounded-3xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col gap-4">
        <div className="w-full h-40 bg-slate-100 rounded-2xl animate-pulse" />
        <div className="h-6 w-3/4 bg-slate-100 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-4 w-1/4 bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-1/4 bg-slate-100 rounded animate-pulse" />
        </div>
        <div className="mt-auto h-2 w-full bg-slate-100 rounded animate-pulse" />
      </div>
    );
  }

  // Destructure real data from the project prop
  const {
    title,
    location,
    status,
    budget,
    fundsReleased,
    transactionHash,
    image = "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=1000&auto=format&fit=crop"
  } = project || {};

  const handleCopyHash = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (transactionHash) {
      navigator.clipboard.writeText(transactionHash);
      alert("Hash copied to clipboard!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative w-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10" />
        
        {/* Real Status Badge */}
        <div className={`absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 backdrop-blur-md border rounded-full text-xs font-semibold shadow-lg ${
          fundsReleased ? "bg-emerald-500/20 text-emerald-100 border-emerald-500/30" : "bg-white/10 text-white border-white/20"
        }`}>
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${fundsReleased ? "bg-emerald-400" : "bg-blue-400"}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${fundsReleased ? "bg-emerald-500" : "bg-blue-500"}`}></span>
          </span>
          {fundsReleased ? "Verified" : status}
        </div>

        <button className="absolute top-4 right-4 z-20 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </button>

        <motion.img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>

      <div className="p-5 relative">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {location}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5 p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Total Budget</p>
            <p className="text-sm font-bold text-slate-900">₹{(budget / 100000).toFixed(2)} L</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Funds</p>
            <p className={`text-sm font-bold ${fundsReleased ? "text-emerald-600" : "text-slate-900"}`}>
              {fundsReleased ? "Released" : "Locked"}
            </p>
          </div>
        </div>

        {/* Footer: REAL Blockchain Hash */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {transactionHash ? (
            <div 
              onClick={handleCopyHash}
              className="flex items-center gap-1.5 px-2 py-1 -ml-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group/hash"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-mono text-slate-400 group-hover/hash:text-blue-500 transition-colors">
                {transactionHash.substring(0, 6)}...{transactionHash.substring(transactionHash.length - 4)}
              </span>
              <Copy className="w-3 h-3 text-slate-300 opacity-0 group-hover/hash:opacity-100 transition-opacity" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
              Awaiting On-Chain Verification
            </div>
          )}
          
          <div className="text-[10px] font-medium text-slate-400">
            Hardhat Local
          </div>
        </div>
      </div>
    </motion.div>
  );
}