import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

export const EmptyCartCTA = () => {
  return (
    <div className="border-2 border-black bg-white">
      <div className="px-6 py-16 text-center md:py-24">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center border-2 border-black bg-white">
          <ShoppingBag className="h-10 w-10 text-neutral-700" />
        </div>
        <h2 className="mb-2 text-xl font-black uppercase tracking-tight text-black">
          YOUR CART IS EMPTY
        </h2>
        <p className="mx-auto mb-8 max-w-sm text-sm text-neutral-800">
          Looks like you haven’t added anything yet. Browse our products and
          find something you’ll love.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 border-2 border-black bg-black px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white"
        >
          <ShoppingBag className="h-5 w-5" />
          BROWSE PRODUCTS
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};
