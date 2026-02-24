import { CreditCard } from "lucide-react";

export const PaymentMethod = ({ form, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-gray-500 rounded-xl shadow-md">
          <CreditCard className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Payment method</h2>
          <p className="text-sm text-gray-600">
            Dummy selection — no real payment is processed.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center justify-between gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={form.paymentMethod === "cod"}
              onChange={onChange("paymentMethod")}
            />
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Cash on Delivery
              </div>
              <div className="text-xs text-gray-600">
                Pay when you receive the order
              </div>
            </div>
          </div>
          <span className="text-xs font-medium text-gray-600">COD</span>
        </label>

        <label className="flex items-center justify-between gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={form.paymentMethod === "card"}
              onChange={onChange("paymentMethod")}
            />
            <div>
              <div className="text-sm font-semibold text-gray-900">Card</div>
              <div className="text-xs text-gray-600">
                Dummy card payment option
              </div>
            </div>
          </div>
          <span className="text-xs font-medium text-gray-600">VISA</span>
        </label>

        <label className="flex items-center justify-between gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={form.paymentMethod === "upi"}
              onChange={onChange("paymentMethod")}
            />
            <div>
              <div className="text-sm font-semibold text-gray-900">UPI</div>
              <div className="text-xs text-gray-600">
                Dummy UPI payment option
              </div>
            </div>
          </div>
          <span className="text-xs font-medium text-gray-600">UPI</span>
        </label>
      </div>
    </div>
  );
};

