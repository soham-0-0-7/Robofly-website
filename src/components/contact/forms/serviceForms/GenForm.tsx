'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { colorPalette } from '@/utils/variables';

const indianStatesAndUTs = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry'
];

const SERVICE_OPTIONS = [
  'Agricultural Surveillance (NDVI, CVI, crop health, etc.)',
  'Mapping & Surveying (DSM, DTM, Ortho)',
  'Dam or Infrastructure Inspection',
  'Forest Fire Monitoring / Prediction',
  'Post-Fire Impact Assessment',
  'Industrial & Infrastructure Drone-based Inspection',
  'Other'
];

export default function DroneInquiryForm() {
  const [form, setForm] = useState({
    fullName: '',
    organizationName: '',
    email: '',
    phone: '',
    services: [] as string[],
    otherService: '',
    description: '',
    state: '',
    city: '',
    address: '',
    areaSize: '',
    timelineFrom: '',
    timelineTo: '',
    frequency: '',
    otherFrequency: '',
    specialRequirements: ''
  });

  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  const [hasGeneralError, setHasGeneralError] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm(prev => {
        const updated = checked
          ? [...prev.services, value]
          : prev.services.filter(service => service !== value);
        return { ...prev, services: updated };
      });
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
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

  if (hasError) {
    setErrors(newErrors);
    setHasGeneralError(true);
    return;
  }

  setHasGeneralError(false);
  setErrors({});
  console.log(form);
  alert('Form submitted successfully!');
};

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">Full Name <span className="text-red-600">*</span></label>
            <input name="fullName" required className="input" value={form.fullName} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1">Company/Organization Name (if applicable)</label>
            <input name="organizationName" className="input" value={form.organizationName} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Email Address <span className="text-red-600">*</span></label>
            <input name="email" type="email" required className="input" value={form.email} onChange={handleChange} />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block mb-1">Phone Number <span className="text-red-600">*</span></label>
            <input name="phone" required className="input" value={form.phone} onChange={handleChange} />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="mt-6">
          <label className="block mb-1">Type of Service Required <span className="text-red-600">*</span></label>
          {SERVICE_OPTIONS.map(service => (
            <div key={service} className="mb-1">
              <label className="inline-flex items-center">
                <input type="checkbox" name="services" value={service} onChange={handleChange} className="mr-2" />
                {service}
              </label>
            </div>
          ))}
         {form.services.includes('Other') && (
          <div className="mt-2">
            <label className="block mb-1">Please specify other service:</label>
            <input
              name="otherService"
              className="input"
              placeholder="Please specify..."
              value={form.otherService}
              onChange={handleChange}
            />
          </div>
        )}
        </div>

        <div className="mt-6">
          <label className="block mb-1">Brief Description of Your Requirement <span className="text-red-600">*</span></label>
          <textarea name="description" required className="input" rows={4} value={form.description} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block mb-1">State <span className="text-red-600">*</span></label>
            <select name="state" required className="input" value={form.state} onChange={handleChange}>
              <option value="">Select State</option>
              {indianStatesAndUTs.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">City <span className="text-red-600">*</span></label>
            <input name="city" required className="input" value={form.city} onChange={handleChange} />
          </div>
        </div>

        <div className="mt-6">
          <label className="block mb-1">Address <span className="text-red-600">*</span></label>
          <textarea name="address" required className="input" rows={3} value={form.address} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block mb-1">Size of Area to be Covered <span className="text-red-600">*</span></label>
            <input name="areaSize" type="number" min="0" required className="input" value={form.areaSize} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1">Frequency of Service Needed <span className="text-red-600">*</span></label>
            <select name="frequency" required className="input" value={form.frequency} onChange={handleChange}>
              <option value="">Select</option>
              <option value="One-Time">One-Time</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Seasonal">Seasonal</option>
              <option value="Other">Other</option>
            </select>
            {/* {form.frequency === 'Other' && (
              <input name="otherFrequency" className="input mt-2" value={form.otherFrequency} onChange={handleChange} />
            )} */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block mb-1">Preferred Timeline From <span className="text-red-600">*</span></label>
            <input
              name="timelineFrom"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              required
              className="input"
              value={form.timelineFrom}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">Preferred Timeline To <span className="text-red-600">*</span></label>
            <input
              name="timelineTo"
              type="date"
              min={form.timelineFrom || new Date().toISOString().split('T')[0]}
              required
              className="input"
              value={form.timelineTo}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block mb-1">Any Special Requirements or Constraints?</label>
          <textarea name="specialRequirements" className="input" rows={3} value={form.specialRequirements} onChange={handleChange} />
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
      Email or Phone is invalid. Please correct and try again.
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