import { useDispatch } from "react-redux";
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
import { clearCart } from "../context/cartSlice";

export const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useLoaderData();

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-6 py-10 md:py-14">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-500 rounded-xl shadow-md">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              My Profile
            </h1>
            <p className="text-gray-600 text-sm mt-0.5">
              Manage your account settings
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-gray-500 to-gray-600 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {user?.username || "User"}
                </h2>
                <div className="flex items-center gap-1.5 text-white/80 text-sm mt-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{user?.email || "No email available"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <Shield className="w-4.5 h-4.5 text-gray-400" />
              <span className="text-sm">
                Account ID: <span className="font-mono text-gray-500">{user?.id || "N/A"}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Quick Links
            </h3>
          </div>

          <Link
            to="/profile/orders"
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Order History</p>
                <p className="text-xs text-gray-500">View your past orders and track status</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          <Link
            to="/products"
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Browse Products</p>
                <p className="text-xs text-gray-500">Explore our product catalog</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-white text-red-600 border border-red-200 rounded-xl px-6 py-3 font-medium hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};
