export type FuelType = 'RON95' | 'E5' | 'Diesel';

export const FUEL_PRICE_PER_LITER: Record<FuelType, number> = {
  // Fallback prices (used when realtime fetch fails)
  RON95: 31400,
  E5: 27440,
  Diesel: 33750,
};

export const fuelTypeOptions: FuelType[] = ['RON95', 'E5', 'Diesel'];

