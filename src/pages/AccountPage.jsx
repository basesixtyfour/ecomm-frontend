import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLoaderData } from "react-router-dom";
import {
  User,
  Mail,
  Package,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Shield,
} from "lucide-react";
import { logoutUser } from "../context/authSlice";
import { loadLocalCart } from "../context/cartSlice";

export const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useLoaderData();
  const authSource = useSelector((state) => state.auth.authSource);

  const handleLogout = async () => {
    const result = await dispatch(
      logoutUser({ auth0: authSource === "auth0" })
    ).unwrap();
    dispatch(loadLocalCart());

    if (result?.auth0_logout_url) {
      window.location.href = result.auth0_logout_url;
      return;
    }
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-10 md:py-14">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3 border-b-2 border-black pb-4">
          <div className="inline-flex h-12 w-12 items-center justify-center border-2 border-black bg-black">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black md:text-3xl">
              My profile
            </h1>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-700">
              Manage your account settings
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="mb-6 border-2 border-black bg-white">
          <div className="border-b-2 border-black bg-black px-6 py-8 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center border-2 border-white">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight">
                  {user?.username || "User"}
                </h2>
                <div className="mt-1 flex items-center gap-1.5 text-xs">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="font-mono">{user?.email || "No email available"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-6">
            <div className="flex items-center gap-3 text-black">
              <Shield className="h-4 w-4" />
              <span className="text-sm">
                ACCOUNT ID:&nbsp;
                <span className="border-2 border-black bg-neutral-50 px-2 py-0.5 font-mono text-xs">
                  {user?.id || "N/A"}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-6 border-2 border-black bg-white">
          <div className="border-b-2 border-black px-6 py-3">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black">
              Quick links
            </h3>
          </div>

          <Link
            to="/profile/orders"
            className="flex items-center justify-between border-b-2 border-black px-6 py-4 last:border-b-0 hover:bg-neutral-100"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-white">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-black uppercase">Order history</p>
                <p className="text-xs text-neutral-700">View your past orders and track status</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-black" />
          </Link>

          <Link
            to="/products"
            className="flex items-center justify-between px-6 py-4 hover:bg-neutral-100"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-white">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-black uppercase">Browse products</p>
                <p className="text-xs text-neutral-700">Explore our product catalog</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-black" />
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center justify-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};
