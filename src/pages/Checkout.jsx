import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ShippingDetails } from "../components/ShippingDetails";
import { PaymentMethod } from "../components/PaymentMethod";
import { CheckoutOrderSummary } from "../components/CheckoutOrderSummary";

export const Checkout = () => {
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const cart = cartState.cart;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  // Calculate subtotal in paisa (keep calculations in paisa to avoid floating point errors)
  const { subtotal, itemCount } = useMemo(() => {
    const subtotalValue = cart.reduce((sum, { product, quantity }) => {
      return sum + (product?.price ?? 0) * quantity;
    }, 0);
    const itemCountValue = cart.reduce((sum, { quantity }) => sum + quantity, 0);
    return { subtotal: subtotalValue, itemCount: itemCountValue };
  }, [cart]);

  if (cartState.status === "idle" || cartState.status === "loading") {
    return <div>Loading...</div>;
  }

  if (cart.length === 0) {
    console.log("Cart is empty");
    return <Navigate to="/cart" />;
  }

  const canPlaceOrder =
    form.fullName.trim().length > 1 &&
    form.email.trim().length > 3 &&
    form.phone.trim().length > 6 &&
    form.addressLine1.trim().length > 4 &&
    form.city.trim().length > 1 &&
    form.state.trim().length > 1 &&
    form.postalCode.trim().length > 3 &&
    !!form.paymentMethod;

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const placeOrder = () => {
    alert("Dummy checkout: order placed (not really).");
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Checkout
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Review your order and enter delivery details ({itemCount}{" "}
              {itemCount === 1 ? "item" : "items"})
            </p>
          </div>
          <Link
            to="/cart"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back to cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ShippingDetails form={form} onChange={onChange} />
            <PaymentMethod form={form} onChange={onChange} />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <CheckoutOrderSummary
              cart={cart}
              subtotal={subtotal}
              canPlaceOrder={canPlaceOrder}
              placeOrder={placeOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};