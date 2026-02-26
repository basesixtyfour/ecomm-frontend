import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "../components/cart/CartItem";
import { EmptyCartCTA } from "../components/cart/EmptyCartCTA";
import { OrderSummary } from "../components/cart/OrderSummary";
import { selectCartItems, selectCartItemCount, selectCartTotalPrice } from "../context/cartSlice";

export const CartPage = () => {
  const items = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartItemCount);
  const totalPrice = useSelector(selectCartTotalPrice);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-10 md:py-14">
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-500 rounded-xl shadow-md">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Your Cart
            </h1>
            <p className="text-gray-600 text-sm mt-0.5">  
              {itemCount === 0
                ? "No items yet"
                : `${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyCartCTA />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>

            <div className="lg:col-span-1">
              <OrderSummary subtotal={totalPrice} itemCount={itemCount} isGuest={!isAuthenticated} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
