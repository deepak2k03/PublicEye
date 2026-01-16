// src/pages/Projects.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <--- Ensure this is imported
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  MessageSquare, 
  Briefcase, 
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Plus
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// ... (Keep PROJECT_IMAGES and StatusBadge component as they were) ...

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1583345237708-1f3243774523?auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=60",
];

// Spotlight Card Component
function SpotlightCard({ children, className = "", onClick }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative border border-white/10 bg-slate-900/40 rounded-2xl overflow-hidden group cursor-pointer ${className}`} // Added cursor-pointer
      onMouseMove={handleMouseMove}
      onClick={onClick} // <--- THIS IS KEY for navigation
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// Status Badge Component
const StatusBadge = ({ status }) => {
  const styles = {
    "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Verified": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Proposed": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Completed": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${styles[status] || styles["In Progress"]} backdrop-blur-md`}>
      {status}
    </span>
  );
};

export default function Projects() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  // Fetch Data
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/projects");
      const data = await res.json();
      setProjects(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Verify Logic
  const handleVerify = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/projects/verify/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });
      const updatedProject = await res.json();
      setProjects(prev => prev.map(p => p._id === id ? updatedProject : p));
    } catch (err) {
      console.error(err);
    }
  };

  // Add Demo Project Logic
  const addDemoProject = async () => {
    const demoData = {
      title: "Smart Traffic Control System",
      description: "AI-powered traffic lights installation at major intersections to reduce congestion.",
      budget: 8500000,
      location: "Cyber Hub, Gurugram",
      officerId: user?.id
    };

    await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(demoData)
    });
    fetchProjects();
  };

  // Filtering Logic
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        const matchesSearch =
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || p.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const progressA = a.status === 'Verified' ? 100 : 50;
        const progressB = b.status === 'Verified' ? 100 : 50;
        
        if (sortBy === "progress-desc") return progressB - progressA;
        if (sortBy === "progress-asc") return progressA - progressB;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [searchTerm, statusFilter, sortBy, projects]);

  const statusOptions = ["All", "In Progress", "Verified", "Proposed"];

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50 pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#06b6d4]" />
              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">Public Ledger</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Active Projects</h1>
            <p className="text-slate-500 mt-2 max-w-xl">
              Monitor development across sectors. All milestones are cryptographically verified.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
             <button onClick={addDemoProject} className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-indigo-500/20">
                <Plus className="w-4 h-4" /> Add Demo Project
             </button>
             <div className="h-10 w-px bg-white/10 hidden md:block" />
             <div className="hidden md:flex flex-col items-end">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Total Projects</span>
                <span className="text-xl font-mono text-cyan-400 font-bold">{projects.length}</span>
             </div>
          </div>
        </motion.div>

        {/* Controls Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="sticky top-20 z-30 bg-[#020617]/80 backdrop-blur-xl border-y border-white/5 py-4 mb-10 -mx-6 px-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="relative group w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-lg leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-600 focus:outline-none focus:bg-slate-900 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 sm:text-sm transition-all"
                placeholder="Search by name or description..."
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/5 overflow-x-auto">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all whitespace-nowrap ${
                      statusFilter === status ? "bg-slate-800 text-white shadow-lg ring-1 ring-white/10" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full sm:w-48 bg-slate-900/50 border border-white/10 text-slate-300 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-sm cursor-pointer hover:bg-slate-800 transition-colors"
                >
                  <option value="recent">Sort: Recent</option>
                  <option value="progress-desc">Progress: High to Low</option>
                  <option value="progress-asc">Progress: Low to High</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <Filter className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {loading ? (
               <div className="col-span-full text-center py-20 text-slate-500 animate-pulse">Loading Blockchain Data...</div>
            ) : filteredProjects.map((project, idx) => {
              const imgIndex = project._id.length % PROJECT_IMAGES.length;
              const progress = project.status === 'Verified' ? 100 : project.status === 'In Progress' ? 60 : 10;

              return (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  {/* --- CARD NAVIGATION ADDED HERE --- */}
                  <SpotlightCard 
                    className="h-full flex flex-col"
                    onClick={() => navigate(`/projects/${project._id}`)} // <--- NAVIGATE ON CLICK
                  >
                    
                    {/* Image Section */}
                    <div className="relative h-48 w-full overflow-hidden border-b border-white/5">
                      <div className="absolute inset-0 bg-slate-900/20 z-10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-20" />
                      <img src={PROJECT_IMAGES[imgIndex]} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                      <div className="absolute top-4 left-4 z-30">
                        <StatusBadge status={project.status} />
                      </div>
                      <div className="absolute top-4 right-4 z-30">
                        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-1 rounded border border-white/10 flex items-center gap-1.5">
                          <Wallet className="w-3 h-3 text-emerald-400" />
                          ₹{(project.budget / 100000).toFixed(1)}L
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-1 relative z-20">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            <Briefcase className="w-3 h-3" />
                            Infrastructure
                          </div>
                          {project.transactionHash && (
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded truncate max-w-[100px]" title={project.transactionHash}>
                              {project.transactionHash.substring(0, 8)}...
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed h-10">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-auto space-y-4">
                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between text-xs font-medium mb-1.5">
                            <span className="text-slate-500">Completion</span>
                            <span className="text-white font-mono">{progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${progress}%` }}
                              transition={{ duration: 1 }}
                              className={`h-full bg-gradient-to-r ${project.fundsReleased ? "from-emerald-500 to-green-400" : "from-blue-500 via-cyan-500 to-indigo-500"}`}
                            />
                          </div>
                        </div>

                        {/* Action Area */}
                        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                          {project.fundsReleased ? (
                            <div className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold py-2.5 rounded-lg cursor-default">
                              <CheckCircle2 className="w-4 h-4" /> Funds Released
                            </div>
                          ) : (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation(); // Prevents opening details page
                                handleVerify(project._id);
                              }}
                              className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-cyan-400 font-bold text-xs py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                            >
                              <ShieldCheck className="w-4 h-4" /> Verify & Release
                            </button>
                          )}
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents opening details page
                              navigate("/feedback", { state: { projectName: project.title } });
                            }}
                            className="px-3 py-2.5 bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 text-slate-400 hover:text-white rounded-lg transition-all"
                            title="Feedback"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Search className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No projects found</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">
              Try adjusting your search terms or use the "Add Demo Project" button.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}