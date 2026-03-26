import Button from '../components/button';
import { useFuelStore } from '../hooks/use-fuel-store';
import { formatDateTime } from '../utils/format-date-time';
import { formatVnd } from '../utils/currency';

const HistoryPage = () => {
  const { history, clearHistory } = useFuelStore();

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold">Lịch sử đổ xăng</h1>
          <p className="mt-1 text-sm text-slate-300">
            Lưu bằng <span className="font-semibold text-slate-100">localStorage</span>, khỏi cần backend.
          </p>
        </div>
        <Button
          variant="secondary"
          disabled={history.length === 0}
          onClick={clearHistory}
        >
          Xóa lịch sử
        </Button>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/30">
        {history.length === 0 ? (
          <div className="p-6 text-center">
            <div className="text-sm font-semibold text-slate-100">
              Chưa có lần nào bơm cả
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Hãy qua trang “Đổ xăng” để thử ngay!
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-slate-800">
            {history.map((item) => (
              <li key={item.id} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-cyan-500/15 text-cyan-100">
                    ⛽
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-100">
                      {item.fuelType}
                    </div>
                    <div className="text-xs text-slate-400">
                      {item.liters}L • {formatDateTime(item.timestamp)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-400">Tổng</div>
                  <div className="text-sm font-extrabold text-cyan-100">
                    {formatVnd(item.totalPrice)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default HistoryPage;

