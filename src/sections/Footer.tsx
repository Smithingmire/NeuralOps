'use client';

import React from 'react';
import { Bot, MessageSquare } from 'lucide-react';

const LINKS_PRODUCT = [
  { label: 'Inference Specs', href: '#features' },
  { label: 'Agent Routing', href: '#features' },
  { label: 'Pricing Plans', href: '#pricing' },
  { label: 'Security Sandbox', href: '#features' },
];

const LINKS_RESOURCES = [
  { label: 'API Reference', href: '#pricing' },
  { label: 'System Status', href: '#' },
  { label: 'GitHub Organization', href: '#' },
  { label: 'Core Whitepaper', href: '#' },
];

const LINKS_COMPANY = [
  { label: 'About Us', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Press Kit', href: '#' },
  { label: 'Contact Support', href: '#' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 pt-16 pb-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/60">
          
          {/* Logo & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-slate-100 uppercase">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent to-brand-accent-hover flex items-center justify-center border border-white/10">
                <Bot className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-brand-text-primary">NeuralOps</span>
            </a>
            <p className="text-xs text-brand-text-secondary leading-relaxed max-w-sm font-sans">
              Deploy complex multi-agent intelligence and high-throughput vector pipelines at sub-50ms latency. The cognitive backbone for next-generation systems.
            </p>
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-950/20 border border-emerald-500/20 text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Links: Product */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-brand-text-primary uppercase tracking-widest mb-4">Product</h4>
            <ul className="space-y-2">
              {LINKS_PRODUCT.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-xs text-brand-text-secondary hover:text-brand-accent transition-colors duration-150 font-sans">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Resources */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-brand-text-primary uppercase tracking-widest mb-4">Resources</h4>
            <ul className="space-y-2">
              {LINKS_RESOURCES.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-xs text-brand-text-secondary hover:text-brand-accent transition-colors duration-150 font-sans">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Company */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-brand-text-primary uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2">
              {LINKS_COMPANY.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-xs text-brand-text-secondary hover:text-brand-accent transition-colors duration-150 font-sans">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono text-brand-text-secondary opacity-60 tracking-wider">
            &copy; {new Date().getFullYear()} NEURALOPS TECHNOLOGIES INC. ALL RIGHTS RESERVED.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="p-1.5 rounded bg-slate-900 border border-slate-800 text-brand-text-secondary hover:text-brand-accent hover:border-brand-accent/40 hover:scale-110 transition-all duration-200" aria-label="GitHub">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a href="#" className="p-1.5 rounded bg-slate-900 border border-slate-800 text-brand-text-secondary hover:text-brand-accent hover:border-brand-accent/40 hover:scale-110 transition-all duration-200" aria-label="Twitter">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" className="p-1.5 rounded bg-slate-900 border border-slate-800 text-brand-text-secondary hover:text-brand-accent hover:border-brand-accent/40 hover:scale-110 transition-all duration-200" aria-label="Discord">
              <MessageSquare className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
