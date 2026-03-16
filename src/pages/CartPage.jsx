import { useState } from "react";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "../components/cart/CartItem";
import { EmptyCartCTA } from "../components/cart/EmptyCartCTA";
import { OrderSummary } from "../components/cart/OrderSummary";
import { selectCartItems, selectCartItemCount, selectCartTotalPrice } from "../context/cartSlice";
import { Sheet, SheetContent, SheetOverlay, useNoScroll } from "../components/ui/sheet";
import { Button } from "../components/ui/button";

export const CartPage = () => {
  const items = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartItemCount);
  const totalPrice = useSelector(selectCartTotalPrice);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useNoScroll(drawerOpen);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-10 md:py-14">
        <div className="mb-8 flex items-center gap-3 border-b-2 border-black pb-4">
          <div className="inline-flex h-12 w-12 items-center justify-center border-2 border-black bg-black">
            <ShoppingCart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black md:text-3xl">
              Your cart
            </h1>
            <p className="mt-0.5 text-sm text-neutral-800">
              {itemCount === 0
                ? "No items yet"
                : `${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyCartCTA />
        ) : (
          <>
            <div className="mb-4 flex justify-end lg:hidden">
              <Button size="sm" variant="outline" onClick={() => setDrawerOpen(true)}>
                View order summary
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                {items.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>

              <div className="hidden lg:col-span-1 lg:block">
                <OrderSummary
                  subtotal={totalPrice}
                  itemCount={itemCount}
                  isGuest={!isAuthenticated}
                />
              </div>
            </div>

            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
              {({ onOpenChange }) => (
                <>
                  <SheetOverlay onClick={() => onOpenChange(false)} />
                  <SheetContent side="right" className="flex h-full max-w-md flex-col">
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                      <h2 className="text-sm font-semibold text-gray-900">
                        Order summary
                      </h2>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        aria-label="Close summary"
                      >
                        ✕
                      </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 py-4">
                      <OrderSummary
                        subtotal={totalPrice}
                        itemCount={itemCount}
                        isGuest={!isAuthenticated}
                      />
                    </div>
                  </SheetContent>
                </>
              )}
            </Sheet>
          </>
        )}
      </div>
    </div>
  );
};
