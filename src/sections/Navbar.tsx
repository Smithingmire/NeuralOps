'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowRight, Bot } from 'lucide-react';

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
  { label: 'Features', href: '#features', id: 'features' },
  { label: 'Pricing', href: '#pricing', id: 'pricing' },
  { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const scrollPos = window.scrollY + 120;
      let currentSection = '';

      for (const link of NAV_LINKS) {
        const element = document.getElementById(link.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = link.id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger scroll check on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group font-mono text-sm font-bold tracking-wider text-slate-100 uppercase"
            onClick={closeMenu}
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent to-brand-accent-hover flex items-center justify-center border border-white/10 group-hover:border-brand-accent/50 transition-colors duration-200">
              <Bot className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute inset-0 rounded-lg bg-brand-accent/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:text-brand-accent transition-colors duration-200">
              NeuralOps
            </span>
            {/* <span className="text-brand-accent">AI</span> */}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-xs font-semibold uppercase tracking-widest transition-all duration-200 relative py-1.5 ${
                    isActive 
                      ? 'text-brand-accent' 
                      : 'text-brand-text-secondary opacity-70 hover:opacity-100 hover:text-brand-text-primary'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Underline Indicator */}
                  <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-accent transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#pricing"
              className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary hover:text-brand-text-primary transition-colors duration-150"
            >
              Sign In
            </a>
            <a
              href="#pricing"
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900/60 hover:bg-slate-900/90 border border-brand-accent/30 hover:border-brand-accent-hover text-xs font-bold uppercase tracking-wider text-brand-accent transition-all duration-200 select-none cursor-pointer"
            >
              <span>Launch Console</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="p-1.5 rounded-lg text-brand-text-secondary hover:text-brand-text-primary hover:bg-slate-900/40 border border-transparent hover:border-slate-800 transition-all duration-150"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass-panel border-t border-slate-800/80 transition-all duration-300 ease-in-out origin-top overflow-hidden ${
          isOpen ? 'opacity-100 scale-y-100 max-h-[400px]' : 'opacity-0 scale-y-0 max-h-0'
        }`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className={`text-sm font-semibold uppercase tracking-wider py-2 border-b border-slate-900/60 transition-colors duration-150 ${
                  isActive ? 'text-brand-accent' : 'text-brand-text-secondary hover:text-brand-text-primary'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-4 flex flex-col gap-3">
            <a
              href="#pricing"
              onClick={closeMenu}
              className="w-full text-center py-2.5 rounded-lg border border-slate-800 text-sm font-semibold uppercase tracking-wider text-brand-text-secondary hover:text-brand-text-primary transition-colors duration-150"
            >
              Sign In
            </a>
            <a
              href="#pricing"
              onClick={closeMenu}
              className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-brand-accent to-brand-accent-hover text-slate-950 font-bold uppercase tracking-wider text-xs transition-colors duration-150"
            >
              Launch Console
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
