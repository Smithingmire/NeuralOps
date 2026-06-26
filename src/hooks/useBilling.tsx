'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

type BillingCycle = 'monthly' | 'annual';
type CurrencyCode = 'USD' | 'EUR' | 'INR';

interface BillingContextProps {
  billingCycle: BillingCycle;
  currency: CurrencyCode;
  setBillingCycle: (cycle: BillingCycle) => void;
  setCurrency: (currency: CurrencyCode) => void;
}

const BillingContext = createContext<BillingContextProps | undefined>(undefined);

export const BillingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [billingCycle, setBillingCycleState] = useState<BillingCycle>('monthly');
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');

  const setBillingCycle = useCallback((cycle: BillingCycle) => {
    setBillingCycleState(cycle);
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
  }, []);

  // Memoize context value to prevent unnecessary re-renders of consuming components
  const value = useMemo(
    () => ({
      billingCycle,
      currency,
      setBillingCycle,
      setCurrency,
    }),
    [billingCycle, currency, setBillingCycle, setCurrency]
  );

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
};

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context;
};
