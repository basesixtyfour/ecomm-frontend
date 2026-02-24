import { ShieldCheck } from "lucide-react";
import { formatPrice } from "../../utils/price";

export const CheckoutOrderSummary = ({
  items,
  subtotal,
  canPlaceOrder,
  placeOrder,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>
        <div className="inline-flex items-center gap-2 text-xs font-medium text-gray-600">
          <ShieldCheck className="w-4 h-4" />
          Protected route
        </div>
      </div>

      <div className="space-y-3">
        {items.map(({ id, product, quantity }) => (
          <div key={id} className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {product?.name ?? "Product"}
              </div>
              <div className="text-xs text-gray-600">Qty: {quantity}</div>
            </div>
            <div className="text-sm font-semibold text-gray-900 whitespace-nowrap">
              {formatPrice(subtotal)}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4 space-y-2 text-gray-700">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className="font-medium">Free</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={placeOrder}
        disabled={!canPlaceOrder}
        className={[
          "w-full mt-6 flex items-center justify-center gap-2 font-semibold py-3.5 px-4 rounded-lg transition-colors duration-200 shadow-md",
          canPlaceOrder
            ? "bg-gray-500 hover:bg-gray-600 text-white hover:shadow-lg"
            : "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none",
        ].join(" ")}
      >
        Place order (dummy)
      </button>

      <p className="mt-3 text-xs text-gray-500">
        This is a placeholder checkout. No order is saved and no payment is
        processed.
      </p>
    </div>
  );
};

