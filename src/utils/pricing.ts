import { CURRENCIES as CurrenciesRecord } from '../constants/pricing';

export function calculatePlanPrice(
  basePriceUSD: number,
  billingCycle: 'monthly' | 'annual',
  currencyCode: string
): number {
  const currency = CurrenciesRecord[currencyCode] || CurrenciesRecord.USD;
  const regionalMultiplier = currency.regionalDiscountMultiplier || 1.0;
  
  // Calculate raw monthly price in target currency
  let calculatedMonthlyPrice = basePriceUSD * currency.multiplier * regionalMultiplier;
  
  if (billingCycle === 'annual') {
    // Apply 20% discount
    calculatedMonthlyPrice = calculatedMonthlyPrice * 0.8;
  }
  
  // Round to make prices look premium and clean (no ugly decimals)
  let roundedPrice = Math.round(calculatedMonthlyPrice);
  if (roundedPrice > 500) {
    roundedPrice = Math.round(roundedPrice / 10) * 10;
  } else if (roundedPrice > 100) {
    roundedPrice = Math.round(roundedPrice / 5) * 5;
  }
  
  return roundedPrice;
}

export function formatPrice(price: number, currencyCode: string): string {
  const currency = CurrenciesRecord[currencyCode] || CurrenciesRecord.USD;
  
  const formatter = new Intl.NumberFormat(currency.format, {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  
  let formatted = formatter.format(price);
  
  // Strip spaces, non-breaking spaces, and narrow non-breaking spaces around symbols
  return formatted
    .replace(/\u00A0/g, '')
    .replace(/\u202F/g, '')
    .replace(/\s+/g, '');
}
