// src/pages/Landing.jsx
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useInView,
  AnimatePresence
} from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Activity, Globe, Lock, 
  Database, Cpu, CheckCircle2, FileText, Layers, 
  Search, Users, ChevronDown, Zap, Server, Eye, Fingerprint
} from "lucide-react";

/**
 * --- BACKGROUND: FLUID MESH ---
 */
const FluidBackground = () => (
  <div className="fixed inset-0 -z-10 bg-[#0f172a] overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
    <div className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-screen" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
  </div>
);

/**
 * --- COMPONENT: FLOATING LEDGER BLOCKS (HERO VISUAL) ---
 */
const LedgerStack = () => {
  return (
    // Added 'h-full' and 'w-full' to ensure it takes up space correctly
    <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center perspective-1000">
      {/* Stack of floating glass blocks */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0, rotateX: 60, rotateZ: -45, opacity: 0 }}
          animate={{ 
            y: [0, -20, 0],
            opacity: 1,
            rotateX: 60,
            rotateZ: -45,
            translateZ: i * 60 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: i * 0.5 
          }}
          className="absolute w-32 h-32 sm:w-48 sm:h-48 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center"
          // Adjusted bottom positioning to center it better in the container
          style={{ bottom: `${100 + (i * 40)}px`, zIndex: 10 - i }}
        >
          {i === 2 && <ShieldCheck className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />}
          {i === 1 && <Database className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />}
          {i === 0 && <Activity className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" />}
          
          {/* Edge highlight */}
          <div className="absolute inset-0 rounded-2xl border border-white/30" />
        </motion.div>
      ))}
      
      {/* Base glow */}
      <div className="absolute bottom-20 w-64 h-24 bg-blue-500/30 blur-[60px] rounded-full transform rotate-x-60" />
    </div>
  );
};

/**
 * --- COMPONENT: FOCUS GRID ITEM ---
 */
const FocusCard = ({ icon, title, desc, active, onHover }) => (
  <motion.div 
    onMouseEnter={onHover}
    className={`p-8 rounded-3xl border transition-all duration-500 cursor-default relative overflow-hidden ${
      active 
        ? "bg-white/10 border-white/20 shadow-2xl scale-105 z-10" 
        : "bg-white/5 border-white/5 opacity-50 grayscale hover:opacity-80 hover:grayscale-0"
    }`}
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 ${
      active ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30" : "bg-white/10 text-slate-400"
    }`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
    
    {active && (
      <motion.div 
        layoutId="glow"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10" 
      />
    )}
  </motion.div>
);

/**
 * --- MAIN PAGE ---
 */
export default function Landing() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef(null);
  
  // Parallax Scroll
  const { scrollYProgress } = useScroll();
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroVisualY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <div ref={containerRef} className="min-h-screen w-full font-sans text-slate-300 selection:bg-indigo-500/30 overflow-x-hidden relative">
      <FluidBackground />



      {/* --- HERO SECTION --- */}
      {/* Added pt-32 to push content down below fixed navbar */}
      <section className="relative flex items-center pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          
          {/* Text Content - Added z-index to stay above background elements */}
          <motion.div style={{ y: heroTextY }} className="relative z-10 order-2 lg:order-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8 mx-auto lg:mx-0"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              Live on Etheruim Mainnet
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[1.1] md:leading-[0.9] mb-8"
            >
              Public <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                Eye
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-lg mb-10 leading-relaxed mx-auto lg:mx-0"
            >
              The first decentralized auditing protocol for public infrastructure. We turn opaque bureaucracy into verifiable code.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <button 
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] flex items-center gap-2 group mb-20"
              >
                Access Portal
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-lg transition-all backdrop-blur-md mb-20"
              >
                View Ledger
              </button>
            </motion.div>
          </motion.div>

          {/* Visual Content - Added order to control stacking on mobile */}
          <motion.div 
            style={{ y: heroVisualY }} 
            className="relative order-1 lg:order-2 h-[400px] lg:h-full flex items-center justify-center z-0"
          >
            <LedgerStack />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-xs uppercase tracking-widest font-bold">Scroll to verify</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* --- LIVE STATS TICKER --- */}
      <div className="w-full border-y border-white/5 bg-slate-950/50 backdrop-blur-sm overflow-hidden py-6 relative z-10">
        <div className="flex gap-16 animate-marquee whitespace-nowrap min-w-0.5 justify-between ml-10">
           {[
             { label: "Total Value Locked", val: "₹1.2 Trillion" },
             { label: "Active Contracts", val: "14,203" },
             { label: "Blocks Mined", val: "#18,842,911" },
             { label: "Auditors Online", val: "4,291" },
             { label: "Total Value Locked", val: "₹1.2 Trillion" },
           ].map((stat, i) => (
             <div key={i} className="flex items-center gap-4">
               <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
               <span className="text-2xl font-mono font-bold text-white">{stat.val}</span>
               <div className="w-px h-8 bg-white/10 ml-12" />
             </div>
           ))}
        </div>
      </div>

      {/* --- STICKY SCROLL STORY --- */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Sticky Left: Title */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How Verification Works</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              A seamless flow from allocation to execution, secured by cryptography at every step.
            </p>
            <div className="hidden lg:block p-6 bg-indigo-900/20 border border-indigo-500/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <span className="font-bold text-indigo-200">Cryptographically Secured</span>
              </div>
              <p className="text-sm text-indigo-300/70">Every step produces a hash that is permanently written to the ledger.</p>
            </div>
          </div>

          {/* Scrolling Right: Steps */}
          <div className="lg:w-2/3 space-y-20 lg:space-y-32">
            {[
              {
                icon: <FileText className="w-8 h-8 text-cyan-400" />,
                step: "01",
                title: "Smart Contract Deployment",
                desc: "Government officials draft a tender. Budget, timeline, and deliverables are coded into an immutable Smart Contract."
              },
              {
                icon: <Users className="w-8 h-8 text-purple-400" />,
                step: "02",
                title: "Execution & Proof Upload",
                desc: "Contractors perform the work. Evidence (Geo-tagged photos, IoT sensor logs, invoices) is uploaded to IPFS."
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-emerald-400" />,
                step: "03",
                title: "Consensus Validation",
                desc: "Independent auditors and citizens review the proof. If consensus is reached, the Smart Contract automatically releases funds."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group relative pl-8 border-l-2 border-white/10"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-500 group-hover:scale-125 transition-transform" />
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl font-black text-white/5 font-mono absolute -top-8 -left-4 z-0">{item.step}</span>
                  <div className="relative z-10 w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white relative z-10">{item.title}</h3>
                </div>
                <p className="text-xl text-slate-400 leading-relaxed max-w-xl">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOCUS GRID (FEATURES) --- */}
      <section className="py-32 px-6 bg-gradient-to-b from-slate-950/0 to-slate-950/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4">The Trust Protocol</h2>
            <p className="text-slate-400 text-lg">Hover to explore the technology stack.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Lock className="w-6 h-6" />, title: "Immutable Records", desc: "History written in code. Once a block is verified, it cannot be edited or deleted by anyone." },
              { icon: <Activity className="w-6 h-6" />, title: "Real-Time Tracking", desc: "Watch funds move instantly across the network. Zero latency in financial reporting." },
              { icon: <Cpu className="w-6 h-6" />, title: "Automated Audits", desc: "AI-driven pattern matching detects spending anomalies before they become fraud." },
              { icon: <Layers className="w-6 h-6" />, title: "Layer 2 Scaling", desc: "Built on Polygon for lightning-fast transactions and near-zero gas fees." },
              { icon: <Search className="w-6 h-6" />, title: "Open Explorer", desc: "A user-friendly block explorer allowing anyone to inspect contract state." },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "Identity Privacy", desc: "Zero-Knowledge proofs allow auditors to verify data without revealing sensitive info." },
            ].map((feature, idx) => (
              <FocusCard 
                key={idx}
                {...feature}
                active={activeFeature === idx}
                onHover={() => setActiveFeature(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/10 blur-[100px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
            Ready to <br/> verify the truth?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => navigate('/register')}
              className="px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]"
            >
              Start as Citizen
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-10 py-5 bg-transparent border border-white/20 text-white rounded-full font-bold text-xl hover:bg-white/5 transition-all"
            >
              Official Login
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 bg-[#020617] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-500" />
            <span className="font-bold text-white">PublicEye Foundation</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Manifesto</a>
            <a href="#" className="hover:text-white transition-colors">Protocol</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
          <p className="text-xs text-slate-600 font-mono">
            BLOCK #18,842,911 • SYSTEM OPTIMAL
          </p>
        </div>
      </footer>
    </div>
  );
}