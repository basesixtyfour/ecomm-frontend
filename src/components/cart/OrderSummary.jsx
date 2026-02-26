import { Link } from "react-router-dom";
import { ArrowRight, LogIn } from "lucide-react";
import { formatPrice } from "../../utils/price";

export const OrderSummary = ({ subtotal, itemCount, isGuest = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h2>
      <div className="space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal ({itemCount} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">
          {formatPrice(subtotal)}
        </span>
      </div>
      {isGuest ? (
        <>
          <Link
            to={`/login?redirectUrl=${encodeURIComponent("/cart")}`}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <LogIn className="w-5 h-5" />
            Sign in to checkout
          </Link>
          <p className="mt-3 text-center text-xs text-gray-500">
            Your cart will be saved when you sign in
          </p>
        </>
      ) : (
        <Link
          to="/checkout"
          className="w-full mt-6 flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3.5 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Proceed to Checkout
          <ArrowRight className="w-5 h-5" />
        </Link>
      )}
      <Link
        to="/products"
        className="block mt-3 text-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        Continue shopping
      </Link>
    </div>
  );
};
