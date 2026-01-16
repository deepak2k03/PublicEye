// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Shield, MapPin, Calendar, Edit2, Save, X, 
  Wallet, Activity, CheckCircle2, AlertCircle, Lock, Camera,
  FileText, TrendingUp
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

/**
 * --- BACKGROUND COMPONENT ---
 */
const ProfileBackground = () => (
  <div className="fixed inset-0 -z-10 bg-[#020617] overflow-hidden pointer-events-none">
    <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[120px]" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
  </div>
);

/**
 * --- STAT CARD COMPONENT ---
 */
const StatCard = ({ icon, label, value, trend, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      {icon}
    </div>
    <div className="relative z-10">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${color} bg-opacity-20 text-white`}>
        {React.cloneElement(icon, { className: "w-5 h-5" })}
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-slate-400 font-medium">{label}</p>
      {trend && (
        <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
          <TrendingUp className="w-3 h-3" /> {trend} this month
        </div>
      )}
    </div>
  </motion.div>
);

export default function Profile() {
  const { user } = useAuth(); // Get real user data
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "Mumbai, India",
    bio: "Passionate about civic transparency and blockchain technology."
  });

  // --- ROBUST STATE UPDATE ---
  // This ensures the form fills up even if the backend sends data differently
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        // Check for 'firstName' OR 'name' (fallback)
        firstName: user.firstName || user.name || "", 
        lastName: user.lastName || "", 
        email: user.email || "",
        location: user.location || prev.location,
        bio: user.bio || prev.bio
      }));
    }
  }, [user]);

  const handleSave = () => {
    // API Call to update user goes here
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-300 relative">
      <ProfileBackground />

      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="relative mb-12">
          {/* Banner */}
          <div className="h-48 w-full rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-white/10 overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,51,122,0.5)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shine" />
          </div>

          {/* Profile Card Overlay */}
          <div className="flex flex-col md:flex-row items-end px-8 -mt-16 gap-6 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-[#020617] bg-slate-800 flex items-center justify-center text-4xl font-bold text-white shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600" />
                <span className="relative z-10 uppercase">
                  {formData.firstName ? formData.firstName[0] : "U"}
                </span>
                
                {/* Edit Avatar Overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-[#020617] rounded-full" title="Online" />
            </div>

            <div className="flex-1 pb-2 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
                {formData.firstName} {formData.lastName}
                <span className="px-2 py-1 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider">
                  {user?.role || "Citizen"}
                </span>
              </h1>
              <p className="text-slate-400 mt-1 flex items-center justify-center md:justify-start gap-4 text-sm">
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {formData.email}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {formData.location}</span>
              </p>
            </div>

            <div className="pb-4">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                  isEditing 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/20"
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                }`}
              >
                {isEditing ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit2 className="w-4 h-4" /> Edit Profile</>}
              </button>
            </div>
          </div>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard 
            icon={<FileText />} 
            label="Reports Filed" 
            value="12" 
            trend="+2" 
            color="bg-blue-500" 
          />
          <StatCard 
            icon={<CheckCircle2 />} 
            label="Verifications" 
            value="89" 
            trend="+14%" 
            color="bg-emerald-500" 
          />
          <StatCard 
            icon={<Activity />} 
            label="Reputation Score" 
            value="940" 
            color="bg-purple-500" 
          />
          <StatCard 
            icon={<Wallet />} 
            label="Tokens Earned" 
            value="450 PE" 
            color="bg-amber-500" 
          />
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Navigation & Bio */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Bio Card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-400" /> About
              </h3>
              {isEditing ? (
                <textarea 
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors resize-none h-32"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
              ) : (
                <p className="text-slate-400 text-sm leading-relaxed">{formData.bio}</p>
              )}
              
              <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Joined</span>
                  <span className="text-white flex items-center gap-1"><Calendar className="w-3 h-3" /> March 2024</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className="text-emerald-400 flex items-center gap-1"><Shield className="w-3 h-3" /> Verified Citizen</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col gap-1">
              {['overview', 'settings', 'security'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all relative ${
                    activeTab === tab ? "text-white" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/10 rounded-xl border border-white/5"
                    />
                  )}
                  <span className="relative z-10 capitalize">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              
              {/* === OVERVIEW TAB === */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                          <Activity className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm">Verified Road Construction Phase 1</h4>
                          <p className="text-xs text-slate-400 mt-1">Confirmed milestone completion for Sector 4 project.</p>
                          <span className="text-[10px] text-slate-500 mt-2 block">2 hours ago • Transaction Hash: 0x7a...9f</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* === SETTINGS TAB === */}
              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none disabled:opacity-50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none disabled:opacity-50" 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                      <input 
                        type="email" 
                        disabled={!isEditing}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none disabled:opacity-50" 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none disabled:opacity-50" 
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <div className="mt-8 flex justify-end">
                      <button onClick={handleSave} className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2.5 rounded-lg font-bold transition-colors">
                        Save Changes
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* === SECURITY TAB (Wallet) === */}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <h3 className="text-xl font-bold text-white mb-2">Connected Wallet</h3>
                    <p className="text-slate-400 text-sm mb-6">Manage your Web3 connection for blockchain interactions.</p>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-white font-mono text-sm">0x71C...9A23</p>
                          <p className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Connected
                          </p>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-red-400 hover:text-red-300 border border-red-500/30 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                        Disconnect
                      </button>
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <h3 className="text-xl font-bold text-white mb-6">Password & Security</h3>
                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors group">
                        <span className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                          <Lock className="w-4 h-4" /> Change Password
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors group">
                        <span className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                          <ShieldCheck className="w-4 h-4" /> Two-Factor Authentication
                        </span>
                        <div className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded uppercase">Enabled</div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}