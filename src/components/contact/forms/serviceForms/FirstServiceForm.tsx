'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { colorPalette } from "@/utils/variables";

const indianStatesAndUTs = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

const ANALYSIS_OPTIONS = ["NDVI", "CVI", "Crop Yield", "Crop Mortality", "Crop Height", "Crop Type"];

export default function AgriDroneForm() {
  const [form, setForm] = useState({
    fullName: '',
    organizationName: '',
    email: '',
    phone: '',
    cropType: '',
    areaSize: '',
    state: '',
    city: '',
    address: '',
    analysisTypes: [] as string[],
    analysisOther: '',
    frequency: '',
    specificIssues: '',
    previousUsage: '',
    customParameters: '',
    expectedStartDate: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  const [hasGeneralError, setHasGeneralError] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone.trim());

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleCheckboxChange = (value: string) => {
    setForm(prev => {
      const current = prev.analysisTypes;
      return current.includes(value)
        ? { ...prev, analysisTypes: current.filter(v => v !== value) }
        : { ...prev, analysisTypes: [...current, value] };
    });
  };

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

    setErrors(newErrors);
    setHasGeneralError(hasError);
    if (hasError) return;

    console.log(form);
    alert('Form submitted successfully!');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl w-full rounded-xl bg-white p-0">
        <h2 className="text-2xl font-bold text-center mb-4">Drone-Based Agriculture Analysis Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">Full Name <span className="text-red-600">*</span></label>
            <input name="fullName" required value={form.fullName} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block mb-1">Organization/Farm Name <span className="text-red-600">*</span></label>
            <input name="organizationName" required value={form.organizationName} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block mb-1">Email <span className="text-red-600">*</span></label>
            <input name="email" type="email" required value={form.email} onChange={handleChange} className="input" />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block mb-1">Phone <span className="text-red-600">*</span></label>
            <input name="phone" required value={form.phone} onChange={handleChange} className="input" />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block mb-1">Crop Type <span className="text-red-600">*</span></label>
            <input name="cropType" required value={form.cropType} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block mb-1">Total Farm Area (in hectares) <span className="text-red-600">*</span></label>
            <input name="areaSize" type="number" required min={0} value={form.areaSize} onChange={handleChange} className="input" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">State <span className="text-red-600">*</span></label>
            <select name="state" required value={form.state} onChange={handleChange} className="input">
              <option value="">Select State</option>
              {indianStatesAndUTs.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1">City <span className="text-red-600">*</span></label>
            <input name="city" required value={form.city} onChange={handleChange} className="input" />
          </div>
        </div>

        <div>
          <label className="block mb-1">Address <span className="text-red-600">*</span></label>
          <textarea name="address" required rows={3} value={form.address} onChange={handleChange} className="input" />
        </div>

        <div>
          <label className="block mb-1">Desired Analysis <span className="text-red-600">*</span></label>
          <div className="grid grid-cols-2 gap-2">
            {ANALYSIS_OPTIONS.map(opt => (
              <label key={opt} className="flex items-center gap-2">
                <input type="checkbox" checked={form.analysisTypes.includes(opt)} onChange={() => handleCheckboxChange(opt)} className="form-checkbox" />
                {opt}
              </label>
            ))}
          </div>
          {form.analysisTypes.includes('Other') && (
            <input name="analysisOther" className="input mt-2" placeholder="Add more analysis" value={form.analysisOther} onChange={handleChange} />
          )}
        </div>

        <div>
          <label className="block mb-1">Frequency of Analysis <span className="text-red-600">*</span></label>
          <select name="frequency" required value={form.frequency} onChange={handleChange} className="input">
            <option value="">Select</option>
            <option value="One-time">One-time</option>
            <option value="Monthly">Monthly</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Specific Issues Observed (Optional)</label>
          <textarea name="specificIssues" value={form.specificIssues} onChange={handleChange} className="input" rows={3} />
        </div>

        <div>
          <label className="block mb-1">Previous Use of Drone/Remote Sensing? <span className="text-red-600">*</span></label>
          <select name="previousUsage" required value={form.previousUsage} onChange={handleChange} className="input">
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Any Custom Parameters Required? (Optional)</label>
          <textarea name="customParameters" value={form.customParameters} onChange={handleChange} className="input" rows={3} />
        </div>

        <div>
          <label className="block mb-1">Expected Start Date <span className="text-red-600">*</span></label>
          <input name="expectedStartDate" type="date" min={today} required value={form.expectedStartDate} onChange={handleChange} className="input" />
        </div>

        <div>
          <label className="block mb-1">Additional Notes</label>
          <textarea name="additionalNotes" value={form.additionalNotes} onChange={handleChange} className="input" rows={3} />
        </div>

        <div className="text-center">
          <button type="submit" className="bg-[#1ba100] hover:bg-[#104a2f] text-white py-3 px-8 rounded-full transition hover:scale-105">
            Submit Application
          </button>
          {hasGeneralError && (
            <p className="text-red-600 text-center mt-4">
              Email or Phone is invalid. Please correct and try again.
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
          .form-checkbox {
            margin-right: 0.5rem;
          }
        `}</style>
      </form>
    </div>
  );
}
