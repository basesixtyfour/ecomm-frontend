import { useState } from "react";
import { Package, ShoppingBag } from "lucide-react";
import { formatPrice } from "../../utils/price";

export const OrderCard = ({ order, defaultOpen = false }) => {
    const [expanded, setExpanded] = useState(defaultOpen);
    const formattedDate = new Date(order.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  
    const itemCount = order.items?.length || 0;
  
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">
                Order #{order.id?.slice(0, 8)}...
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{formattedDate}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {formatPrice(order.total_price)}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
        </button>
  
        {expanded && (
          <div className="border-t border-gray-100 px-6 py-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Items
            </h4>
            <div className="space-y-3">
              {order.items?.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        Product #{typeof item.product === "object" ? item.product.id : item.product}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {formatPrice(item.price)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
              <span className="text-sm font-medium text-gray-600">Total</span>
              <span className="text-sm font-bold text-gray-900">
                {formatPrice(order.total_price)}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };
  