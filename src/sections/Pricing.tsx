'use client';

import React, { useMemo, useCallback } from 'react';
import { Check } from 'lucide-react';
import { PRICING_PLANS, PricingPlan } from '../constants/pricing';
import { calculatePlanPrice, formatPrice } from '../utils/pricing';
import { BillingProvider, useBilling } from '../hooks/useBilling';
import { ScrollReveal } from '../components/ScrollReveal';

// Price Display Component - isolates re-renders on context changes
const PriceDisplay = React.memo<{ basePriceUSD: number }>(({ basePriceUSD }) => {
  const { billingCycle, currency } = useBilling();

  const priceString = useMemo(() => {
    const rawPrice = calculatePlanPrice(basePriceUSD, billingCycle, currency);
    return formatPrice(rawPrice, currency);
  }, [basePriceUSD, billingCycle, currency]);

  return (
    <div className="flex items-baseline gap-1.5 font-mono">
      <span
        key={priceString}
        className="text-4xl font-extrabold text-white tracking-tight animate-highlight-price"
      >
        {priceString}
      </span>
      <span className="text-brand-text-secondary text-xs font-sans uppercase tracking-widest font-semibold ml-1 opacity-70">
        / mo
      </span>
    </div>
  );
});
PriceDisplay.displayName = 'PriceDisplay';

// Billing Cycle Note - isolates yearly total re-renders
const BillingCycleNote = React.memo<{ basePriceUSD: number }>(({ basePriceUSD }) => {
  const { billingCycle, currency } = useBilling();

  const note = useMemo(() => {
    if (billingCycle === 'monthly') {
      return { text: 'Billed monthly', isAnnual: false };
    }
    const rawPrice = calculatePlanPrice(basePriceUSD, 'annual', currency);
    const yearlyTotal = formatPrice(rawPrice * 12, currency);
    return { text: `Billed annually (${yearlyTotal}/yr)`, isAnnual: true };
  }, [basePriceUSD, billingCycle, currency]);

  return (
    <div className="text-[10px] uppercase tracking-wider font-semibold h-4 mt-1">
      <span
        key={note.text}
        className={`inline-block animate-highlight-note ${
          note.isAnnual ? 'text-brand-accent font-mono' : 'text-brand-text-secondary opacity-65 font-sans'
        }`}
      >
        {note.text}
      </span>
    </div>
  );
});
BillingCycleNote.displayName = 'BillingCycleNote';

// Controls Component - localizes the billing and currency triggers
const PricingControls: React.FC = () => {
  const { billingCycle, currency, setBillingCycle, setCurrency } = useBilling();

  const handleMonthly = useCallback(() => setBillingCycle('monthly'), [setBillingCycle]);
  const handleAnnual = useCallback(() => setBillingCycle('annual'), [setBillingCycle]);

  const handleCurrencyUSD = useCallback(() => setCurrency('USD'), [setCurrency]);
  const handleCurrencyEUR = useCallback(() => setCurrency('EUR'), [setCurrency]);
  const handleCurrencyINR = useCallback(() => setCurrency('INR'), [setCurrency]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 select-none">
      {/* Billing Cycle Switch */}
      <div className="flex items-center p-1 rounded-lg bg-slate-950/80 border border-slate-800/60">
        <button
          onClick={handleMonthly}
          className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
            billingCycle === 'monthly'
              ? 'bg-slate-900 border border-slate-800/80 text-brand-text-primary'
              : 'text-brand-text-secondary opacity-60 hover:opacity-100'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={handleAnnual}
          className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
            billingCycle === 'annual'
              ? 'bg-slate-900 border border-slate-800/80 text-brand-accent'
              : 'text-brand-text-secondary opacity-60 hover:opacity-100'
          }`}
        >
          <span>Annual</span>
          <span className="px-1.5 py-0.5 bg-brand-accent/15 border border-brand-accent/25 text-[9px] font-mono text-brand-accent rounded">
            -20%
          </span>
        </button>
      </div>

      {/* Currency Switch */}
      <div className="flex items-center p-1 rounded-lg bg-slate-950/80 border border-slate-800/60">
        <button
          onClick={handleCurrencyUSD}
          className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all duration-150 cursor-pointer ${
            currency === 'USD'
              ? 'bg-slate-900 border border-slate-800/80 text-brand-text-primary'
              : 'text-brand-text-secondary opacity-60 hover:opacity-100'
          }`}
        >
          USD ($)
        </button>
        <button
          onClick={handleCurrencyEUR}
          className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all duration-150 cursor-pointer ${
            currency === 'EUR'
              ? 'bg-slate-900 border border-slate-800/80 text-brand-text-primary'
              : 'text-brand-text-secondary opacity-60 hover:opacity-100'
          }`}
        >
          EUR (€)
        </button>
        <button
          onClick={handleCurrencyINR}
          className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all duration-150 cursor-pointer ${
            currency === 'INR'
              ? 'bg-slate-900 border border-slate-800/80 text-brand-accent'
              : 'text-brand-text-secondary opacity-60 hover:opacity-100'
          }`}
        >
          INR (₹)
        </button>
      </div>
    </div>
  );
};

// Pricing Card Component
const PricingCard = React.memo<{ plan: PricingPlan }>(({ plan }) => {
  return (
    <div
      className={`glass-panel rounded-xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border hover:-translate-y-1.5 h-full ${
        plan.popular 
          ? 'border-brand-accent/50 bg-slate-900/40 shadow-2xl shadow-brand-accent/5' 
          : 'border-slate-800/80 hover:border-brand-accent-hover/30'
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-brand-accent to-brand-accent-hover text-slate-950 font-mono text-[9px] font-bold tracking-widest rounded-bl-lg uppercase">
          RECOMMENDED
        </div>
      )}
      <div className="flex-grow">
        <span className={`font-mono text-[10px] font-bold tracking-widest uppercase mb-2 block ${plan.popular ? 'text-brand-accent' : 'text-brand-text-secondary opacity-70'}`}>
          {plan.name}
        </span>
        <p className="text-xs text-brand-text-secondary leading-relaxed mb-6 min-h-[36px] font-sans">
          {plan.description}
        </p>

        <div className="mb-8">
          <PriceDisplay basePriceUSD={plan.basePriceUSD} />
          <BillingCycleNote basePriceUSD={plan.basePriceUSD} />
        </div>

        <div className="border-t border-slate-800/60 pt-6 mb-8">
          <ul className="space-y-3.5 text-xs text-brand-text-primary">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? 'text-brand-accent' : 'text-brand-accent-hover'}`} />
                <span className="font-sans">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
          plan.popular
            ? 'bg-gradient-to-r from-brand-accent to-brand-accent-hover hover:brightness-110 text-slate-950 shadow-lg shadow-brand-accent/10 hover:shadow-brand-accent/20'
            : 'bg-slate-900 border border-slate-800 hover:border-slate-700 text-brand-text-secondary hover:text-brand-text-primary'
        }`}
      >
        {plan.ctaText}
      </button>
    </div>
  );
});
PricingCard.displayName = 'PricingCard';

// Main Pricing Section Wrapper
export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-16 relative overflow-hidden border-t border-slate-900/60 scroll-mt-20">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent-hover/5 rounded-full blur-3xl pointer-events-none" />

      <BillingProvider>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[10px] font-mono font-bold tracking-widest text-brand-accent uppercase">
              <span>FLEXIBLE INFERENCE SCALE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text-primary tracking-tight">
              Pricing Driven By{' '}
              <span className="bg-gradient-to-r from-brand-accent to-brand-accent-hover bg-clip-text text-transparent">
                Compute.
            </span>
            </h2>
            <p className="text-sm text-brand-text-secondary leading-relaxed font-sans max-w-xl mx-auto">
              Choose a tier that fits your request frequency. Upgrade or scale down instantly with regional pricing options. Powered by NeuralOps.
            </p>
          </div>

          {/* Pricing Controls */}
          <PricingControls />

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {PRICING_PLANS.map((plan, idx) => (
              <ScrollReveal key={plan.id} animation="fade" delay={idx * 120} className="h-full">
                <PricingCard plan={plan} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </BillingProvider>
    </section>
  );
};
