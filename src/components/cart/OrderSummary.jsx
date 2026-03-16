import { Link } from "react-router-dom";
import { ArrowRight, LogIn } from "lucide-react";
import { formatPrice } from "../../utils/price";

export const OrderSummary = ({ subtotal, itemCount, isGuest = false }) => {
  return (
    <div className="sticky top-6 border-2 border-black bg-white p-6 text-black shadow-[var(--shadow-hard-md)]">
      <h2 className="mb-4 text-sm font-black uppercase tracking-[0.18em]">
        ORDER SUMMARY
      </h2>
      <div className="space-y-2 text-sm text-neutral-800">
        <div className="flex justify-between">
          <span>Subtotal ({itemCount} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t-2 border-black pt-4">
        <span className="text-sm font-semibold">TOTAL</span>
        <span className="text-xl font-black">
          {formatPrice(subtotal)}
        </span>
      </div>
      {isGuest ? (
        <>
          <Link
            to={`/login?redirectUrl=${encodeURIComponent("/cart")}`}
            className="mt-6 flex w-full items-center justify-center gap-2 border-2 border-black bg-[var(--color-accent)] py-3.5 px-4 text-sm font-black uppercase tracking-[0.18em] text-[var(--color-accent-foreground)] shadow-[var(--shadow-hard-md)] hover:bg-black hover:text-[var(--color-accent-foreground)]"
          >
            <LogIn className="h-5 w-5" />
            SIGN IN TO CHECKOUT
          </Link>
          <p className="mt-3 text-center text-[11px] text-neutral-700">
            Your cart will be saved when you sign in.
          </p>
        </>
      ) : (
        <Link
          to="/checkout"
          className="mt-6 flex w-full items-center justify-center gap-2 border-2 border-black bg-black py-3.5 px-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[var(--shadow-hard-md)] hover:bg-white hover:text-black"
        >
          PROCEED TO CHECKOUT
          <ArrowRight className="h-5 w-5" />
        </Link>
      )}
      <Link
        to="/products"
        className="mt-3 block text-center text-xs font-semibold uppercase tracking-[0.18em] text-neutral-800 transition-colors hover:text-black"
      >
        CONTINUE SHOPPING
      </Link>
    </div>
  );
};
