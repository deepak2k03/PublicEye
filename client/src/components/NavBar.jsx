// src/components/NavBar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Wallet, 
  LayoutDashboard, 
  FileText, 
  ShieldCheck, 
  Activity,
  Terminal,
  Zap,
  MessageSquare,
  MessageCircle,
  LogOut,
  User,
  ChevronDown,
  Settings
} from "lucide-react";
import Logo from "../assets/faviconImage.png";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = () => {
    setWalletAddress("0x71...9A2");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = [
    { name: "Home", path: "/home", icon: null },
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "Projects", path: "/projects", icon: <FileText className="w-4 h-4" /> },
    { name: "Verify", path: "/verify", icon: <ShieldCheck className="w-4 h-4" /> },
    { name: "Transactions", path: "/transactions", icon: <Activity className="w-4 h-4" /> },
    { name: "Feedback", path: "/feedback", icon: <MessageSquare className="w-4 h-4" /> },
    { name: "Report", path: "/report", icon: <MessageCircle className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#030712]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500" />
              <img 
                src={Logo} 
                alt="PublicEye" 
                className="h-9 w-9 relative z-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                PublicEye
              </span>
              <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase group-hover:text-cyan-600 transition-colors">
                Verifiable_Ops
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-4 py-2 group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute inset-0 bg-white/5 rounded-lg border border-white/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-white"
                  }`}>
                    {link.icon}
                    {link.name}
                  </span>
                  {!isActive && (
                    <span className="absolute bottom-2 left-4 right-4 h-px bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* RIGHT ACTION SECTION (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Wallet Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={connectWallet}
              className={`relative px-4 py-2 rounded-sm font-mono text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                walletAddress 
                  ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  : "bg-black border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              }`}
            >
               <div className="flex items-center gap-2">
                 {walletAddress ? (
                   <>
                    <Zap className="w-3 h-3 fill-current" />
                    <span>{walletAddress}</span>
                   </>
                 ) : (
                   <>
                    <Terminal className="w-3 h-3" />
                    <span>Connect</span>
                   </>
                 )}
               </div>
            </motion.button>

            {/* --- PROFILE DROPDOWN --- */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                  {user?.firstName ? user.firstName[0].toUpperCase() : "U"}
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-[#0B1121] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 ring-1 ring-white/5"
                  >
                    {/* User Info Header */}
                    <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                      <p className="text-white font-bold text-sm truncate">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500 truncate mb-2">{user?.email}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wide">
                        {user?.role || "Citizen"}
                      </span>
                    </div>

                    {/* Menu Items */}
                    <div className="p-1.5 space-y-0.5">
                      <Link 
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
                      >
                        <User className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                        Your Profile
                      </Link>
                      
                      <div className="h-px bg-white/5 my-1" />
                      
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left group"
                      >
                        <LogOut className="w-4 h-4 group-hover:text-red-300" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                {user?.firstName ? user.firstName[0].toUpperCase() : "U"}
             </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#030712] border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              
              {/* Mobile User Card */}
              <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/5">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {user?.firstName ? user.firstName[0].toUpperCase() : "U"}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{user?.firstName}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <Link 
                      to="/profile" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 p-2.5 bg-black/40 border border-white/5 rounded-lg text-sm text-slate-300 hover:bg-black/60 transition-colors"
                    >
                       <User className="w-4 h-4" /> Profile
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center justify-center gap-2 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                       <LogOut className="w-4 h-4" /> Logout
                    </button>
                 </div>
              </div>

              {/* Navigation Links */}
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3.5 rounded-lg text-base font-medium flex items-center gap-3 transition-colors ${
                    location.pathname === link.path
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-white/10">
                <button 
                  onClick={connectWallet}
                  className="w-full flex justify-center items-center gap-3 px-4 py-3.5 bg-white/5 border border-white/10 text-white rounded-lg font-mono text-sm uppercase hover:bg-white/10 transition-colors"
                >
                  <Wallet className="w-4 h-4" />
                  {walletAddress ? "Connected" : "Connect Wallet"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}