'use client';

import React, { useState, useRef } from 'react';
import { ArrowRight, Bot, Cpu } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export const CTA: React.FC = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      id="console" 
      className="py-16 relative overflow-hidden border-t border-slate-900/60 scroll-mt-20 bg-[#172B36]"
    >
      
      {/* 1. Immersive Multi-layer Background Infrastructure */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Layer 1: Blurred radial gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-20 w-[450px] h-[450px] bg-brand-accent-hover/5 rounded-full blur-3xl animate-pulse-slow" />
        
        {/* Layer 2: Fine coordinate grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-45" />

        {/* Layer 3: Concentric Radar rings in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-brand-accent/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-brand-accent-hover/5 border-dashed pointer-events-none" />

        {/* Layer 4: Advanced SVG Constellation Network */}
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          {/* Faint network lines */}
          <line x1="15%" y1="30%" x2="35%" y2="20%" stroke="#114C5A" strokeWidth="1" />
          <line x1="35%" y1="20%" x2="50%" y2="40%" stroke="#114C5A" strokeWidth="1" />
          <line x1="50%" y1="40%" x2="70%" y2="30%" stroke="#114C5A" strokeWidth="1" />
          <line x1="70%" y1="30%" x2="85%" y2="60%" stroke="#114C5A" strokeWidth="1" />
          <line x1="15%" y1="70%" x2="30%" y2="80%" stroke="#114C5A" strokeWidth="1" />
          <line x1="30%" y1="80%" x2="65%" y2="70%" stroke="#114C5A" strokeWidth="1" />
          
          {/* Animated data pulses along network */}
          <circle cx="15%" cy="30%" r="3" fill="#FFC801" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="35%" cy="20%" r="2" fill="#FF9932" />
          <circle cx="50%" cy="40%" r="4" fill="#FFC801" className="animate-pulse" />
          <circle cx="70%" cy="30%" r="2" fill="#FF9932" />
          <circle cx="85%" cy="60%" r="3" fill="#FFC801" className="animate-ping" style={{ animationDuration: '4s' }} />
          <circle cx="30%" cy="80%" r="2.5" fill="#FF9932" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="scale">
          {/* Main Card with Corner Cuts, Laser Scanners, and Cursor Spotlight */}
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="glass-panel p-8 sm:p-12 lg:p-16 border border-brand-accent/20 hover:border-brand-accent/35 text-center relative overflow-hidden transition-all duration-300 bg-slate-900/15 rounded-3xl"
          >
            
            {/* 2. Interactive Spotlight Glow (Follows Cursor) */}
            {isHovered && (
              <div
                className="absolute pointer-events-none inset-0 transition-opacity duration-300 z-0"
                style={{
                  background: `radial-gradient(circle 380px at ${coords.x}px ${coords.y}px, rgba(255, 200, 1, 0.08), transparent 80%)`,
                }}
              />
            )}

            {/* Cybernetic Laser Scan Bar */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-accent/35 to-transparent top-0 animate-[laser-scan_4.5s_linear_infinite] pointer-events-none z-10" />
            
            <style>{`
              @keyframes laser-scan {
                0% { top: 0%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 100%; opacity: 0; }
              }
            `}</style>

            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              {/* Tech Icon Group */}
              <div className="flex justify-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform duration-300">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-brand-accent-hover group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text-primary leading-tight font-mono">
                Ready to deploy your first{' '}
                <span className="bg-gradient-to-r from-brand-accent to-brand-accent-hover bg-clip-text text-transparent">
                  Autonomous Agent?
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm text-brand-text-secondary leading-relaxed font-sans max-w-xl mx-auto opacity-90">
                Get started on our serverless edge clusters today. Free tier includes 10,000 monthly inference credits, with no credit card required.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="#pricing"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-brand-accent to-brand-accent-hover hover:brightness-110 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-brand-accent/25 hover:scale-[1.01] transition-all duration-150 select-none cursor-pointer"
                >
                  <span>Launch Cloud Console</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
                </a>
                <a
                  href="#pricing"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-brand-text-secondary font-semibold uppercase tracking-wider text-xs transition-all duration-150 cursor-pointer"
                >
                  <span>Talk to AI Architect</span>
                </a>
              </div>

              {/* Security Notice */}
              <div className="pt-6 font-mono text-[9px] text-brand-text-secondary opacity-60 tracking-wider flex items-center justify-center gap-4 flex-wrap">
                <span>SOC-2 CERTIFIED</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                <span>HIPAA BAA AVAILABLE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                <span>99.99% UP-TIME SLA</span>
              </div>

            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
