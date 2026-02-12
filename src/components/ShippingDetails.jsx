import { Truck } from "lucide-react";

export const ShippingDetails = ({ form, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-gray-500 rounded-xl shadow-md">
          <Truck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Shipping details
          </h2>
          <p className="text-sm text-gray-600">
            Dummy form — no real order is created.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full name
          </label>
          <input
            value={form.fullName}
            onChange={onChange("fullName")}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Bhupesh Dahiya"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            value={form.email}
            onChange={onChange("email")}
            type="email"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            value={form.phone}
            onChange={onChange("phone")}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="+91 98xxxxxx"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal code
          </label>
          <input
            value={form.postalCode}
            onChange={onChange("postalCode")}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="110001"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address line 1
          </label>
          <input
            value={form.addressLine1}
            onChange={onChange("addressLine1")}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="House no, street, area"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address line 2 (optional)
          </label>
          <input
            value={form.addressLine2}
            onChange={onChange("addressLine2")}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Landmark, apartment, etc."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            value={form.city}
            onChange={onChange("city")}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="New Delhi"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            value={form.state}
            onChange={onChange("state")}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Delhi"
          />
        </div>
      </div>
    </div>
  );
};

