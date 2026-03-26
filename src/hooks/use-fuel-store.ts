import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { FuelType } from '../utils/fuel-pricing';

export interface FuelHistoryItem {
  id: string;
  fuelType: FuelType;
  liters: number;
  totalPrice: number;
  timestamp: number;
}

export interface FuelHistoryState {
  history: FuelHistoryItem[];
  addHistoryItem: (item: Omit<FuelHistoryItem, 'id'>) => void;
  clearHistory: () => void;
}

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const useFuelStore = create<FuelHistoryState>()(
  persist(
    (set) => ({
      history: [],
      addHistoryItem: (item) =>
        set((state) => ({
          history: [
            {
              ...item,
              id: createId(),
            },
            ...state.history,
          ].slice(0, 50),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'do-xang-online:fuel-history',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') return undefined as unknown as Storage;
        return localStorage;
      }),
    },
  ),
);

