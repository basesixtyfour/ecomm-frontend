import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShippingDetails } from "../components/checkout/ShippingDetails";
import { PaymentMethod } from "../components/checkout/PaymentMethod";
import { CheckoutOrderSummary } from "../components/checkout/CheckoutOrderSummary";
import { createOrder } from "../services/api";
import { clearCartAsync } from "../context/cartSlice";

export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice, status } = useSelector((state) => state.cart);
  
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

  const itemCount = items?.reduce((sum, { quantity }) => sum + quantity, 0);

  if (status === "idle" || status === "loading") {
    return <div>Loading...</div>;
  }

  if (items?.length === 0) {
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

  const placeOrder = async () => {
    try {
      const orderData = {
        items: items.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
        })),
      };
      const order = await createOrder(orderData);
      await dispatch(clearCartAsync()).unwrap();
      toast.success("Order placed successfully!");
      navigate("/profile/orders", { state: { expandOrderId: order.id } });
    } catch (err) {
      toast.error(err?.message || "Failed to place order");
    }
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
              items={items}
              subtotal={totalPrice}
              canPlaceOrder={canPlaceOrder}
              placeOrder={placeOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};