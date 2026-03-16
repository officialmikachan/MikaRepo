'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, WifiOff } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 z-0"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mika-accent/20 rounded-full blur-[120px] z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-900/30 rounded-full blur-[150px] z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-mika-accent/30 bg-mika-accent/5 text-mika-accent font-mono text-xs uppercase tracking-widest mb-8 box-glow"
        >
          <span className="w-2 h-2 rounded-full bg-mika-accent animate-pulse"></span>
          Web3 Payments Reimagined
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-space font-black tracking-tighter text-mika-text mb-6 uppercase leading-[0.9]"
        >
          Take Back Control <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-mika-accent to-pink-400 text-glow">
            Of Payments
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto text-mika-text/70 text-lg md:text-xl font-mono leading-relaxed mb-12"
        >
          Mikachan powers private, offline-ready tap-to-pay for Web3. ZK-NFC transactions, x402-secured settlement, and autonomous payment verification—without intermediaries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href="https://www.elizacloud.ai/chat/@mikachan" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-mika-accent text-black font-bold font-mono tracking-widest uppercase text-sm clip-path-tech overflow-hidden w-full sm:w-auto inline-block text-center">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Mikachan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-mika-text/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          </a>
          
          <a href="/whitepaper" className="group px-8 py-4 bg-transparent text-mika-text font-bold font-mono tracking-widest uppercase text-sm border border-mika-text/20 hover:border-mika-accent hover:text-mika-accent transition-all clip-path-tech-alt w-full sm:w-auto inline-block text-center">
            Read Whitepaper
          </a>
        </motion.div>

        {/* Tech Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
            <WifiOff className="w-5 h-5 text-mika-accent" /> Offline Ready
          </div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
            <Shield className="w-5 h-5 text-mika-accent" /> ZK-NFC Tech
          </div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
            <Zap className="w-5 h-5 text-mika-accent" /> x402 Secured
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mika-accent">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-mika-accent to-transparent"></div>
      </motion.div>
    </section>
  );
}
