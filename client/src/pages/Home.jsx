// src/pages/Home.jsx
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import { 
  ArrowRight, 
  Layers, 
  Shield, 
  Zap, 
  Box, 
  Cpu, 
  Search, 
  Globe,
  Terminal
} from "lucide-react";

// --- ULTRA-PREMIUM COMPONENTS ---

/**
 * 1. Spotlight Card
 * A card that tracks mouse movement to create a "flashlight" border effect.
 */
function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/10 bg-gray-900/50 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
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
      <div>{children}</div>
    </div>
  );
}

/**
 * 2. Animated Grid Floor (3D Effect)
 */
const RetroGrid = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Deep Space Background */}
    <div className="absolute inset-0 bg-black" />
    
    {/* Moving Grid */}
    <div 
      className="absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        maskImage: 'linear-gradient(to bottom, transparent, 10%, black, 90%, transparent)',
        transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
      }}
    />
    
    {/* Ambient Glows */}
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
  </div>
);

/**
 * 3. Holographic Stats
 */
const HoloStat = ({ label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay, type: "spring" }}
    className="relative group"
  >
    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500" />
    <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 p-4 rounded-lg text-center">
      <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 font-mono">
        {value}
      </div>
      <div className="text-xs text-cyan-400 font-medium tracking-wider uppercase mt-1">
        {label}
      </div>
    </div>
  </motion.div>
);

// --- MAIN PAGE ---

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      <RetroGrid />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-40 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-900/10 text-cyan-400 text-xs font-mono mb-8">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                SYSTEM_ONLINE: v2.4.0
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
                SEE THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                  INVISIBLE.
                </span>
              </h1>

              <p className="text-lg text-gray-400 leading-relaxed max-w-xl mb-10 border-l-2 border-white/10 pl-6">
                The world's first cryptographic transparency engine. We turn government contracts into immutable, searchable data streams on the Polygon network.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/dashboard"
                  className="group relative px-8 py-4 bg-white text-black font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-cyan-50 transition-colors"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Initialize Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-cyan-400 blur opacity-0 group-hover:opacity-50 transition-opacity" />
                </Link>
                
                <Link 
                  to="/verify"
                  className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4" /> Run Audit
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 flex items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Mock Logos - replace with SVGs */}
                <div className="text-xl font-bold font-mono">ETHEREUM</div>
                <div className="text-xl font-bold font-mono">POLYGON</div>
                <div className="text-xl font-bold font-mono">CHAINLINK</div>
              </div>
            </motion.div>

            {/* Right Visual: The "Core" */}
            <div className="relative hidden lg:block perspective-1000">
              <motion.div style={{ y: y2 }} className="relative z-20">
                {/* Floating Glass Panels */}
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  
                  {/* Back Layer */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-white/10"
                  />
                  
                  {/* Card 1 */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-10 right-0 w-64 bg-gray-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl z-30"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><Shield className="w-5 h-5" /></div>
                      <div>
                        <div className="text-xs text-gray-400">Smart Contract</div>
                        <div className="text-sm font-bold text-white">Verified</div>
                      </div>
                    </div>
                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-green-500" />
                    </div>
                    <div className="mt-2 font-mono text-[10px] text-gray-500 truncate">0x71C...9A2</div>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div 
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-20 left-0 w-72 bg-gray-900/90 backdrop-blur-xl border border-cyan-500/30 p-6 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.1)] z-40"
                  >
                    <div className="flex justify-between items-end mb-2">
                      <div className="text-sm text-gray-400">Real-time Spend</div>
                      <div className="text-xl font-bold text-white flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Live
                      </div>
                    </div>
                    <div className="text-3xl font-mono text-white mb-4">₹ 4,293,000</div>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6,7,8].map(i => (
                        <div key={i} className={`h-8 w-full rounded-sm ${i > 5 ? 'bg-gray-800' : 'bg-cyan-500/60'}`} />
                      ))}
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS STRIP --- */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <HoloStat label="Contracts Indexed" value="12,402" delay={0.1} />
            <HoloStat label="Total Value (INR)" value="₹892Cr" delay={0.2} />
            <HoloStat label="On-Chain Txns" value="1.4M+" delay={0.3} />
            <HoloStat label="Uptime" value="99.9%" delay={0.4} />
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID --- */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-4">The Architecture of Truth.</h2>
            <p className="text-gray-400 max-w-2xl">We replaced bureaucratic black boxes with open-source code. Here is how the engine works.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <SpotlightCard className="rounded-3xl p-8 col-span-1 md:col-span-2">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Decentralized Storage</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Project documents and receipts aren't stored on a government server that can be wiped. They are hosted on IPFS (InterPlanetary File System), ensuring no single point of failure or censorship.
              </p>
              <div className="h-48 rounded-xl bg-black/50 border border-white/5 overflow-hidden relative">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                 {/* Decorative code block */}
                 <div className="p-4 font-mono text-xs text-green-400/80">
                    &gt; ipfs add document.pdf<br/>
                    &gt; Hash: QmXo9...3bA<br/>
                    &gt; Pinning to cluster...<br/>
                    &gt; Success.
                 </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl p-8">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Smart Triggers</h3>
              <p className="text-gray-400 leading-relaxed">
                Funds are held in escrow smart contracts. They are only released when a validator (or oracle) confirms physical progress.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl p-8">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center text-pink-400 mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Deep Query</h3>
              <p className="text-gray-400 leading-relaxed">
                Our indexer listens to the blockchain and organizes data into a GraphQL API, allowing you to filter millions of transactions in milliseconds.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl p-8 col-span-1 md:col-span-2">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 mb-6">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Full Stack Verifiability</h3>
                  <p className="text-gray-400 leading-relaxed">
                    From the React frontend to the Solidity contracts, our entire codebase is open source. You don't have to trust us—you can verify the code yourself.
                  </p>
                </div>
                <div className="flex-1 w-full">
                  <div className="bg-gray-950 rounded-xl border border-white/10 p-4 font-mono text-xs text-gray-500">
                    <div className="flex gap-2 mb-2 border-b border-white/5 pb-2">
                       <div className="w-3 h-3 rounded-full bg-red-500" />
                       <div className="w-3 h-3 rounded-full bg-yellow-500" />
                       <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-purple-400">contract</span> PublicFund <span className="text-white">{`{`}</span><br/>
                    &nbsp;&nbsp;<span className="text-blue-400">mapping</span>(bytes32 => uint) <span className="text-yellow-400">public</span> balances;<br/>
                    &nbsp;&nbsp;<span className="text-blue-400">event</span> <span className="text-yellow-400">Release</span>(address to, uint amount);<br/>
                    <span className="text-white">{`}`}</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none" />
         <div className="relative z-10 max-w-2xl mx-auto px-6">
           <h2 className="text-5xl font-bold mb-8 tracking-tight">Ready to verify reality?</h2>
           <Link 
             to="/dashboard"
             className="inline-block px-12 py-5 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
           >
             Launch PublicEye
           </Link>
         </div>
      </section>

    </div>
  );
}