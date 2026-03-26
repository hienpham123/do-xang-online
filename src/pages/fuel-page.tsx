import { useEffect, useMemo, useRef, useState } from 'react';

import Button from '../components/button';
import LitersInput from '../components/liters-input';
import Modal from '../components/modal';
import VehicleSelector from '../components/vehicle-selector';
import { useFuelStore } from '../hooks/use-fuel-store';
import { useFuelPrices } from '../hooks/use-fuel-prices';
import { usePumpSound } from '../hooks/use-pump-sound';
import { fuelTypeOptions, type FuelType } from '../utils/fuel-pricing';
import { formatVnd } from '../utils/currency';
import { getVehicleConfig, getVehicleOptionsByKind, type VehicleId, type VehicleKind } from '../utils/vehicle-config';

const pumpDurationMsForLiters = (liters: number) => {
  // Slow & satisfying by design.
  const base = 7000;
  const perLiter = 420;
  return Math.min(120000, base + liters * perLiter);
};

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

const FuelPage = () => {
  const [fuelType, setFuelType] = useState<FuelType>('RON95');
  const [vehicleId, setVehicleId] = useState<VehicleId>('wave-rsx');
  const [vehicleKind, setVehicleKind] = useState<VehicleKind>('motorcycle');
  const [liters, setLiters] = useState<number>(4);
  const [pumping, setPumping] = useState(false);
  const [pumpedLiters, setPumpedLiters] = useState(0);
  const [successOpen, setSuccessOpen] = useState(false);

  const { addHistoryItem } = useFuelStore();
  const { prices: fuelPrices, lastUpdated, loading: pricesLoading } = useFuelPrices();
  const { startTicks, stopTicks, playSuccessSound } = usePumpSound();

  const vehicleConfig = useMemo(() => getVehicleConfig(vehicleId), [vehicleId]);

  const clampToRangeAndStep = (value: number) => {
    const { litersMin: min, tankCapacityLiters: max, litersStep: step } = vehicleConfig;
    const clamped = Math.min(max, Math.max(min, value));
    if (step <= 0) return clamped;
    const stepped = min + Math.round((clamped - min) / step) * step;
    // Avoid 0.30000000004 issues when step is decimals.
    return Number(stepped.toFixed(2));
  };

  useEffect(() => {
    if (pumping) return;
    setLiters((prev) => clampToRangeAndStep(prev));
  }, [vehicleConfig.id, pumping]);

  useEffect(() => {
    if (pumping) return;
    const options = getVehicleOptionsByKind(vehicleKind);
    if (options.length === 0) return;

    const currentStillValid = options.some((v) => v.id === vehicleId);
    if (currentStillValid) return;

    setVehicleId(options[0].id);
  }, [pumping, vehicleId, vehicleKind]);

  const pricePerLiter = useMemo(
    () => fuelPrices[fuelType],
    [fuelPrices, fuelType],
  );
  const totalPrice = useMemo(() => liters * pricePerLiter, [liters, pricePerLiter]);

  const hasFinalizedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const pumpTargetLiters = useRef<number>(0);

  const resetPumpUi = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    stopTicks();
    hasFinalizedRef.current = false;
    pumpTargetLiters.current = 0;
    setPumping(false);
    setPumpedLiters(0);
    setSuccessOpen(false);
  };

  const progressBaseLiters = pumping ? pumpTargetLiters.current : liters;
  const progressRatio =
    progressBaseLiters <= 0 ? 0 : pumpedLiters / progressBaseLiters;

  const finalizePump = () => {
    if (hasFinalizedRef.current) return;
    hasFinalizedRef.current = true;

    stopTicks();
    setPumpedLiters(pumpTargetLiters.current);
    setPumping(false);
    setSuccessOpen(true);

    addHistoryItem({
      fuelType,
      liters: pumpTargetLiters.current,
      totalPrice: pumpTargetLiters.current * pricePerLiter,
      timestamp: Date.now(),
    });

    playSuccessSound();
  };

  const startPump = () => {
    if (pumping) return;
    if (liters <= 0) return;

    setSuccessOpen(false);
    hasFinalizedRef.current = false;
    pumpTargetLiters.current = liters;

    setPumpedLiters(0);
    setPumping(true);
    startTicks();

    const durationMs =
      pumpDurationMsForLiters(liters) * vehicleConfig.pumpDurationMultiplier;
    const startedAtRef: { current: number | null } = { current: null };

    const animate = (t: number) => {
      if (startedAtRef.current === null) startedAtRef.current = t;
      const elapsed = t - startedAtRef.current;
      const ratio = Math.min(1, elapsed / durationMs);
      const eased = easeInOutSine(ratio);

      // Avoid rounding per-frame to keep the fill super smooth.
      setPumpedLiters(pumpTargetLiters.current * eased);

      if (ratio >= 1) {
        finalizePump();
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      stopTicks();
    };
  }, [stopTicks]);

  useEffect(() => {
    if (pumping) return;
    resetPumpUi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleId]);

  useEffect(() => {
    if (pumping) return;
    if (pumpedLiters <= 0) return;
    setPumpedLiters(0);
  }, [liters, pumpedLiters, pumping]);

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 sm:p-7">
        <h1 className="text-xl font-bold">Đổ xăng</h1>
        <p className="mt-1 text-sm text-slate-300">
          Chọn loại xăng, kéo số lít, bấm “Bơm xăng 🚀”. Tụi mình mô phỏng thôi nhé!
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <label className="mb-2 block text-sm font-semibold text-slate-100">
                Loại xăng
              </label>
              <div className="flex flex-wrap gap-2">
                {fuelTypeOptions.map((type) => {
                  const active = type === fuelType;
                  return (
                    <button
                      key={type}
                      type="button"
                      className={[
                        'rounded-2xl border px-3 py-2 text-sm font-semibold transition',
                        active
                          ? 'border-cyan-400/60 bg-cyan-500/15 text-cyan-100 shadow-glow'
                          : 'border-slate-800 bg-slate-950/30 text-slate-200 hover:bg-slate-800/50',
                      ].join(' ')}
                      onClick={() => setFuelType(type)}
                      disabled={pumping}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            <VehicleSelector
              disabled={pumping}
              fuelType={fuelType}
              vehicleKind={vehicleKind}
              setVehicleKind={setVehicleKind}
              vehicleId={vehicleId}
              setVehicleId={setVehicleId}
              pricePerLiter={pricePerLiter}
              vehicleConfig={vehicleConfig}
            />

            <LitersInput
              label="Số lít"
              value={liters}
              min={vehicleConfig.litersMin}
              max={vehicleConfig.tankCapacityLiters}
              step={vehicleConfig.litersStep}
              disabled={pumping}
              onChange={(next) => setLiters(clampToRangeAndStep(next))}
            />

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-400">Giá realtime</div>
                  <div className="mt-1 text-sm font-bold text-slate-200">
                    {formatVnd(pricePerLiter)} / lít
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {pricesLoading ? 'Đang cập nhật...' : lastUpdated ? `Cập nhật: ${lastUpdated}` : 'Giá demo (fallback)'}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Đổ đầy bình ({vehicleConfig.tankCapacityLiters}L):{' '}
                    <span className="font-semibold text-cyan-100">
                      {formatVnd(vehicleConfig.tankCapacityLiters * pricePerLiter)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-400">Tổng tiền</div>
                  <div className="mt-1 text-lg font-extrabold text-cyan-100">
                    {formatVnd(totalPrice)}
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              onClick={startPump}
              disabled={pumping}
              className="w-full"
            >
              {pumping ? 'Đang bơm...' : 'Bơm xăng 🚀'}
            </Button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-400">Bình xăng</div>
                <div className="mt-1 text-sm font-bold text-slate-100">
                  {liters > 0 ? pumpedLiters.toFixed(2) : '0.00'}L / {liters}L
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-400">Tiến độ</div>
                <div className="mt-1 text-sm font-bold text-cyan-100">
                  {Math.round(progressRatio * 100)}%
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="relative mx-auto h-[180px] w-full max-w-md overflow-hidden rounded-xl bg-slate-950/60">
                <div
                  className="absolute inset-x-0 bottom-0 overflow-hidden"
                  style={{ height: `${Math.max(0, Math.min(1, progressRatio)) * 100}%` }}
                >
                  <div className="relative h-full w-full bg-cyan-500/45">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cyan-600/55 via-cyan-500/35 to-cyan-300/20" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-cyan-100/60 blur-[0.5px]" />
                    {pumping ? (
                      <>
                        <div
                          className="pointer-events-none absolute inset-x-[-12%] -top-4 h-12 opacity-60 mix-blend-screen"
                          style={{
                            animation: 'fuelWave 1.3s ease-in-out infinite',
                          }}
                        >
                          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.55),transparent_55%)]" />
                        </div>
                        <div
                          className="pointer-events-none absolute inset-x-[-12%] -top-2 h-10 opacity-40"
                          style={{
                            animation: 'fuelWave 1.8s ease-in-out infinite',
                          }}
                        >
                          <div className="h-full w-full bg-[linear-gradient(90deg,transparent_0%,rgba(56,189,248,0.45)_25%,transparent_50%,rgba(56,189,248,0.35)_75%,transparent_100%)]" />
                        </div>
                        <div
                          className="pointer-events-none absolute inset-x-0 -top-3 h-6 opacity-70"
                          style={{ animation: 'fuelBob 0.9s ease-in-out infinite' }}
                        >
                          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.35),transparent_62%)]" />
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>

                {pumping ? (
                  <>
                    <div className="pointer-events-none absolute bottom-6 left-10 size-2 rounded-full bg-cyan-200/50" style={{ animation: 'bubbleUp 1.1s ease-in infinite' }} />
                    <div className="pointer-events-none absolute bottom-4 left-1/3 size-1.5 rounded-full bg-cyan-200/45" style={{ animation: 'bubbleUp 0.9s ease-in infinite' }} />
                    <div className="pointer-events-none absolute bottom-5 right-12 size-2 rounded-full bg-cyan-200/40" style={{ animation: 'bubbleUp 1.2s ease-in infinite' }} />
                    <div className="pointer-events-none absolute right-3 top-3 grid size-9 place-items-center rounded-xl bg-cyan-500/10">
                      <div className="size-5 animate-spin rounded-full border-2 border-cyan-300/60 border-t-cyan-300" />
                    </div>
                  </>
                ) : null}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.20),transparent_60%)]" />
                <div className="absolute inset-x-0 bottom-3 px-3 text-center text-xs font-semibold text-slate-200">
                  {pumping ? 'Đang bơm... tạch tạch' : `Sẵn sàng bơm (${vehicleConfig.label})`}
                </div>
              </div>

              <div className="mt-3 h-2 rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-500 transition-[width] duration-200 ease-out"
                  style={{ width: `${Math.max(0, Math.min(1, progressRatio)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Khi bơm: không che toàn page, chỉ animate trong bình xăng */}

      <Modal
        open={successOpen}
        title="Đổ xăng thành công ⛽🔥"
        onClose={() => setSuccessOpen(false)}
      >
        <div className="space-y-2">
          <p className="text-sm text-slate-200">
            Bạn vừa đổ <span className="font-bold">{pumpTargetLiters.current.toFixed(0)}L</span> loại{' '}
            <span className="font-bold">{fuelType}</span>.
          </p>
          <p className="text-sm text-slate-200">
            Tổng tiền: <span className="font-bold text-cyan-100">{formatVnd(pumpTargetLiters.current * pricePerLiter)}</span>
          </p>
          <p className="text-xs text-slate-400">
            Phương tiện: <span className="font-semibold text-slate-200">{vehicleConfig.label}</span>.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default FuelPage;

