import type { FuelType } from '../utils/fuel-pricing';
import type { VehicleConfig, VehicleId, VehicleKind } from '../utils/vehicle-config';
import { getVehicleOptionsByKind } from '../utils/vehicle-config';

import { formatVnd } from '../utils/currency';

interface VehicleSelectorProps {
  disabled?: boolean;
  fuelType: FuelType;
  vehicleKind: VehicleKind;
  setVehicleKind: (kind: VehicleKind) => void;
  vehicleId: VehicleId;
  setVehicleId: (id: VehicleId) => void;
  pricePerLiter: number;
  vehicleConfig: VehicleConfig;
}

const kindOptions: Array<{ kind: VehicleKind; label: string; icon: string }> = [
  { kind: 'motorcycle', label: 'Xe máy', icon: '🛵' },
  { kind: 'car', label: 'Ô tô', icon: '🚗' },
  { kind: 'truck', label: 'Xe tải', icon: '🚚' },
];

const VehicleSelector = ({
  disabled = false,
  fuelType,
  vehicleKind,
  setVehicleKind,
  vehicleId,
  setVehicleId,
  pricePerLiter,
  vehicleConfig,
}: VehicleSelectorProps) => {
  const options = getVehicleOptionsByKind(vehicleKind);

  const getVehicleIcon = (config: VehicleConfig) => {
    if (config.kind === 'motorcycle') return '🏍️';
    if (config.kind === 'car') return '🚗';
    return '🚚';
  };

  const isFuelAllowed = (config: VehicleConfig) => {
    if (!config.allowedFuelTypes || config.allowedFuelTypes.length === 0) return true;
    return config.allowedFuelTypes.includes(fuelType);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
      <label className="mb-2 block text-sm font-semibold text-slate-100">Phương tiện</label>

      <div className="flex flex-wrap gap-2">
        {kindOptions.map((opt) => {
          const active = opt.kind === vehicleKind;
          return (
            <button
              key={opt.kind}
              type="button"
              disabled={disabled}
              onClick={() => setVehicleKind(opt.kind)}
              className={[
                'rounded-2xl border px-3 py-2 text-sm font-semibold transition',
                active
                  ? 'border-cyan-400/60 bg-cyan-500/15 text-cyan-100 shadow-glow'
                  : 'border-slate-800 bg-slate-950/30 text-slate-200 hover:bg-slate-800/50',
              ].join(' ')}
            >
              <span aria-hidden="true">{opt.icon}</span>
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((vehicle) => {
          const active = vehicle.id === vehicleId;
          const allowed = isFuelAllowed(vehicle);
          const fullPrice = vehicle.tankCapacityLiters * pricePerLiter;

          return (
            <button
              key={vehicle.id}
              type="button"
              disabled={disabled}
              onClick={() => setVehicleId(vehicle.id)}
              className={[
                'flex flex-col gap-1 rounded-2xl border px-3 py-3 text-left transition',
                active
                  ? 'border-cyan-400/60 bg-cyan-500/15 shadow-glow'
                  : 'border-slate-800 bg-slate-950/30 hover:bg-slate-800/50',
                !allowed ? 'opacity-70' : '',
              ].join(' ')}
              aria-label={`Chọn ${vehicle.label}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-slate-100">
                    <span className="mr-1.5" aria-hidden="true">
                      {getVehicleIcon(vehicle)}
                    </span>
                    {vehicle.label}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">
                    Bình: {vehicle.tankCapacityLiters}L
                  </div>
                </div>
                <div className="text-right text-xs font-bold text-cyan-100">
                  {formatVnd(fullPrice)}
                </div>
              </div>
              <div className="text-xs text-slate-500">
                Đổ đầy ({vehicle.tankCapacityLiters}L)
              </div>
              {!allowed ? (
                <div className="text-[11px] text-amber-300">
                  Demo: loại này có thể không hợp nhiên liệu bạn chọn
                </div>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-3 text-xs text-slate-400">
        Chọn: <span className="font-semibold text-slate-200">{vehicleConfig.label}</span> • Đổ tối đa{' '}
        <span className="font-semibold text-slate-200">{vehicleConfig.tankCapacityLiters}L</span>
      </div>
    </div>
  );
};

export default VehicleSelector;

