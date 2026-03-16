import { ShoppingCart, ShoppingBag, UserCircle, Headset, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ShopifyIcon } from "./ShopifyIcon";
import { SearchBar } from "./SearchBar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetOverlay, useNoScroll } from "../ui/sheet";

export const NavBar = ({ cartCount = 0 }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  useNoScroll(mobileOpen);

  return (
    <>
      <nav className="sticky top-0 z-30 border-b-2 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-none border-2 border-black bg-white px-2 py-2 text-black hover:bg-black hover:text-white md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="inline-flex items-baseline gap-1 px-2 py-1">
              <span className="text-xl font-black tracking-tight uppercase">ECOMM</span>
              <span className="text-xs font-semibold tracking-[0.18em] uppercase">.STORE</span>
            </Link>
          </div>

          <div className="hidden flex-1 justify-center md:flex">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-3">
            {user?.is_staff && (
              <Link
                className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-black md:inline-flex"
                to="/agent"
                title="Agent Dashboard"
              >
                <Headset className="mr-1 h-4 w-4" />
                Agent
              </Link>
            )}

            <Link
              className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-black md:inline-flex"
              to="/products"
              title="Browse products"
            >
              <ShoppingBag className="mr-1 h-4 w-4" />
              Catalog
            </Link>

            <Link
              className="relative inline-flex items-center justify-center"
              to="/cart"
              title="Cart"
            >
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-none border-2 border-black bg-[var(--color-accent)] px-1 text-xs font-black text-[var(--color-accent-foreground)]"
                    aria-label={`${cartCount} items in cart`}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              title={isAuthenticated ? "Profile" : "Sign In"}
            >
              <Button variant="outline" size="icon">
                <UserCircle className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="px-4 pb-3 md:hidden border-t-2 border-black">
          <SearchBar />
        </div>
      </nav>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        {({ open, onOpenChange }) => (
          <>
            <SheetOverlay onClick={() => onOpenChange(false)} />
            <SheetContent side="left">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                  <span className="text-sm font-semibold text-gray-900">
                    Menu
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close menu"
                  >
                    ✕
                  </Button>
                </div>
                <nav className="flex flex-1 flex-col gap-1 px-4 py-4 text-sm">
                  {user?.is_staff && (
                    <Link
                      to="/agent"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => onOpenChange(false)}
                    >
                      <Headset className="h-4 w-4" />
                      <span>Agent Dashboard</span>
                    </Link>
                  )}
                  <Link
                    to="/products"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => onOpenChange(false)}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Products</span>
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => onOpenChange(false)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Cart</span>
                  </Link>
                  <Link
                    to={isAuthenticated ? "/profile" : "/login"}
                    className="mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => onOpenChange(false)}
                  >
                    <UserCircle className="h-4 w-4" />
                    <span>{isAuthenticated ? "Profile" : "Sign In"}</span>
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </>
        )}
      </Sheet>
    </>
  );
};
