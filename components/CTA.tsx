'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-32 relative bg-mika-bg overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mika-accent/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border border-mika-accent/30 bg-mika-bg/50 backdrop-blur-xl p-12 md:p-20 clip-path-tech-alt relative overflow-hidden group"
        >
          {/* Animated Border Glow */}
          <div className="absolute inset-0 border border-mika-accent/0 group-hover:border-mika-accent/50 transition-colors duration-1000 pointer-events-none"></div>
          
          <Terminal className="w-16 h-16 text-mika-accent mx-auto mb-8 opacity-80" />
          
          <h2 className="text-4xl md:text-6xl font-space font-black tracking-tighter text-mika-text uppercase mb-6">
            Ready to <span className="text-mika-accent text-glow">Integrate?</span>
          </h2>
          
          <p className="text-mika-text/70 font-mono text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Join the revolution of decentralized, privacy-preserving physical payments. Get early access to the Mikachan SDK and start building the future of commerce.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative px-10 py-5 bg-mika-accent text-black font-bold font-mono tracking-widest uppercase text-sm clip-path-tech overflow-hidden w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Request API Key <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-mika-text/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
            
            <a href="/docs" className="group px-10 py-5 bg-transparent text-mika-text font-bold font-mono tracking-widest uppercase text-sm border border-mika-text/20 hover:border-mika-accent hover:text-mika-accent transition-all clip-path-tech-alt w-full sm:w-auto inline-block text-center">
              View Documentation
            </a>
          </div>
          
          {/* Decorative Corner Elements */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-mika-accent/50"></div>
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-mika-accent/50"></div>
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-mika-accent/50"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-mika-accent/50"></div>
        </motion.div>
      </div>
    </section>
  );
}
