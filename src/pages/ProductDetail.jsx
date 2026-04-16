import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart, Tag, Plus, Minus, Trash2 } from "lucide-react";
import { selectCartItems } from "../context/cartSlice";
import { useCartActions } from "../hooks/useCartActions";
import { toast } from "react-toastify";
import { formatPrice } from "../utils/price";

export const ProductDetail = () => {
  const product = useLoaderData();
  const items = useSelector(selectCartItems);
  const { addItem, updateItem, removeItem } = useCartActions();
  const [isUpdating, setIsUpdating] = useState(false);

  if (!product) return null;

  const cartItem = items.find((item) => item.product.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;

  const handleCartUpdate = async (newQuantity) => {
    setIsUpdating(true);
    try {
      if (newQuantity <= 0 && cartItem) {
        await removeItem({ itemId: cartItem.id, productId: product.id });
      } else if (cartItem) {
        await updateItem({ itemId: cartItem.id, productId: product.id, quantity: newQuantity });
      } else {
        await addItem(product, newQuantity);
      }
    } catch (err) {
      toast.error(err || "Failed to update cart", { toastId: "cart:update:exception" });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-800 hover:text-black"
        >
          ← BACK TO PRODUCTS
        </Link>

        <article className="border-2 border-black bg-white">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-64 w-full border-b-2 border-black bg-neutral-100 object-contain"
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center border-b-2 border-black bg-neutral-100">
              <ShoppingCart className="h-24 w-24 text-neutral-500" />
            </div>
          )}

          <div className="p-6 md:p-8">
            <h1 className="mb-3 text-2xl font-black uppercase tracking-tight text-black">
              {product.name}
            </h1>

            <p className="mb-4 text-3xl font-black text-black">
              {formatPrice(product.price)}
            </p>

            <p className="mb-6 text-base leading-relaxed text-neutral-800">
              {product.description}
            </p>

            {product.categories && product.categories.length > 0 && (
              <div className="mb-6">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-black">
                  CATEGORIES
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1.5 text-xs font-semibold uppercase"
                    >
                      <Tag className="h-3.5 w-3.5" />
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentQuantity > 0 ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 border-2 border-black bg-white p-1">
                  <button
                    type="button"
                    onClick={() => handleCartUpdate(currentQuantity - 1)}
                    disabled={isUpdating}
                    className="flex h-10 w-10 items-center justify-center border-r-2 border-black bg-white hover:bg-black hover:[&_svg]:text-white! disabled:cursor-not-allowed disabled:opacity-60"
                    title={currentQuantity === 1 ? "Remove from cart" : "Decrease quantity"}
                  >
                    {currentQuantity === 1 ? (
                      <Trash2 className="h-5 w-5 text-red-600" />
                    ) : (
                      <Minus className="h-5 w-5 text-black" />
                    )}
                  </button>
                  <span className="flex-1 text-center font-semibold text-black">
                    {currentQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCartUpdate(currentQuantity + 1)}
                    disabled={isUpdating}
                    className="flex h-10 w-10 items-center justify-center border-l-2 border-black bg-white hover:bg-black hover:[&_svg]:text-white! disabled:cursor-not-allowed disabled:opacity-60"
                    title="Increase quantity"
                  >
                    <Plus className="h-5 w-5 text-black" />
                  </button>
                </div>
                <Link
                  to="/cart"
                  className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black hover:bg-black hover:text-white"
                >
                  <ShoppingCart className="h-5 w-5" />
                  VIEW CART
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleCartUpdate(1)}
                  disabled={isUpdating}
                  className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-black bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white disabled:opacity-60"
                >
                  <Plus className="h-5 w-5" />
                  {isUpdating ? "ADDING…" : "ADD TO CART"}
                </button>
                <Link
                  to="/cart"
                  className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black hover:bg-black hover:text-white"
                >
                  <ShoppingCart className="h-5 w-5" />
                  VIEW CART
                </Link>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};
