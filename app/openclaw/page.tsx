'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowLeft, Bot, Zap, WifiOff, Shield, ArrowRight, Cpu, Radio, CheckCircle2, Twitter } from 'lucide-react';
import Image from 'next/image';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const useCases = [
  {
    icon: Bot,
    title: 'AI Cashier Agent',
    desc: 'OpenClaw agent receives payment instruction, Mikachan processes tap-to-pay in real-time.',
  },
  {
    icon: CheckCircle2,
    title: 'Merchant Verification',
    desc: 'Agent autonomously verifies customer payments without manual intervention.',
  },
  {
    icon: WifiOff,
    title: 'Offline Event Payments',
    desc: 'Transactions work even in poor signal areas — buffered locally, settled when back online.',
  },
  {
    icon: Zap,
    title: 'Autonomous Commerce',
    desc: 'Agent accepts orders then triggers payment settlement automatically on-chain.',
  },
];

const archSteps = [
  { label: 'User / Merchant / Device', icon: Radio, color: 'from-pink-400 to-mika-accent' },
  { label: 'OpenClaw Agent', icon: Bot, color: 'from-violet-400 to-purple-500' },
  { label: 'Mikachan SDK / API', icon: Cpu, color: 'from-mika-accent to-pink-400' },
  { label: 'ZK-NFC Intent', icon: Shield, color: 'from-pink-300 to-pink-500' },
  { label: 'x402 Settlement', icon: Zap, color: 'from-violet-300 to-violet-500' },
  { label: 'On-chain Finality', icon: CheckCircle2, color: 'from-green-400 to-emerald-500' },
];

const flowSteps = [
  {
    num: '01',
    title: 'User gives instruction',
    desc: '"Pay for coffee 3 USDC" or "Verify this customer payment."',
  },
  {
    num: '02',
    title: 'OpenClaw breaks down the task',
    desc: 'Check amount → select wallet → call Mikachan payment module → generate payment intent.',
  },
  {
    num: '03',
    title: 'Mikachan creates ZK Proof',
    desc: 'Zero-knowledge proof of funds generated locally, sent via NFC to merchant terminal.',
  },
  {
    num: '04',
    title: 'Offline buffer if needed',
    desc: 'If internet is down, transaction is buffered locally and settled when connection returns.',
  },
  {
    num: '05',
    title: 'x402 Settlement',
    desc: 'Smart contract verifies and executes the transfer automatically — no intermediaries.',
  },
];

export default function OpenClawPage() {
  return (
    <main className="min-h-screen bg-mika-bg text-mika-text font-space selection:bg-mika-accent/30 selection:text-mika-text overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-mika-bg/80 backdrop-blur-md border-b border-mika-accent/20 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-mika-text/70 hover:text-mika-accent transition-colors font-mono text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/mikachanos?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mika-text/60 hover:text-mika-accent transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <div className="font-mono text-xs uppercase tracking-widest border border-mika-accent/30 px-3 py-1 rounded-full bg-mika-accent/5 text-mika-accent">
              Integration
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-mika-accent/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Logos */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-6 mb-10"
          >
            <div className="flex items-center gap-3 bg-mika-surface border border-mika-accent/30 px-5 py-3 rounded-2xl">
              <Image src="/logo.jpg" alt="Mikachan" width={40} height={40} className="rounded-full" />
              <span className="font-space font-bold text-xl tracking-tighter">MIKACHAN</span>
            </div>
            <div className="text-3xl font-black text-mika-accent">×</div>
            <div className="flex items-center gap-3 bg-mika-surface border border-purple-400/40 px-5 py-3 rounded-2xl">
              <Image src="/openclaw-logo.png" alt="OpenClaw" width={40} height={40} className="object-contain" />
              <span className="font-space font-bold text-xl tracking-tighter">OPENCLAW</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6"
          >
            Autonomous{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mika-accent to-violet-500">
              Web3 Payment
            </span>{' '}
            Agents
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-mika-text/70 font-mono text-lg max-w-2xl mx-auto leading-relaxed"
          >
            OpenClaw handles reasoning and workflow orchestration.
            Mikachan powers private, offline-ready tap-to-pay with ZK-NFC and x402-secured settlement.
            Together — agents don&apos;t just talk, they execute real-world payments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4 mt-10"
          >
            <a
              href="https://x.com/mikachanos?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-mika-accent text-black font-bold font-mono tracking-widest uppercase text-sm hover:bg-pink-500 transition-colors flex items-center gap-2"
            >
              Follow Updates <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/transfer"
              className="px-8 py-3 border border-mika-accent/50 text-mika-accent font-bold font-mono tracking-widest uppercase text-sm hover:bg-mika-accent/10 transition-colors"
            >
              Try Transfer
            </a>
          </motion.div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-24 px-6 bg-mika-surface/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="font-mono text-xs text-mika-accent uppercase tracking-widest border border-mika-accent/40 px-3 py-1 rounded-full">Architecture</span>
            <h2 className="text-4xl font-black tracking-tighter uppercase mt-4">How It Flows</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-0 flex-wrap">
            {archSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex flex-col md:flex-row items-center">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    variants={fadeUp}
                    className="flex flex-col items-center text-center"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-3 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="font-mono text-xs text-mika-text/70 max-w-[100px] leading-tight">{step.label}</span>
                  </motion.div>
                  {i < archSteps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-mika-accent/40 mx-3 my-3 md:my-0 rotate-90 md:rotate-0 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flow Steps */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="font-mono text-xs text-mika-accent uppercase tracking-widest border border-mika-accent/40 px-3 py-1 rounded-full">Flow</span>
            <h2 className="text-4xl font-black tracking-tighter uppercase mt-4">Step by Step</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-mika-accent via-violet-400 to-transparent hidden md:block" />
            <div className="space-y-8">
              {flowSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className="flex gap-6 items-start"
                >
                  <div className="w-16 h-16 rounded-2xl bg-mika-surface border border-mika-accent/30 flex items-center justify-center shrink-0 relative z-10">
                    <span className="font-mono font-black text-mika-accent text-sm">{step.num}</span>
                  </div>
                  <div className="bg-mika-surface/50 border border-mika-text/10 rounded-2xl p-6 flex-1">
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="font-mono text-sm text-mika-text/60 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why it fits */}
      <section className="py-24 px-6 bg-mika-surface/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="font-mono text-xs text-mika-accent uppercase tracking-widest border border-mika-accent/40 px-3 py-1 rounded-full">Why It Works</span>
            <h2 className="text-4xl font-black tracking-tighter uppercase mt-4">OpenClaw needs an execution layer.<br />Mikachan is it.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: 'Privacy-first payment flow', icon: Shield },
              { label: 'Offline-ready commerce', icon: WifiOff },
              { label: 'Autonomous settlement', icon: Zap },
              { label: 'Physical tap-to-pay for Web3', icon: Radio },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className="flex items-center gap-4 bg-mika-bg border border-mika-accent/20 rounded-2xl p-5 hover:border-mika-accent/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-mika-accent/10 border border-mika-accent/30 flex items-center justify-center shrink-0 group-hover:bg-mika-accent/20 transition-colors">
                    <Icon className="w-5 h-5 text-mika-accent" />
                  </div>
                  <span className="font-mono text-sm font-bold">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="font-mono text-xs text-mika-accent uppercase tracking-widest border border-mika-accent/40 px-3 py-1 rounded-full">Use Cases</span>
            <h2 className="text-4xl font-black tracking-tighter uppercase mt-4">Real-world Applications</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className="bg-mika-surface/50 border border-mika-text/10 rounded-2xl p-7 hover:border-mika-accent/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mika-accent to-violet-500 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="font-mono text-sm text-mika-text/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mika-accent/10 via-transparent to-violet-500/10" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-5xl font-black tracking-tighter uppercase mb-6">
            The Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mika-accent to-violet-500">
              Autonomous Commerce
            </span>
          </h2>
          <p className="font-mono text-mika-text/70 mb-10 text-lg leading-relaxed">
            Agents don&apos;t just talk — they execute real-world payments with private, offline-ready, x402-secured settlement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://x.com/mikachanos?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-mika-accent text-black font-bold font-mono tracking-widest uppercase hover:bg-pink-500 transition-colors flex items-center gap-2"
            >
              <Twitter className="w-4 h-4" /> Follow @mikachanos
            </a>
            <a
              href="/"
              className="px-10 py-4 border border-mika-text/20 hover:border-mika-accent hover:text-mika-accent transition-colors font-mono font-bold uppercase tracking-widest text-sm"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-mika-text/5 font-mono text-xs text-mika-text/40 text-center">
        &copy; {new Date().getFullYear()} Mikachan Protocol — OpenClaw Integration Concept
      </footer>
    </main>
  );
}
