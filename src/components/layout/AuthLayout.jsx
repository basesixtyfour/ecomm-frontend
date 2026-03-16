import { Link, Outlet } from "react-router-dom";

export const AuthLayout = () => (
  <div className="min-h-screen bg-white">
    <header className="border-b-2 border-black bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-6">
        <Link to="/" className="inline-flex items-baseline gap-1 px-2 py-1">
          <span className="text-xl font-black tracking-tight uppercase">ECOMM</span>
          <span className="text-xs font-semibold tracking-[0.18em] uppercase">.STORE</span>
        </Link>
      </div>
    </header>
    <Outlet />
  </div>
);

