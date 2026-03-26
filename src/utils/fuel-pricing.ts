export type FuelType = 'RON95' | 'E5' | 'Diesel';

export const FUEL_PRICE_PER_LITER: Record<FuelType, number> = {
  RON95: 25000,
  E5: 22000,
  Diesel: 19000,
};

export const fuelTypeOptions: FuelType[] = ['RON95', 'E5', 'Diesel'];

