import { useState } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Tag, Plus, Minus, Trash2 } from "lucide-react";
import {
  addCartItemAsync,
  updateCartItemAsync,
  deleteCartItemAsync,
  selectCartItems,
} from "../context/cartSlice";
import { toast } from "react-toastify";
import { formatPrice } from "../utils/price";

export const ProductInfo = () => {
  const product = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!product) return null;

  const cartItem = items.find((item) => item.product.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;

  const handleCartUpdate = async (newQuantity) => {
    if (!isAuthenticated) {
      toast.info("Please login to update your cart", { toastId: "cart:auth" });
      navigate("/login");
      return;
    }

    setIsUpdating(true);
    try {
      if (newQuantity <= 0 && cartItem) {
        await dispatch(deleteCartItemAsync(cartItem.id)).unwrap();
      } else if (cartItem) {
        await dispatch(updateCartItemAsync({ itemId: cartItem.id, quantity: newQuantity })).unwrap();
      } else {
        await dispatch(addCartItemAsync({ productId: product.id, quantity: newQuantity })).unwrap();
      }
    } catch (err) {
      toast.error(err || "Failed to update cart", { toastId: "cart:update:exception" });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to products
        </Link>

        <article className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-contain bg-gray-50"
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <ShoppingCart className="w-24 h-24 text-gray-400" />
            </div>
          )}

          <div className="p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

            <p className="text-3xl font-bold text-gray-900 mb-4">
              {formatPrice(product.price)}
            </p>

            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {product.description}
            </p>

            {product.categories && product.categories.length > 0 && (
              <div className="mb-6">
                <span className="text-sm font-medium text-gray-500 mb-2 block">Categories</span>
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentQuantity > 0 ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => handleCartUpdate(currentQuantity - 1)}
                    disabled={isUpdating}
                    className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title={currentQuantity === 1 ? "Remove from cart" : "Decrease quantity"}
                  >
                    {currentQuantity === 1 ? (
                      <Trash2 className="w-5 h-5 text-red-600" />
                    ) : (
                      <Minus className="w-5 h-5 text-gray-700" />
                    )}
                  </button>
                  <span className="flex-1 text-center font-semibold text-gray-900">
                    {currentQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCartUpdate(currentQuantity + 1)}
                    disabled={isUpdating}
                    className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Increase quantity"
                  >
                    <Plus className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                <Link
                  to="/cart"
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold py-3 px-5 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  View cart
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleCartUpdate(1)}
                  disabled={isUpdating}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3 px-5 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  {isUpdating ? "Adding…" : "Add to cart"}
                </button>
                <Link
                  to="/cart"
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold py-3 px-5 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  View cart
                </Link>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};
