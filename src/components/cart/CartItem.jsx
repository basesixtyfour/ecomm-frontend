import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Plus, Minus, Trash2 } from "lucide-react";
import { useCartActions } from "../../hooks/useCartActions";
import { formatPrice } from "../../utils/price";
import { toast } from "react-toastify";

export const CartItem = ({ id, quantity, product }) => {
  const { updateItem, removeItem } = useCartActions();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCartUpdate = async (newQuantity) => {
    setIsUpdating(true);
    try {
      if (newQuantity <= 0) {
        await removeItem({ itemId: id, productId: product?.id });
      } else {
        await updateItem({ itemId: id, productId: product?.id, quantity: newQuantity });
      }
    } catch (err) {
      toast.error(err || "Failed to update cart", { toastId: "cart:update:exception" });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex gap-4 border-2 border-black bg-white p-4 md:gap-5 md:p-5">
      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center border-2 border-black bg-white md:h-24 md:w-24">
        <Package className="h-8 w-8 text-neutral-700 md:h-10 md:w-10" />
      </div>
      <div className="flex-1 min-w-0">
        <Link
          to={`/products/${product?.id}`}
          className="line-clamp-2 font-semibold uppercase tracking-tight text-black hover:text-neutral-700"
        >
          {product?.name ?? `Item #${id}`}
        </Link>
        {product?.description && (
          <p className="mt-1 line-clamp-1 text-sm text-neutral-700">
            {product.description}
          </p>
        )}
        <p className="mt-2 text-sm text-neutral-800">
          {formatPrice(product?.price ?? 0)} × {quantity}
        </p>
      </div>
      <div className="flex flex-shrink-0 flex-col items-end gap-3">
        <p className="font-black text-black">
          {formatPrice(((product?.price ?? 0) * quantity))}
        </p>
        <div className="flex items-center gap-3 border-2 border-black bg-white p-1">
          <button
            type="button"
            onClick={() => handleCartUpdate(quantity - 1)}
            disabled={isUpdating}
            className="flex h-10 w-10 items-center justify-center border-r-2 border-black bg-white hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            title={quantity === 1 ? "Remove from cart" : "Decrease quantity"}
          >
            {quantity === 1 ? (
              <Trash2 className="h-5 w-5 text-red-600" />
            ) : (
              <Minus className="h-5 w-5 text-black" />
            )}
          </button>
          <span className="min-w-[2rem] flex-1 text-center font-semibold text-black">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => handleCartUpdate(quantity + 1)}
            disabled={isUpdating}
            className="flex h-10 w-10 items-center justify-center border-l-2 border-black bg-white hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            title="Increase quantity"
          >
            <Plus className="h-5 w-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
