import { useNavigate } from 'react-router-dom';
import Button from '../components/button';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950 p-6 sm:p-10">
      <div className="absolute -right-16 -top-16 size-40 rounded-full bg-cyan-500/10 blur-2xl" />
      <div className="absolute -left-16 -bottom-16 size-40 rounded-full bg-fuchsia-500/10 blur-2xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-cyan-300">
            SIMULATOR
          </p>
          <h1 className="mt-2 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
            Đổ xăng online – full bình trong 1 click
          </h1>
          <p className="mt-3 text-pretty text-slate-300">
            Chọn loại xăng, kéo số lít, bấm bơm. Xong rồi xem lịch sử ngay lập
            tức.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              onClick={() => navigate('/fuel')}
              className="w-full sm:w-auto"
            >
              Đổ xăng ngay
              <span aria-hidden="true">⚡</span>
            </Button>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-3">
              <div className="text-sm font-bold text-slate-100">
                Nhanh gọn
              </div>
              <div className="text-xs text-slate-400">
                Animation vui nhộn + lưu lịch sử
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-400">
                Tip
              </div>
              <div className="mt-1 text-sm font-bold text-slate-100">
                Thử bơm 10L xem “bình đầy dần” nhé!
              </div>
            </div>
            <div className="grid size-12 place-items-center rounded-2xl bg-cyan-500/15 text-cyan-200 shadow-glow">
              🚀
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
              <span className="text-sm font-semibold">RON95</span>
              <span className="text-sm text-cyan-200">25,000đ/L</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
              <span className="text-sm font-semibold">E5</span>
              <span className="text-sm text-cyan-200">22,000đ/L</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
              <span className="text-sm font-semibold">Diesel</span>
              <span className="text-sm text-cyan-200">19,000đ/L</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

