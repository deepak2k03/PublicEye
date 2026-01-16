// src/pages/Transactions.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Download, 
  Box,
  CheckCircle2,
  Clock,
  Activity
} from "lucide-react";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumSignificantDigits: 3
  }).format(amount);
};

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        const data = await res.json();
        
        const txs = data.map(p => ({
          id: p._id,
          // Use real transaction hash or a placeholder if pending
          hash: p.transactionHash || "0xPending...",
          block: p.fundsReleased ? "Mined" : "Pending",
          age: new Date(p.createdAt).toLocaleDateString(),
          from: "Govt Treasury",
          to: "Vendor Wallet",
          value: p.budget,
          status: p.fundsReleased ? "Success" : "Pending",
          method: p.fundsReleased ? "verifyAndRelease" : "DeploymentPending"
        }));

        setTransactions(txs);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTxs = transactions.filter(t => {
    if (filter === "verified") return t.status === "Success";
    if (filter === "pending") return t.status === "Pending";
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
               <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">Public Ledger • Localhost 8545</span>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Audit Ledger</h1>
            <p className="text-slate-500 mt-2">Immutable record of all public fund disbursements secured by Smart Contracts.</p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/10 hover:border-white/20 rounded-lg text-sm text-slate-300 transition-colors">
            <Download className="w-4 h-4" /> Export Ledger
          </button>
        </motion.div>

        {/* Global Statistics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
           <div className="bg-slate-900/50 border border-white/10 p-4 rounded-xl backdrop-blur-md">
              <p className="text-xs text-slate-500 uppercase font-bold">Total Disbursed</p>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-xl font-mono text-white">
                   {formatCurrency(transactions.filter(t => t.status === "Success").reduce((acc, curr) => acc + curr.value, 0))}
                 </span>
              </div>
           </div>
           <div className="bg-slate-900/50 border border-white/10 p-4 rounded-xl backdrop-blur-md">
              <p className="text-xs text-slate-500 uppercase font-bold">Smart Contract Status</p>
              <div className="flex items-center gap-2 mt-1 text-emerald-400">
                 <Activity className="w-4 h-4" />
                 <span className="text-xl font-mono">Live & Syncing</span>
              </div>
           </div>
           <div className="bg-slate-900/50 border border-white/10 p-4 rounded-xl backdrop-blur-md">
              <p className="text-xs text-slate-500 uppercase font-bold">Verification Rate</p>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-xl font-mono text-amber-400">
                   {((transactions.filter(t => t.status === "Success").length / transactions.length) * 100 || 0).toFixed(1)}%
                 </span>
              </div>
           </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
           {['all', 'verified', 'pending'].map((f) => (
             <button
               key={f}
               onClick={() => setFilter(f)}
               className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                 filter === f 
                   ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                   : "bg-slate-900/50 text-slate-500 border border-white/5 hover:bg-slate-800"
               }`}
             >
               {f}
             </button>
           ))}
        </div>

        <div className="bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5 text-xs text-slate-400 uppercase tracking-wider">
                  <th className="p-4 font-bold">Txn Hash</th>
                  <th className="p-4 font-bold">Contract Method</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Age</th>
                  <th className="p-4 font-bold">From</th>
                  <th className="p-4 font-bold">To</th>
                  <th className="p-4 font-bold text-right">Value (INR)</th>
                  <th className="p-4 font-bold text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-slate-500 animate-pulse">Synchronizing Ledger with Blockchain...</td>
                  </tr>
                ) : filteredTxs.map((tx, i) => (
                  <motion.tr 
                    key={tx.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-4 font-mono text-cyan-500 truncate max-w-[150px]">{tx.hash}</td>
                    <td className="p-4">
                       <span className="px-2 py-1 rounded bg-slate-800 border border-white/10 text-[10px] font-mono text-slate-300">
                         {tx.method}
                       </span>
                    </td>
                    <td className="p-4">
                      <span className={`flex items-center gap-2 ${tx.status === "Success" ? "text-emerald-400" : "text-amber-400"}`}>
                        {tx.status === "Success" ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 whitespace-nowrap">{tx.age}</td>
                    <td className="p-4 text-slate-300 text-xs">Govt Wallet</td>
                    <td className="p-4 text-slate-300 text-xs">Project Vendor</td>
                    <td className="p-4 text-right font-bold text-white font-mono">{formatCurrency(tx.value)}</td>
                    <td className="p-4 text-center">
                       {tx.status === "Success" ? (
                         <div className="w-6 h-6 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                            <Box className="w-3.5 h-3.5" />
                         </div>
                       ) : (
                         <span className="text-slate-600">—</span>
                       )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {!loading && filteredTxs.length === 0 && (
             <div className="p-12 text-center text-slate-500 italic">No blockchain records found for this category.</div>
          )}
        </div>
      </div>
    </div>
  );
}