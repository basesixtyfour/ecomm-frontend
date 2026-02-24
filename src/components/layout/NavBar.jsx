import { ShoppingCart, ShoppingBag, UserCircle, Headset } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShopifyIcon } from "./ShopifyIcon";
import { SearchBar } from "./SearchBar";

export const NavBar = ({ cartCount = 0 }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="bg-gray-500 px-6 py-3 flex items-center justify-between">
      <Link className="text-white text-lg font-semibold hover:opacity-90" to="/">
        <ShopifyIcon />
      </Link>
      <div className="flex-1 flex justify-center px-4">
        <SearchBar />
      </div>
      <div className="flex gap-6 items-center">
        {user?.is_staff && (
          <Link className="text-white hover:underline" to="/agent" title="Agent Dashboard">
            <Headset className="w-6 h-6" />
          </Link>
        )}
        <Link className="text-white hover:underline" to="/products">
          <ShoppingBag />
        </Link>
        <Link className="relative inline-flex text-white hover:underline" to="/cart">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 px-1 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full"
              aria-label={`${cartCount} items in cart`}
            >
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </Link>
        <Link
          className="text-white hover:underline"
          to={isAuthenticated ? "/profile" : "/login"}
          title={isAuthenticated ? "Profile" : "Sign In"}
        >
          <UserCircle className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
};
