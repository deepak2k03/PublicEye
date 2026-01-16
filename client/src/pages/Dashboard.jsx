// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Activity, 
  Wallet, 
  ShieldCheck, 
  FileText, 
  ArrowUpRight, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Building2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Helper for currency formatting
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumSignificantDigits: 3
  }).format(amount);
};

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBudget: 0,
    totalProjects: 0,
    verifiedCount: 0,
    pendingCount: 0,
    recentProjects: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        const projects = await res.json();

        // Calculate Stats on the fly
        const totalBudget = projects.reduce((acc, curr) => acc + curr.budget, 0);
        const verifiedCount = projects.filter(p => p.status === "Verified").length;
        const pendingCount = projects.filter(p => p.status !== "Verified").length;
        
        // Get 3 most recent projects
        const recentProjects = projects
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

        setStats({
          totalBudget,
          totalProjects: projects.length,
          verifiedCount,
          pendingCount,
          recentProjects
        });
        setLoading(false);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30">
      
      {/* Background FX */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        
        {/* --- WELCOME HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">System Operational</span>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{user?.firstName || "Officer"}</span>
            </h1>
            <p className="text-slate-500 mt-2">
              Here is what's happening in your jurisdiction today.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/projects" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold text-white transition-colors">
              View All Projects
            </Link>
            <Link to="/report" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-indigo-500/20">
              File New Report
            </Link>
          </div>
        </motion.div>

        {/* --- STATS GRID --- */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <StatsCard 
            title="Total Locked Funds" 
            value={loading ? "..." : formatCurrency(stats.totalBudget)} 
            icon={<Wallet className="w-5 h-5 text-purple-400" />}
            trend="+12% from last month"
            color="purple"
          />
          <StatsCard 
            title="Active Projects" 
            value={loading ? "..." : stats.totalProjects} 
            icon={<Building2 className="w-5 h-5 text-blue-400" />}
            trend="3 pending approval"
            color="blue"
          />
          <StatsCard 
            title="Verified Milestones" 
            value={loading ? "..." : stats.verifiedCount} 
            icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
            trend="100% Security Score"
            color="emerald"
          />
          <StatsCard 
            title="Pending Actions" 
            value={loading ? "..." : stats.pendingCount} 
            icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}
            trend="Requires attention"
            color="amber"
          />
        </motion.div>

        {/* --- MAIN CONTENT SPLIT --- */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: Recent Activity Feed */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" /> Live Project Feed
              </h2>
              <button className="text-xs text-slate-500 hover:text-white transition-colors">View Audit Log</button>
            </div>

            <div className="bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
              {loading ? (
                <div className="p-8 text-center text-slate-500">Loading feed...</div>
              ) : stats.recentProjects.length === 0 ? (
                <div className="p-8 text-center text-slate-500">No projects found. Start by creating one!</div>
              ) : (
                <div className="divide-y divide-white/5">
                  {stats.recentProjects.map((project) => (
                    <div key={project._id} className="p-5 hover:bg-white/5 transition-colors group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center border ${
                            project.status === "Verified" 
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                              : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                          }`}>
                            {project.status === "Verified" ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                          </div>
                          <div>
                            <h3 className="text-white font-bold group-hover:text-cyan-400 transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-sm text-slate-400 mt-1 line-clamp-1">
                              {project.description}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                project.status === "Verified" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                              }`}>
                                {project.status}
                              </span>
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {new Date(project.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="block text-white font-mono font-bold">{formatCurrency(project.budget)}</span>
                          <Link 
                            to={`/projects/${project._id}`}
                            className="text-xs text-cyan-500 hover:text-cyan-300 font-medium inline-flex items-center gap-1 mt-1"
                          >
                            Details <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="p-3 bg-white/5 text-center">
                <Link to="/projects" className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-colors">
                  Show All Activity
                </Link>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Quick Actions & Mini Charts */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            
            {/* Allocation Chart (Simulated) */}
            <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4">Budget Allocation</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-slate-400 mb-1">
                  <span>Infrastructure</span>
                  <span className="text-white">65%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} className="h-full bg-blue-500" />
                </div>

                <div className="flex justify-between text-sm text-slate-400 mb-1">
                  <span>Healthcare</span>
                  <span className="text-white">25%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "25%" }} className="h-full bg-purple-500" />
                </div>

                <div className="flex justify-between text-sm text-slate-400 mb-1">
                  <span>Education</span>
                  <span className="text-white">10%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "10%" }} className="h-full bg-emerald-500" />
                </div>
              </div>
            </div>

            {/* Quick Verify Widget */}
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <ShieldCheck className="w-24 h-24 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 relative z-10">Pending Verifications</h3>
              <p className="text-sm text-indigo-200 mb-4 relative z-10">
                You have {stats.pendingCount} projects waiting for blockchain audit confirmation.
              </p>
              <Link 
                to="/projects"
                className="inline-flex items-center gap-2 bg-white text-indigo-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors relative z-10"
              >
                Review Projects <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENT: Stats Card ---
function StatsCard({ title, value, icon, trend, color }) {
  const colors = {
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  };

  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:border-white/20 transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          {icon}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" /> {trend}
          </div>
        )}
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{value}</p>
    </motion.div>
  );
}