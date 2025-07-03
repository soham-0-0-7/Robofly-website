'use client';

import { useState, ChangeEvent, FormEvent, JSX } from 'react';
import { colorPalette } from "@/utils/variables";

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  location: string;
  cropType: string;
  areaSize: string;
  serviceType: string;
  additionalInfo: string;
}

const indianStatesAndUTs = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

export default function FirstServiceForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: '', organizationName: '', email: '', phone: '', location: '',
    cropType: '', areaSize: '', serviceType: '', additionalInfo: ''
  });

  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [hasGeneralError, setHasGeneralError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone.trim());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    let hasError = false;

    if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
      hasError = true;
    }

    if (!validatePhone(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      setHasGeneralError(true);
      return;
    }

    setHasGeneralError(false);
    console.log(form);
    alert('Form submitted successfully!');
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl w-full rounded-xl bg-white p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Agricultural Surveillance Service Inquiry Form</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              name="fullName"
              required
              type="text"
              value={form.fullName}
              onChange={handleChange}
              className="input"
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">
              Organization Name <span className="text-red-600">*</span>
            </label>
            <input
              name="organizationName"
              required
              type="text"
              value={form.organizationName}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              name="email"
              required
              type="email"
              value={form.email}
              onChange={handleChange}
              className="input"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block font-medium mb-1">
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              name="phone"
              required
              type="text"
              value={form.phone}
              onChange={handleChange}
              className="input"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Location <span className="text-red-600">*</span>
          </label>
          <select
            name="location"
            required
            value={form.location}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select State/UT</option>
            {indianStatesAndUTs.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Type of Crop <span className="text-red-600">*</span>
            </label>
            <input
              name="cropType"
              required
              type="text"
              value={form.cropType}
              onChange={handleChange}
              className="input"
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">
              Area Size (in acres) <span className="text-red-600">*</span>
            </label>
            <input
              name="areaSize"
              required
              type="number"
              min="0"
              step="0.01"
              value={form.areaSize}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Type of Service Required <span className="text-red-600">*</span>
          </label>
          <select
            name="serviceType"
            required
            value={form.serviceType}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select Service Type</option>
            <option value="Health Monitoring">Health Monitoring</option>
            <option value="Yield Estimation">Yield Estimation</option>
            <option value="Irrigation Management">Irrigation Management</option>
            <option value="Pest Detection">Pest Detection</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Additional Info
          </label>
          <textarea
            name="additionalInfo"
            rows={4}
            value={form.additionalInfo}
            onChange={handleChange}
            className="input"
            placeholder="Please provide any additional information or specific requirements..."
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-[#1ba100] hover:bg-[#104a2f] text-white py-3 px-8 rounded-full transition hover:scale-105"
          >
            Submit Application
          </button>

          {hasGeneralError && (
            <p className="text-red-600 text-center mt-4">
              There was some error in filling the form. Please recheck!
            </p>
          )}
        </div>

        <style>{`
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
