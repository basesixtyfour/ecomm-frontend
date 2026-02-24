import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Package, ArrowLeft, ShoppingBag } from "lucide-react";
import { OrderCard } from "../components/order/OrderCard";

export const OrderHistory = () => {
  const orders = useLoaderData() || [];
  const { state } = useLocation();
  const expandOrderId = state?.expandOrderId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <Link
          to="/profile"
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-500 rounded-xl shadow-md">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Order History
            </h1>
            <p className="text-gray-600 text-sm mt-0.5">
              {orders.length === 0
                ? "No orders yet"
                : `${orders.length} ${orders.length === 1 ? "order" : "orders"}`}
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No orders yet
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              When you place an order, it will appear here.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gray-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} defaultOpen={order.id === expandOrderId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};