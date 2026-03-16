import { Truck } from "lucide-react";

export const ShippingDetails = ({ form, onChange }) => {
  return (
    <div className="border-2 border-black bg-white p-6">
      <div className="mb-5 flex items-center gap-3 border-b-2 border-black pb-3">
        <div className="inline-flex h-10 w-10 items-center justify-center border-2 border-black bg-black">
          <Truck className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-black">
            SHIPPING DETAILS
          </h2>
          <p className="text-xs text-neutral-800">
            Dummy form — no real order is created.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-black">
            Full name
          </label>
          <input
            value={form.fullName}
            onChange={onChange("fullName")}
            className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
            placeholder="Bhupesh Dahiya"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-black">
            Email
          </label>
          <input
            value={form.email}
            onChange={onChange("email")}
            type="email"
            className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-black">
            Phone
          </label>
          <input
            value={form.phone}
            onChange={onChange("phone")}
            className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
            placeholder="+91 98xxxxxx"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-black">
            Postal code
          </label>
          <input
            value={form.postalCode}
            onChange={onChange("postalCode")}
            className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
            placeholder="110001"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-black">
            Address line 1
          </label>
          <input
            value={form.addressLine1}
            onChange={onChange("addressLine1")}
            className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
            placeholder="House no, street, area"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-black">
            Address line 2 (optional)
          </label>
          <input
            value={form.addressLine2}
            onChange={onChange("addressLine2")}
            className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
            placeholder="Landmark, apartment, etc."
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-black">
            City
          </label>
          <input
            value={form.city}
            onChange={onChange("city")}
            className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
            placeholder="New Delhi"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-black">
            State
          </label>
          <input
            value={form.state}
            onChange={onChange("state")}
            className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
            placeholder="Delhi"
          />
        </div>
      </div>
    </div>
  );
};

