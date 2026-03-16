'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Twitter } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-mika-bg/80 backdrop-blur-md border-b border-mika-accent/20 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Image src="/logo.jpg" alt="Mikachan" width={36} height={36} className="rounded-full" />
          </motion.div>
          <span className="font-space font-bold text-2xl tracking-tighter text-mika-text group-hover:text-mika-accent transition-colors">
            MIKACHAN
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          {['Features', 'Technology', 'Security'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-mika-text/70 hover:text-mika-accent transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-mika-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="/docs"
            className="text-mika-text/70 hover:text-mika-accent transition-colors relative group"
          >
            Docs
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-mika-accent transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/agent"
            className="text-mika-text/70 hover:text-mika-accent transition-colors relative group font-bold"
          >
            AI Agent
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-mika-accent transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/openclaw"
            className="text-mika-text/70 hover:text-mika-accent transition-colors relative group"
          >
            OpenClaw
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-mika-accent transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="https://x.com/mikachanos?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mika-text/70 hover:text-mika-accent transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="/transfer"
            className="px-6 py-2 bg-mika-accent/10 text-mika-accent border border-mika-accent/50 hover:bg-mika-accent hover:text-black transition-all font-bold tracking-widest uppercase text-xs clip-path-tech inline-block"
          >
            Launch App
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-mika-accent"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-mika-bg border-b border-mika-accent/20"
        >
          <div className="flex flex-col px-6 py-4 gap-4 font-mono text-sm">
            {['Features', 'Technology', 'Security'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-mika-text/70 hover:text-mika-accent py-2 border-b border-mika-text/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="/docs"
              className="text-mika-text/70 hover:text-mika-accent py-2 border-b border-mika-text/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </a>
            <a
              href="/agent"
              className="text-mika-text/70 hover:text-mika-accent py-2 border-b border-mika-text/5 font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Agent
            </a>
            <a
              href="/openclaw"
              className="text-mika-text/70 hover:text-mika-accent py-2 border-b border-mika-text/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              OpenClaw
            </a>
            <a
              href="https://x.com/mikachanos?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mika-text/70 hover:text-mika-accent py-2 border-b border-mika-text/5 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Twitter className="w-4 h-4" /> Twitter / X
            </a>
            <a href="/transfer" className="mt-4 px-6 py-3 bg-mika-accent text-black font-bold tracking-widest uppercase text-xs clip-path-tech w-full text-center block">
              Launch App
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
