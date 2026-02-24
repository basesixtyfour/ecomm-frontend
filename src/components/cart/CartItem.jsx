import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Package, Plus, Minus, Trash2 } from "lucide-react";
import { updateCartItemAsync, deleteCartItemAsync } from "../../context/cartSlice";
import { formatPrice } from "../../utils/price";
import { toast } from "react-toastify";

export const CartItem = ({ id, quantity, product }) => {
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCartUpdate = async (newQuantity) => {
    setIsUpdating(true);
    try {
      if (newQuantity <= 0) {
        await dispatch(deleteCartItemAsync(id)).unwrap();
      } else {
        await dispatch(updateCartItemAsync({ itemId: id, quantity: newQuantity })).unwrap();
      }
    } catch (err) {
      toast.error(err || "Failed to update cart", { toastId: "cart:update:exception" });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex gap-4 md:gap-5 p-4 md:p-5">
      <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
        <Package className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <Link
          to={`/products/${product?.id}`}
          className="font-semibold text-gray-900 hover:text-gray-600 transition-colors line-clamp-2"
        >
          {product?.name ?? `Item #${id}`}
        </Link>
        {product?.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">
            {product.description}
          </p>
        )}
        <p className="text-gray-600 text-sm mt-2">
          {formatPrice(product?.price ?? 0)} × {quantity}
        </p>
      </div>
      <div className="flex-shrink-0 flex flex-col items-end gap-3">
        <p className="font-semibold text-gray-900">
          {formatPrice(((product?.price ?? 0) * quantity))}
        </p>
        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => handleCartUpdate(quantity - 1)}
            disabled={isUpdating}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title={quantity === 1 ? "Remove from cart" : "Decrease quantity"}
          >
            {quantity === 1 ? (
              <Trash2 className="w-5 h-5 text-red-600" />
            ) : (
              <Minus className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <span className="flex-1 text-center font-semibold text-gray-900 min-w-[2rem]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => handleCartUpdate(quantity + 1)}
            disabled={isUpdating}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Increase quantity"
          >
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};
