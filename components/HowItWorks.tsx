'use client';

import { motion } from 'framer-motion';
import { Smartphone, Radio, Database, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: <Smartphone className="w-10 h-10 text-black" />,
    title: 'Initiate Intent',
    description: 'User taps their device. Mikachan generates a zero-knowledge proof of funds locally.',
    delay: 0.2,
  },
  {
    icon: <Radio className="w-10 h-10 text-black" />,
    title: 'NFC Transmission',
    description: 'The ZK-proof and transaction intent are securely transmitted via NFC to the merchant terminal.',
    delay: 0.4,
  },
  {
    icon: <Database className="w-10 h-10 text-black" />,
    title: 'x402 Settlement',
    description: 'The terminal buffers the transaction. Upon connection, it settles autonomously via the x402 protocol.',
    delay: 0.6,
  },
  {
    icon: <CheckCircle2 className="w-10 h-10 text-black" />,
    title: 'Finality Reached',
    description: 'Smart contracts verify the proof and execute the transfer. No intermediaries involved.',
    delay: 0.8,
  },
];

export default function HowItWorks() {
  return (
    <section id="technology" className="py-32 relative bg-mika-bg overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern-accent opacity-[0.03] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-space font-black tracking-tighter text-mika-text uppercase mb-4"
          >
            The <span className="text-mika-accent">Protocol</span> Flow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-mika-text/70 font-mono max-w-2xl mx-auto"
          >
            A seamless bridge between physical interactions and decentralized ledgers.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-mika-surface -translate-y-1/2 z-0">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-full bg-mika-accent box-glow"
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: step.delay }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Step Number */}
                <div className="absolute -top-10 font-space font-black text-6xl text-mika-text/5 group-hover:text-mika-accent/20 transition-colors duration-500 pointer-events-none">
                  0{index + 1}
                </div>
                
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-24 h-24 bg-mika-accent rounded-2xl flex items-center justify-center mb-8 clip-path-tech shadow-[0_0_30px_rgba(255,20,147,0.3)] group-hover:shadow-[0_0_50px_rgba(255,20,147,0.6)] transition-shadow duration-300"
                >
                  {step.icon}
                </motion.div>
                
                <h3 className="text-xl font-space font-bold text-mika-text mb-4 group-hover:text-mika-accent transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-mika-text/70 font-mono text-sm leading-relaxed max-w-[250px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
