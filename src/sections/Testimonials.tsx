'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarLetter: string;
  stars: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: 'The sub-50ms latency is not marketing. We migrated our entire autonomous coding agent swarm to NeuralOps and saw our raw token bill decrease by 74% in under three weeks.',
    author: 'Elena Rostova',
    role: 'VP of AI Systems',
    company: 'Aether Cognitive',
    avatarLetter: 'ER',
    stars: 5,
  },
  {
    id: 2,
    quote: 'NeuralOps’s semantic edge caching is spectacular. Handling 90%+ of redundant reasoning queries at the CDN level reduced our dependency on central model clusters and solved rate-limiting.',
    author: 'Marcus Vance',
    role: 'Principal Infra Architect',
    company: 'Nexus Flow',
    avatarLetter: 'MV',
    stars: 5,
  },
  {
    id: 3,
    quote: 'Deploying agent execution sandboxes was our biggest regulatory hurdle. NeuralOps’s secure micro-VM sandbox solved SOC-2 and HIPAA isolation compliance concerns instantly.',
    author: 'Siddharth Mehta',
    role: 'Chief Security Officer',
    company: 'Synapse Quantum',
    avatarLetter: 'SM',
    stars: 5,
  },
  {
    id: 4,
    quote: 'We run real-time inference on nested compiler trees. The ability to cache state nodes globally at the edge without database calls cut cold-starts to absolute zero.',
    author: 'Laura Dubois',
    role: 'Lead ML Engineer',
    company: 'Vertex Systems',
    avatarLetter: 'LD',
    stars: 5,
  },
  {
    id: 5,
    quote: 'Our enterprise pipelines handle sensitive financial transactions. The static micro-VM isolation guarantee allowed us to run untrusted python plugins securely.',
    author: 'Kenji Sato',
    role: 'Director of Platforms',
    company: 'Cyberdyne Labs',
    avatarLetter: 'KS',
    stars: 5,
  },
  {
    id: 6,
    quote: 'The developer experience is stellar. Swapping our multi-agent stack to NeuralOps took less than 48 hours and we got sub-50ms global latency out-of-the-box.',
    author: 'Sophia Jenkins',
    role: 'Founder',
    company: 'Vector Edge',
    avatarLetter: 'SJ',
    stars: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 relative overflow-hidden border-t border-slate-900/60 scroll-mt-20">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[10px] font-mono font-bold tracking-widest text-brand-accent uppercase">
            <span>PROVEN IN PRODUCTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text-primary tracking-tight">
            Trusted by the{' '}
            <span className="bg-gradient-to-r from-brand-accent to-brand-accent-hover bg-clip-text text-transparent">
              Best Builders.
            </span>
          </h2>
          <p className="text-sm text-brand-text-secondary leading-relaxed font-sans max-w-xl mx-auto">
            Hear from deep-tech engineering leaders building mission-critical agent infrastructure on top of NeuralOps.
          </p>
        </div>

        {/* Testimonials Auto-Scrolling Marquee Row */}
        <ScrollReveal animation="fade">
          <div className="relative w-full overflow-hidden py-4 select-none">
            {/* Fading Edge Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-bg to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-bg to-transparent pointer-events-none z-10" />

            <div className="animate-marquee-left flex gap-8">
              {/* Double up the list for a seamless loop */}
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                <div
                  key={`${t.id}-${idx}`}
                  className="w-[350px] shrink-0 glass-panel rounded-xl p-6 flex flex-col justify-between border border-slate-800/80 relative bg-slate-900/10 hover:border-brand-accent-hover/30 hover:bg-slate-900/25 transition-all duration-300"
                >
                  <Quote className="absolute top-6 right-6 w-7 h-7 text-slate-800/20 pointer-events-none" />
                  
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-5">
                      {[...Array(t.stars)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-brand-accent fill-brand-accent/25" />
                      ))}
                    </div>

                    <p className="text-[11px] text-brand-text-secondary leading-relaxed italic mb-8 font-sans">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Profile */}
                  <div className="flex items-center gap-3 border-t border-slate-800/40 pt-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent/10 to-brand-accent-hover/20 border border-brand-accent/20 flex items-center justify-center font-mono text-[10px] font-bold text-brand-accent shrink-0">
                      {t.avatarLetter}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[11px] font-bold text-brand-text-primary uppercase tracking-wider truncate">{t.author}</h4>
                      <p className="text-[9px] text-brand-text-secondary opacity-70 font-mono truncate mt-0.5">
                        {t.role}, <span className="text-brand-accent">{t.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
