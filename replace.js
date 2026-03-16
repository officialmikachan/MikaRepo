const fs = require('fs');

const files = [
  './app/globals.css',
  './app/layout.tsx',
  './app/page.tsx',
  './app/whitepaper/page.tsx',
  './components/Navbar.tsx',
  './components/Hero.tsx',
  './components/Features.tsx',
  './components/HowItWorks.tsx',
  './components/CTA.tsx',
  './components/Footer.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace variables
  content = content.replace(/mika-green/g, 'mika-accent');
  content = content.replace(/mika-dark/g, 'mika-bg');
  content = content.replace(/mika-gray/g, 'mika-surface');
  content = content.replace(/mika-light/g, 'mika-text');
  
  // Replace hardcoded colors
  content = content.replace(/bg-black/g, 'bg-mika-bg');
  content = content.replace(/text-white/g, 'text-mika-text');
  content = content.replace(/text-gray-400/g, 'text-mika-text/70');
  content = content.replace(/text-gray-500/g, 'text-mika-text/60');
  content = content.replace(/text-gray-300/g, 'text-mika-text/80');
  content = content.replace(/border-white\/10/g, 'border-mika-text/10');
  content = content.replace(/border-white\/20/g, 'border-mika-text/20');
  content = content.replace(/border-white\/5/g, 'border-mika-text/5');
  content = content.replace(/bg-white\/20/g, 'bg-mika-text/20');
  content = content.replace(/text-white\/5/g, 'text-mika-text/5');
  content = content.replace(/to-emerald-400/g, 'to-pink-400');
  content = content.replace(/bg-emerald-900\/30/g, 'bg-pink-900/30');
  
  fs.writeFileSync(file, content);
});

console.log('Replacement complete');
