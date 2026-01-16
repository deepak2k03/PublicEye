// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, ShieldCheck, Lock, ArrowRight, ChevronLeft, Key, Fingerprint, AlertCircle 
} from "lucide-react";
import { useAuth } from "../context/AuthContext"; // 1. Import Context

const roles = [
  {
    id: "citizen",
    title: "Citizen",
    desc: "Access public records, track projects, and file reports.",
    icon: <User className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    border: "group-hover:border-cyan-500/50"
  },
  {
    id: "official", // Changed from 'auditor' to match backend enum often used
    title: "Govt Official",
    desc: "Verify transaction hashes and upload audit certificates.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-500",
    border: "group-hover:border-emerald-500/50"
  },
  {
    id: "admin",
    title: "Administrator",
    desc: "System configuration, user management, and smart contract deployment.",
    icon: <Lock className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    border: "group-hover:border-purple-500/50"
  }
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Get login function from context
  
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // 3. Form State
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 4. Call Backend
    const success = await login(formData.email, formData.password, selectedRole.id);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 flex items-center justify-center p-6 relative overflow-hidden">
      
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#020617]/80 to-[#020617] pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10">
        
        {/* Header - Only show if no role selected */}
        {!selectedRole && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-white/10 text-xs font-mono text-slate-400 mb-4 backdrop-blur-md">
              <Fingerprint className="w-3 h-3" /> SECURE GATEWAY v2.4
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
              Identify Yourself
            </h1>
            <p className="text-slate-500">Select your role to establish a secure connection.</p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Role Selection */}
          <div className={`grid gap-4 transition-all duration-500 ${selectedRole ? 'hidden md:grid md:opacity-50 md:pointer-events-none md:scale-95 md:blur-sm' : 'opacity-100'}`}>
            {roles.map((role) => (
              <motion.div
                key={role.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRole(role)}
                className={`relative group p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:bg-slate-900/60 transition-all cursor-pointer overflow-hidden ${role.border}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-3 rounded-xl bg-slate-950 border border-white/10 text-white shadow-lg`}>
                    {role.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{role.title}</h3>
                    <p className="text-sm text-slate-500 leading-snug">{role.desc}</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Login Form (Conditional) */}
          <div className="relative min-h-[400px] flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              {!selectedRole ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-4 hidden md:block"
                >
                  <div className="w-20 h-20 bg-slate-900/50 rounded-full flex items-center justify-center mx-auto border border-white/5 animate-pulse">
                    <Lock className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-slate-600 text-sm font-mono">WAITING FOR SELECTION...</p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative"
                >
                  <button 
                    onClick={() => setSelectedRole(null)}
                    className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="mb-8">
                    <div className={`inline-flex p-3 rounded-xl bg-slate-950 border border-white/10 mb-4 text-cyan-400 shadow-lg`}>
                      {selectedRole.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedRole.title} Login
                    </h2>
                    <p className="text-sm text-slate-500">Enter your credentials to continue.</p>
                  </div>

                  {/* ERROR MESSAGE */}
                  {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        {selectedRole.id === 'citizen' ? 'Email Address' : 'Officer ID'}
                      </label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        placeholder={selectedRole.id === 'citizen' ? "name@example.com" : "admin@gov.in"}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
                      <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className={`w-full py-3.5 rounded-lg font-bold text-white shadow-lg mt-4 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                        selectedRole.id === 'admin' 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500' 
                          : selectedRole.id === 'official'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500'
                      }`}
                    >
                      {loading ? "Authenticating..." : "Access System"}
                    </button>
                  </form>

                  {selectedRole.id === 'citizen' && (
                    <div className="mt-6 text-center pt-6 border-t border-white/5">
                      <p className="text-sm text-slate-500">
                        New user?{" "}
                        <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline">
                          Create a Citizen Account
                        </Link>
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}