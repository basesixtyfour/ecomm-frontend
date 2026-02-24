import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

export const EmptyCartCTA = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-16 md:py-24 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
          Looks like you haven’t added anything yet. Browse our products and
          find something you’ll love.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <ShoppingBag className="w-5 h-5" />
          Browse Products
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};
