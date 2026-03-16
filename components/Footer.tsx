'use client';

import { Hexagon, Twitter, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-mika-bg border-t border-mika-accent/20 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6 group cursor-pointer w-max">
            <Hexagon className="w-8 h-8 text-mika-accent group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-space font-bold text-2xl tracking-tighter text-mika-text group-hover:text-mika-accent transition-colors">
              MIKACHAN
            </span>
          </div>
          <p className="text-mika-text/60 font-mono text-sm leading-relaxed max-w-sm mb-8">
            Building the foundation for private, offline-ready, and autonomous physical payments in the Web3 ecosystem.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-mika-surface flex items-center justify-center text-mika-text/70 hover:text-mika-accent hover:bg-mika-accent/10 transition-all border border-transparent hover:border-mika-accent/50">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-mika-surface flex items-center justify-center text-mika-text/70 hover:text-mika-accent hover:bg-mika-accent/10 transition-all border border-transparent hover:border-mika-accent/50">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="font-space font-bold text-mika-text uppercase tracking-widest mb-6">Protocol</h4>
          <ul className="space-y-4 font-mono text-sm">
            <li><a href="#" className="text-mika-text/60 hover:text-mika-accent transition-colors">Architecture</a></li>
            <li><a href="#" className="text-mika-text/60 hover:text-mika-accent transition-colors">ZK-NFC Specs</a></li>
            <li><a href="#" className="text-mika-text/60 hover:text-mika-accent transition-colors">x402 Settlement</a></li>
            <li><a href="/whitepaper" className="text-mika-text/60 hover:text-mika-accent transition-colors">Whitepaper</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="font-space font-bold text-mika-text uppercase tracking-widest mb-6">Resources</h4>
          <ul className="space-y-4 font-mono text-sm">
            <li><a href="/docs" className="text-mika-text/60 hover:text-mika-accent transition-colors">Documentation</a></li>
            <li><a href="#" className="text-mika-text/60 hover:text-mika-accent transition-colors">Developer SDK</a></li>
            <li><a href="#" className="text-mika-text/60 hover:text-mika-accent transition-colors">GitHub Repo</a></li>
            <li><a href="#" className="text-mika-text/60 hover:text-mika-accent transition-colors">Security Audits</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-mika-text/5 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} Mikachan Protocol. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-mika-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-mika-accent transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
