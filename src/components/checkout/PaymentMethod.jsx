import { CreditCard } from "lucide-react";

export const PaymentMethod = ({ form, onChange }) => {
  return (
    <div className="border-2 border-black bg-white p-6">
      <div className="mb-5 flex items-center gap-3 border-b-2 border-black pb-3">
        <div className="inline-flex h-10 w-10 items-center justify-center border-2 border-black bg-black">
          <CreditCard className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-black">
            PAYMENT METHOD
          </h2>
          <p className="text-xs text-neutral-800">
            Dummy selection — no real payment is processed.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex cursor-pointer items-center justify-between gap-3 border-2 border-black p-4 hover:bg-neutral-100">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={form.paymentMethod === "cod"}
              onChange={onChange("paymentMethod")}
            />
            <div>
              <div className="text-sm font-semibold uppercase tracking-tight text-black">
                Cash on Delivery
              </div>
              <div className="text-xs text-neutral-700">
                Pay when you receive the order
              </div>
            </div>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800">
            COD
          </span>
        </label>

        <label className="flex cursor-pointer items-center justify-between gap-3 border-2 border-black p-4 hover:bg-neutral-100">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={form.paymentMethod === "card"}
              onChange={onChange("paymentMethod")}
            />
            <div>
              <div className="text-sm font-semibold uppercase tracking-tight text-black">
                Card
              </div>
              <div className="text-xs text-neutral-700">
                Dummy card payment option
              </div>
            </div>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800">
            VISA
          </span>
        </label>

        <label className="flex cursor-pointer items-center justify-between gap-3 border-2 border-black p-4 hover:bg-neutral-100">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={form.paymentMethod === "upi"}
              onChange={onChange("paymentMethod")}
            />
            <div>
              <div className="text-sm font-semibold uppercase tracking-tight text-black">
                UPI
              </div>
              <div className="text-xs text-neutral-700">
                Dummy UPI payment option
              </div>
            </div>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800">
            UPI
          </span>
        </label>
      </div>
    </div>
  );
};

