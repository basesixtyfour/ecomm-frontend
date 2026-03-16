import { ShieldCheck } from "lucide-react";
import { formatPrice } from "../../utils/price";

export const CheckoutOrderSummary = ({
  items,
  subtotal,
  canPlaceOrder,
  placeOrder,
}) => {
  return (
    <div className="sticky top-6 border-2 border-black bg-white p-6 shadow-[var(--shadow-hard-md)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-[0.18em] text-black">
          ORDER SUMMARY
        </h2>
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-800">
          <ShieldCheck className="h-4 w-4" />
          DUMMY CHECKOUT
        </div>
      </div>

      <div className="space-y-3 text-sm text-neutral-800">
        {items.map(({ id, product, quantity }) => (
          <div key={id} className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate font-semibold uppercase tracking-tight text-black">
                {product?.name ?? "Product"}
              </div>
              <div className="text-xs text-neutral-700">QTY: {quantity}</div>
            </div>
            <div className="whitespace-nowrap text-sm font-black text-black">
              {formatPrice((product?.price ?? 0) * quantity)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t-2 border-black pt-4 text-sm text-neutral-800">
        <div className="flex justify-between text-sm">
          <span>SUBTOTAL</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>SHIPPING</span>
          <span className="font-semibold">FREE</span>
        </div>
        <div className="flex items-center justify-between border-t border-black pt-2">
          <span className="font-semibold text-black">TOTAL</span>
          <span className="text-xl font-black text-black">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={placeOrder}
        disabled={!canPlaceOrder}
        className={[
          "mt-6 flex w-full items-center justify-center gap-2 border-2 border-black py-3.5 px-4 text-xs font-black uppercase tracking-[0.18em] transition-transform",
          canPlaceOrder
            ? "bg-black text-white shadow-[var(--shadow-hard-md)] hover:bg-white hover:text-black"
            : "bg-neutral-200 text-neutral-600 cursor-not-allowed",
        ].join(" ")}
      >
        PLACE ORDER (DUMMY)
      </button>

      <p className="mt-3 text-xs text-neutral-700">
        This is a placeholder checkout. No order is saved and no payment is
        processed.
      </p>
    </div>
  );
};

