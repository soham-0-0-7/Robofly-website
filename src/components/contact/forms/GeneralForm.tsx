'use client';

import { useState } from 'react';
import { colorPalette } from "@/utils/variables";

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

export default function GeneralForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    city: '', state: '', message: '',
  });

  const [droneType, setDroneType] = useState('');
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  const [hasGeneralError, setHasGeneralError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) =>
    /^(?:\+91|0091)?[6-9]\d{9}$/.test(phone.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    let hasError = false;

    if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
      hasError = true;
    }

    if (!validatePhone(form.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      setHasGeneralError(true);
      return;
    }

    setHasGeneralError(false);
    console.log({ ...form, droneType });
    alert('Form submitted successfully!');
  };

  return (
    <div className="flex justify-center py-10 px-4" style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl w-full rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              First Name <span className="text-red-600">*</span>
            </label>
            <input name="firstName" required value={form.firstName} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input name="lastName" required value={form.lastName} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Email ID <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="input"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">
              Phone No. <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="input"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">
              City/Town/Village <span className="text-red-600">*</span>
            </label>
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
        </div>

        <div>
          <label className="block font-medium mb-1">
            Type of Drone <span className="text-red-600">*</span>
          </label>
          <select
            name="droneType"
            required
            value={droneType}
            onChange={(e) => setDroneType(e.target.value)}
            className="input"
          >
            <option value="">Select Type of Drone</option>
            <option value="General">General / Other</option>
            <option value="Agricultural">Agricultural Drone</option>
            <option value="Surveillance">Surveillance Drone</option>
            <option value="FPV">FPV Drone</option>
            <option value="Training">Training Drone</option>
            <option value="Custom">Custom Drone</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Your Message/Query <span className="text-red-600">*</span>
          </label>
          <textarea
            name="message"
            rows={4}
            required
            value={form.message}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-[#1ba100] hover:bg-[#104a2f] hover:cursor-pointer text-white py-2 px-8 rounded-full transition"
          >
            Submit
          </button>

          {hasGeneralError && (
            <p className="text-red-600 text-center mt-4">
              There was some error in filling the form. Please recheck!
            </p>
          )}
        </div>

        <style jsx>{`
          .input {
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            width: 100%;
            background: ${colorPalette.whiteMint};
            transition: border-color 0.3s ease;
          }
          .input:focus {
            outline: none;
            border-color: ${colorPalette.green3};
          }
        `}</style>
      </form>
    </div>
  );
}
