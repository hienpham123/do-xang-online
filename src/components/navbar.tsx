import { NavLink } from 'react-router-dom';

const NavItem = ({ to, label }: { to: string; label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'rounded-xl px-3 py-2 text-sm font-semibold transition',
          isActive ? 'bg-cyan-500/20 text-cyan-100' : 'text-slate-200 hover:bg-slate-800',
        ].join(' ')
      }
    >
      {label}
    </NavLink>
  );
};

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-2xl bg-cyan-500/15 text-cyan-100 shadow-glow">
            ⛽
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-100">Đổ Xăng Online</div>
            <div className="text-xs text-slate-400">full bình trong 1 click</div>
          </div>
        </div>
        <nav className="flex items-center gap-1">
          <NavItem to="/" label="Trang chủ" />
          <NavItem to="/fuel" label="Đổ xăng" />
          <NavItem to="/history" label="Lịch sử" />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

