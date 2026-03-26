import type { FuelType } from './fuel-pricing';

export type VehicleKind = 'motorcycle' | 'car' | 'truck';

export interface VehicleConfig {
  id: string;
  kind: VehicleKind;
  label: string;
  tankCapacityLiters: number;
  litersMin: number;
  litersStep: number;
  pumpDurationMultiplier: number;
  allowedFuelTypes?: FuelType[];
}

export const vehicleOptions = [
  // Motorcycle / scooter
  {
    id: 'wave-rsx',
    kind: 'motorcycle',
    label: 'Honda Wave RSX',
    tankCapacityLiters: 4.1,
    litersMin: 1,
    litersStep: 0.5,
    pumpDurationMultiplier: 0.9,
    allowedFuelTypes: ['RON95', 'E5'],
  },
  {
    id: 'dream-110',
    kind: 'motorcycle',
    label: 'Honda Dream 110',
    tankCapacityLiters: 3.8,
    litersMin: 1,
    litersStep: 0.5,
    pumpDurationMultiplier: 0.88,
    allowedFuelTypes: ['RON95', 'E5'],
  },
  {
    id: 'blade-110',
    kind: 'motorcycle',
    label: 'Honda Blade 110',
    tankCapacityLiters: 3.7,
    litersMin: 1,
    litersStep: 0.5,
    pumpDurationMultiplier: 0.87,
    allowedFuelTypes: ['RON95', 'E5'],
  },
  {
    id: 'winner-x',
    kind: 'motorcycle',
    label: 'Honda Winner X',
    tankCapacityLiters: 4.2,
    litersMin: 1,
    litersStep: 0.5,
    pumpDurationMultiplier: 0.95,
    allowedFuelTypes: ['RON95', 'E5'],
  },
  {
    id: 'air-blade-125',
    kind: 'motorcycle',
    label: 'Honda Air Blade 125',
    tankCapacityLiters: 4.4,
    litersMin: 1,
    litersStep: 0.5,
    pumpDurationMultiplier: 0.92,
    allowedFuelTypes: ['RON95', 'E5'],
  },
  {
    id: 'lead-110',
    kind: 'motorcycle',
    label: 'Honda Lead 110',
    tankCapacityLiters: 4.0,
    litersMin: 1,
    litersStep: 0.5,
    pumpDurationMultiplier: 0.9,
    allowedFuelTypes: ['RON95', 'E5'],
  },
  {
    id: 'vision-110',
    kind: 'motorcycle',
    label: 'Honda Vision 110',
    tankCapacityLiters: 4.2,
    litersMin: 1,
    litersStep: 0.5,
    pumpDurationMultiplier: 0.89,
    allowedFuelTypes: ['RON95', 'E5'],
  },
  // {
  //   id: 'pcx-160',
  //   kind: 'motorcycle',
  //   label: 'Honda PCX 160',
  //   tankCapacityLiters: 7.5,
  //   litersMin: 2,
  //   litersStep: 0.5,
  //   pumpDurationMultiplier: 1.05,
  //   allowedFuelTypes: ['RON95', 'E5'],
  // },
  {
    id: 'exciter-155',
    kind: 'motorcycle',
    label: 'Yamaha Exciter 155',
    tankCapacityLiters: 5.3,
    litersMin: 1,
    litersStep: 0.5,
    pumpDurationMultiplier: 1.02,
    allowedFuelTypes: ['RON95', 'E5'],
  },
  // {
  //   id: 'nvx-155',
  //   kind: 'motorcycle',
  //   label: 'Yamaha NVX 155',
  //   tankCapacityLiters: 4.7,
  //   litersMin: 1,
  //   litersStep: 0.5,
  //   pumpDurationMultiplier: 0.98,
  //   allowedFuelTypes: ['RON95', 'E5'],
  // },
  // {
  //   id: 'freego-125',
  //   kind: 'motorcycle',
  //   label: 'Honda FreeGo 125',
  //   tankCapacityLiters: 5.5,
  //   litersMin: 1,
  //   litersStep: 0.5,
  //   pumpDurationMultiplier: 1.0,
  //   allowedFuelTypes: ['RON95', 'E5'],
  // },
  {
    id: 'vespa-sprint-125',
    kind: 'motorcycle',
    label: 'Vespa Sprint 125',
    tankCapacityLiters: 8.0,
    litersMin: 2,
    litersStep: 0.5,
    pumpDurationMultiplier: 1.08,
    allowedFuelTypes: ['RON95', 'E5'],
  },
  // {
  //   id: 'ktm-duke-200',
  //   kind: 'motorcycle',
  //   label: 'KTM Duke 200',
  //   tankCapacityLiters: 13.5,
  //   litersMin: 2,
  //   litersStep: 1,
  //   pumpDurationMultiplier: 1.15,
  //   allowedFuelTypes: ['RON95', 'E5'],
  // },
  // {
  //   id: 'yamaha-r3',
  //   kind: 'motorcycle',
  //   label: 'Yamaha R3',
  //   tankCapacityLiters: 14.0,
  //   litersMin: 2,
  //   litersStep: 1,
  //   pumpDurationMultiplier: 1.18,
  //   allowedFuelTypes: ['RON95', 'E5'],
  // },
  {
    id: 'honda-sh-150',
    kind: 'motorcycle',
    label: 'Honda SH 150',
    tankCapacityLiters: 7.0,
    litersMin: 2,
    litersStep: 0.5,
    pumpDurationMultiplier: 1.06,
    allowedFuelTypes: ['RON95', 'E5'],
  },
  // {
  //   id: 'yamaha-grande',
  //   kind: 'motorcycle',
  //   label: 'Yamaha Grande',
  //   tankCapacityLiters: 5.2,
  //   litersMin: 1,
  //   litersStep: 0.5,
  //   pumpDurationMultiplier: 0.98,
  //   allowedFuelTypes: ['RON95', 'E5'],
  // },
  {
    id: 'honda-cbr-150r',
    kind: 'motorcycle',
    label: 'Honda CBR 150R',
    tankCapacityLiters: 12.5,
    litersMin: 2,
    litersStep: 1,
    pumpDurationMultiplier: 1.2,
    allowedFuelTypes: ['RON95', 'E5'],
  },
  // {
  //   id: 'yamaha-r15',
  //   kind: 'motorcycle',
  //   label: 'Yamaha R15',
  //   tankCapacityLiters: 11.0,
  //   litersMin: 2,
  //   litersStep: 1,
  //   pumpDurationMultiplier: 1.18,
  //   allowedFuelTypes: ['RON95', 'E5'],
  // },
  // {
  //   id: 'suzuki-gsx-s150',
  //   kind: 'motorcycle',
  //   label: 'Suzuki GSX-S150',
  //   tankCapacityLiters: 11.0,
  //   litersMin: 2,
  //   litersStep: 1,
  //   pumpDurationMultiplier: 1.16,
  //   allowedFuelTypes: ['RON95', 'E5'],
  // },
  // {
  //   id: 'honda-sonic-150',
  //   kind: 'motorcycle',
  //   label: 'Honda Sonic 150',
  //   tankCapacityLiters: 4.8,
  //   litersMin: 1,
  //   litersStep: 0.5,
  //   pumpDurationMultiplier: 1.0,
  //   allowedFuelTypes: ['RON95', 'E5'],
  // },
  // {
  //   id: 'yamaha-lexi-125',
  //   kind: 'motorcycle',
  //   label: 'Yamaha LEXi 125',
  //   tankCapacityLiters: 5.7,
  //   litersMin: 1,
  //   litersStep: 0.5,
  //   pumpDurationMultiplier: 1.02,
  //   allowedFuelTypes: ['RON95', 'E5'],
  // },
  {
    id: 'vespa-150',
    kind: 'motorcycle',
    label: 'Vespa 150',
    tankCapacityLiters: 8.2,
    litersMin: 2,
    litersStep: 0.5,
    pumpDurationMultiplier: 1.1,
    allowedFuelTypes: ['RON95', 'E5'],
  },

  // Cars
  {
    id: 'toyota-vios',
    kind: 'car',
    label: 'Toyota Vios',
    tankCapacityLiters: 42,
    litersMin: 5,
    litersStep: 1,
    pumpDurationMultiplier: 1.0,
    allowedFuelTypes: ['RON95', 'E5', 'Diesel'],
  },
  {
    id: 'honda-city',
    kind: 'car',
    label: 'Honda City',
    tankCapacityLiters: 40,
    litersMin: 5,
    litersStep: 1,
    pumpDurationMultiplier: 1.0,
    allowedFuelTypes: ['RON95', 'E5', 'Diesel'],
  },
  {
    id: 'fortuner-4x4',
    kind: 'car',
    label: 'Toyota Fortuner',
    tankCapacityLiters: 80,
    litersMin: 10,
    litersStep: 2,
    pumpDurationMultiplier: 1.18,
    allowedFuelTypes: ['RON95', 'E5', 'Diesel'],
  },

  // Trucks
  {
    id: 'truck-6t',
    kind: 'truck',
    label: 'Xe tải 6 tấn',
    tankCapacityLiters: 150,
    litersMin: 20,
    litersStep: 5,
    pumpDurationMultiplier: 1.35,
    allowedFuelTypes: ['Diesel'],
  },
  {
    id: 'truck-10t',
    kind: 'truck',
    label: 'Xe tải 10 tấn',
    tankCapacityLiters: 220,
    litersMin: 30,
    litersStep: 5,
    pumpDurationMultiplier: 1.5,
    allowedFuelTypes: ['Diesel'],
  },
  {
    id: 'truck-long',
    kind: 'truck',
    label: 'Container/đầu kéo',
    tankCapacityLiters: 300,
    litersMin: 40,
    litersStep: 10,
    pumpDurationMultiplier: 1.7,
    allowedFuelTypes: ['Diesel'],
  },
  {
    id: 'pickup-variant',
    kind: 'truck',
    label: 'Pickup',
    tankCapacityLiters: 80,
    litersMin: 10,
    litersStep: 2,
    pumpDurationMultiplier: 1.15,
    allowedFuelTypes: ['RON95', 'E5', 'Diesel'],
  },
] as const satisfies VehicleConfig[];

export type VehicleOption = (typeof vehicleOptions)[number];
export type VehicleId = VehicleOption['id'];

export const getVehicleConfig = (id: VehicleId): VehicleOption => {
  return (
    vehicleOptions.find((v) => v.id === id) ?? vehicleOptions.find((v) => v.id === 'toyota-vios')!
  );
};

export const getVehicleOptionsByKind = (kind: VehicleKind): VehicleOption[] => {
  return vehicleOptions.filter((v) => v.kind === kind);
};


