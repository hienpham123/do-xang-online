export interface LitersInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const LitersInput = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  disabled = false,
}: LitersInputProps) => {
  const clampedValue = Math.min(max, Math.max(min, value));

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
      <label className="mb-2 block text-sm font-semibold text-slate-100">
        {label}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="w-full sm:max-w-[160px]">
          <input
            type="number"
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400/60"
            value={clampedValue}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (Number.isNaN(next)) return;
              onChange(next);
            }}
          />
        </div>
        <div className="w-full">
          <input
            type="range"
            className="w-full accent-cyan-400"
            value={clampedValue}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={(e) => {
              const next = Number(e.target.value);
              onChange(next);
            }}
          />
          <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
            <span>{min}L</span>
            <span>{max}L</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LitersInput;

