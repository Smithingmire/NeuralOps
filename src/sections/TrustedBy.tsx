'use client';

import React from 'react';
import { ScrollReveal } from '../components/ScrollReveal';

const LOGOS = [
  { name: 'Aether Cognitive', id: 'aether' },
  { name: 'Vertex Systems', id: 'vertex' },
  { name: 'Synapse Quantum', id: 'synapse' },
  { name: 'Vector Edge', id: 'vector' },
  { name: 'Nexus Flow', id: 'nexus' },
];

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-12 border-y border-slate-800/60 bg-slate-900/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade">
          <div className="flex flex-col items-center space-y-6">
            <p className="text-[10px] font-mono font-bold tracking-widest text-brand-text-secondary opacity-60 uppercase">
              POWERING AI MISSION-CRITICAL INFRASTRUCTURE AT SCALE
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 w-full opacity-70">
              {LOGOS.map((logo) => (
                <div
                  key={logo.id}
                  className="flex items-center gap-2 group cursor-pointer hover:opacity-100 transition-opacity duration-200"
                >
                  <svg
                    className="w-4 h-4 text-brand-text-secondary group-hover:text-brand-accent transition-colors duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {logo.id === 'aether' && (
                      <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                    )}
                    {logo.id === 'vertex' && (
                      <path d="M12,2 L2,22 L22,22 Z M12,6 L19,19 L5,19 Z" />
                    )}
                    {logo.id === 'synapse' && (
                      <>
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12,2 L12,7 M12,17 L12,22 M2,12 L7,12 M17,12 L22,12" />
                      </>
                    )}
                    {logo.id === 'vector' && (
                      <path d="M3,12 L12,3 L21,12 L12,21 Z M8,12 L12,8 L16,12 L12,16 Z" />
                    )}
                    {logo.id === 'nexus' && (
                      <path d="M4,4 L20,4 L20,20 L4,20 Z M8,8 L16,16 M16,8 L8,16" />
                    )}
                  </svg>
                  <span className="font-mono text-[11px] font-bold tracking-wider text-brand-text-secondary group-hover:text-brand-text-primary transition-colors duration-200 uppercase">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
