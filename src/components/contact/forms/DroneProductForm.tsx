'use client';

import { useState, useEffect } from 'react';
import { colorPalette } from "@/utils/variables";

interface DroneProductFormProps {
  id?: string;
}

const indianStatesAndUTs = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];

export default function DroneProductForm({ id = '' }: DroneProductFormProps) {
  const [form, setForm] = useState({
    droneType: 'Unsure',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    state: '',
    product: '',
    amc: '',
  });

  // Set default drone type based on ID
  useEffect(() => {
    const mapIdToDroneType: Record<string, string> = {
      '1': 'Surveillance',
      '2': 'Agricultural',
      '3': 'Custom',      // Logistics treated as Custom
      '4': 'FPV',
      '5': 'Training',
      '6': 'Custom',
    };

    if (id && mapIdToDroneType[id]) {
      setForm((prev) => ({ ...prev, droneType: mapIdToDroneType[id] }));
    } else {
      setForm((prev) => ({ ...prev, droneType: 'Unsure' }));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl w-full rounded-xl bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Type of Drone Dropdown */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Type of Drone <span className="text-red-600">*</span></label>
            <select
              name="droneType"
              required
              value={form.droneType}
              onChange={handleChange}
              className="input"
            >
              <option value="Unsure">Unsure</option>
              <option value="Agricultural">Agricultural Drone</option>
              <option value="Surveillance">Surveillance Drone</option>
              <option value="FPV">FPV Drone</option>
              <option value="Training">Training Drone</option>
              <option value="Custom">Custom Drone</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">First Name <span className="text-red-600">*</span></label>
            <input name="firstName" required value={form.firstName} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">Last Name <span className="text-red-600">*</span></label>
            <input name="lastName" required value={form.lastName} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">Email ID <span className="text-red-600">*</span></label>
            <input name="email" required value={form.email} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone No. <span className="text-red-600">*</span></label>
            <input name="phone" required value={form.phone} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input name="company" value={form.company} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">City/Town/Village <span className="text-red-600">*</span></label>
            <input name="city" required value={form.city} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">
              State / UT <span className="text-red-600">*</span>
            </label>
            <select
              name="state"
              required
              value={form.state}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select State / UT</option>
              {indianStatesAndUTs.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Drone Product of Interest <span className="text-red-600">*</span></label>
            <input name="product" required value={form.product} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">Drone Product Part or AMC of Interest <span className="text-red-600">*</span></label>
            <input name="amc" required value={form.amc} onChange={handleChange} className="input" />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-[#1ba100] hover:bg-[#104a2f] hover:cursor-pointer text-white py-2 px-8 rounded-full transition"
          >
            Submit
          </button>
        </div>

        <style jsx>{`
          .input {
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            width: 100%;
            background: ${colorPalette.whiteMint};
            transition: box-shadow 0.3s ease;
          }
          .input:focus {
            outline: none;
            box-shadow: 0 0 0 2px ${colorPalette.green3};
          }
        `}</style>
      </form>
    </div>
  );
}
