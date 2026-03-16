import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Package, ArrowLeft, ShoppingBag } from "lucide-react";
import { OrderCard } from "../components/order/OrderCard";

export const OrdersPage = () => {
  const orders = useLoaderData() || [];
  const { state } = useLocation();
  const expandOrderId = state?.expandOrderId;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <Link
          to="/profile"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-700 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          BACK TO PROFILE
        </Link>

        <div className="mb-8 flex items-center gap-3 border-b-2 border-black pb-4">
          <div className="inline-flex h-12 w-12 items-center justify-center border-2 border-black bg-black">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black md:text-3xl">
              Order history
            </h1>
            <p className="mt-1 text-sm text-neutral-700">
              {orders.length === 0
                ? "No orders yet"
                : `${orders.length} ${orders.length === 1 ? "order" : "orders"}`}
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="border-2 border-black bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border-2 border-black bg-white">
              <ShoppingBag className="h-8 w-8 text-neutral-700" />
            </div>
            <h3 className="mb-1 text-lg font-black uppercase text-black">
              No orders yet
            </h3>
            <p className="mb-6 text-sm text-neutral-700">
              When you place an order, it will appear here.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-2 border-black bg-black px-6 py-2.5 text-sm font-black uppercase tracking-[0.18em] text-white hover:bg-white hover:text-black"
            >
              <ShoppingBag className="h-4 w-4" />
              START SHOPPING
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