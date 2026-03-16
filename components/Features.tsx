'use client';

import { motion } from 'framer-motion';
import { WifiOff, ShieldCheck, Zap, Cpu, Lock, SmartphoneNfc } from 'lucide-react';

const features = [
  {
    icon: <SmartphoneNfc className="w-8 h-8 text-mika-accent" />,
    title: 'ZK-NFC Transactions',
    description: 'Zero-knowledge proofs embedded directly into NFC interactions. Prove payment capability without revealing your balance or identity.',
  },
  {
    icon: <WifiOff className="w-8 h-8 text-mika-accent" />,
    title: 'Offline-Ready',
    description: 'Transact anywhere. Mikachan buffers signed intents locally and settles them autonomously when connectivity is restored.',
  },
  {
    icon: <Lock className="w-8 h-8 text-mika-accent" />,
    title: 'x402-Secured Settlement',
    description: 'Leveraging the x402 protocol for cryptographically guaranteed settlement. No chargebacks, no intermediaries, pure math.',
  },
  {
    icon: <Cpu className="w-8 h-8 text-mika-accent" />,
    title: 'Autonomous Verification',
    description: 'Smart contracts handle the heavy lifting. Payments are verified and settled on-chain without human intervention or centralized servers.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-mika-accent" />,
    title: 'Privacy First',
    description: 'Your financial data is yours. Mikachan ensures complete transactional privacy while maintaining regulatory compliance via selective disclosure.',
  },
  {
    icon: <Zap className="w-8 h-8 text-mika-accent" />,
    title: 'Instant Finality',
    description: 'Experience Web2 speeds with Web3 security. Optimistic local finality combined with robust on-chain settlement.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-32 relative bg-mika-bg overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mika-accent/50 to-transparent"></div>
      <div className="absolute -left-64 top-1/4 w-96 h-96 bg-mika-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-space font-black tracking-tighter text-mika-text uppercase mb-4"
          >
            Core <span className="text-mika-accent">Architecture</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-mika-text/70 font-mono max-w-2xl mx-auto"
          >
            Built for the decentralized future. Mikachan combines cutting-edge cryptography with seamless hardware integration.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-mika-surface/50 border border-mika-text/10 p-8 hover:border-mika-accent/50 transition-all duration-300 clip-path-tech-alt backdrop-blur-sm"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-mika-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="mb-6 p-4 bg-mika-bg/50 inline-block rounded-xl border border-mika-text/5 group-hover:border-mika-accent/30 transition-colors">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-space font-bold text-mika-text mb-4 group-hover:text-mika-accent transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-mika-text/70 font-mono text-sm leading-relaxed">
                {feature.description}
              </p>
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-mika-accent transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-transparent group-hover:border-mika-accent transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
