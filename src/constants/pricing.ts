export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  basePriceUSD: number;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  multiplier: number;
  format: string;
  regionalDiscountMultiplier?: number;
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    multiplier: 1.0,
    format: 'en-US',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    multiplier: 0.92,
    format: 'en-IE',
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    multiplier: 83.0,
    format: 'en-IN',
    regionalDiscountMultiplier: 0.6, // 40% PPP regional discount
  },
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Essential AI capabilities for developers and early-stage ideas.',
    basePriceUSD: 20,
    features: [
      '10,000 generation credits / mo',
      'Access to Llama 3 & GPT-4o Mini',
      'Rate limit: 60 requests / minute',
      'Standard community support',
      '1 shared project workspace',
    ],
    ctaText: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Advanced reasoning and dedicated scale for growing products.',
    basePriceUSD: 59,
    features: [
      '250,000 generation credits / mo',
      'Access to Claude 3.5 Sonnet & GPT-4o',
      'Rate limit: 600 requests / minute',
      'Priority slack support (4h response)',
      '10 workspace collaborators',
      'Advanced telemetry & analytics',
    ],
    ctaText: 'Upgrade to Pro',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom fine-tuning, isolated clusters, and premium SLAs.',
    basePriceUSD: 199,
    features: [
      'Unlimited generation credits',
      'Isolated VPC model endpoints',
      'Zero rate limits with custom quotas',
      '24/7 dedicated support team',
      'Unlimited workspace members',
      'SAML SSO & SOC-2 compliance',
      'Custom API integration assistance',
    ],
    ctaText: 'Talk to Sales',
  },
];
