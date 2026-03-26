import { useEffect, useMemo, useState } from 'react';

import { FUEL_PRICE_PER_LITER, type FuelType } from '../utils/fuel-pricing';

type FuelPrices = Record<FuelType, number>;

type VietnamFuelPriceResponse = Array<{
  date: string;
  unit: string;
  list: Array<{
    name: string;
    region1: string;
    region2?: string;
  }>;
}>;

const PRICE_URL =
  'https://raw.githubusercontent.com/toanqng/fuel/master/fuel-vietnam.json';

const parseVndString = (value: string): number | null => {
  const cleaned = value.trim();
  if (!cleaned) return null;

  // The source seems to use dot as thousands separator: e.g. "31.090".
  const numeric = cleaned.replace(/\./g, '');
  const parsed = Number(numeric);
  if (Number.isNaN(parsed)) return null;
  return parsed;
};

const pickRegionAverage = (region1: string, region2?: string): number | null => {
  const r1 = parseVndString(region1);
  const r2 = region2 && region2.trim() ? parseVndString(region2) : null;
  const nums = [r1, r2].filter((n): n is number => typeof n === 'number');
  if (nums.length === 0) return null;
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  return Math.round(avg);
};

const getLatestFuelPrices = (data: VietnamFuelPriceResponse): {
  prices: FuelPrices;
  lastUpdated: string;
} | null => {
  if (!Array.isArray(data) || data.length === 0) return null;

  const latest = data[0];
  const list = latest?.list ?? [];

  const fuelNameMap: Record<FuelType, string> = {
    RON95: 'Xăng RON 95-V',
    E5: 'Xăng E5 RON 92-II',
    Diesel: 'DO 0,05S-II',
  };

  const nextPrices: Partial<FuelPrices> = {};
  (Object.keys(fuelNameMap) as FuelType[]).forEach((fuelType) => {
    const expectedName = fuelNameMap[fuelType];
    const item = list.find((x) => x.name === expectedName);
    if (!item) return;
    const price = pickRegionAverage(item.region1, item.region2);
    if (!price) return;
    nextPrices[fuelType] = price;
  });

  const hasAll =
    typeof nextPrices.RON95 === 'number' &&
    typeof nextPrices.E5 === 'number' &&
    typeof nextPrices.Diesel === 'number';
  if (!hasAll) return null;

  return {
    prices: nextPrices as FuelPrices,
    lastUpdated: latest.date,
  };
};

export const useFuelPrices = () => {
  const [prices, setPrices] = useState<FuelPrices>(FUEL_PRICE_PER_LITER);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const staticFallback = useMemo(() => FUEL_PRICE_PER_LITER, []);

  useEffect(() => {
    let cancelled = false;

    const fetchPrices = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);

        const res = await fetch(PRICE_URL, { method: 'GET' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const jsonUnknown = (await res.json()) as unknown;
        if (!Array.isArray(jsonUnknown)) {
          throw new Error('Invalid JSON format');
        }

        const parsed = jsonUnknown as VietnamFuelPriceResponse;
        const latest = getLatestFuelPrices(parsed);
        if (!latest) throw new Error('Missing expected fuel items');

        if (cancelled) return;
        setPrices(latest.prices);
        setLastUpdated(latest.lastUpdated);
      } catch (err) {
        if (cancelled) return;
        setPrices(staticFallback);
        setErrorMessage(
          err instanceof Error ? err.message : 'Không thể cập nhật giá',
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchPrices();

    return () => {
      cancelled = true;
    };
  }, [staticFallback]);

  return { prices, lastUpdated, loading, errorMessage };
};

