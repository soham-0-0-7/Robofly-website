'use client';

import { useState, ChangeEvent, FormEvent, JSX } from 'react';
import { colorPalette } from "@/utils/variables";

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  mappingRequirement: string;
  areaToBeMapped: string;
  locationCoordinates: string;
  terrainType: string;
  usagePurpose: string;
  deliveryTimeline: string;
  additionalRequirements: string;
}

export default function SecondServiceForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: '', organizationName: '', email: '', phone: '', mappingRequirement: '',
    areaToBeMapped: '', locationCoordinates: '', terrainType: '', usagePurpose: '',
    deliveryTimeline: '', additionalRequirements: ''
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
   <div className="flex justify-center py-0 px-0">
  <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl w-full rounded-xl bg-white p-0">
     <h2 className="text-2xl font-bold text-center mb-4">Drone Mapping Services Inquiry Form</h2>
        
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
              Organization/Company Name <span className="text-red-600">*</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Mapping Requirement <span className="text-red-600">*</span>
            </label>
            <select
              name="mappingRequirement"
              required
              value={form.mappingRequirement}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Mapping Type</option>
              <option value="DSM">DSM</option>
              <option value="DTM">DTM</option>
              <option value="Ortho">Ortho</option>
              <option value="Contour">Contour</option>
              <option value="Others">Others</option>
            </select>
          </div>
          
          <div>
            <label className="block font-medium mb-1">
              Area to be Mapped (in sq. km) <span className="text-red-600">*</span>
            </label>
            <input
              name="areaToBeMapped"
              required
              type="number"
              min="0"
              step="0.01"
              value={form.areaToBeMapped}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Location/Coordinates (if available)
          </label>
          <textarea
            name="locationCoordinates"
            rows={3}
            value={form.locationCoordinates}
            onChange={handleChange}
            className="input"
            placeholder="Enter coordinates or detailed location description..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Terrain Type <span className="text-red-600">*</span>
            </label>
            <select
              name="terrainType"
              required
              value={form.terrainType}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Terrain Type</option>
              <option value="Urban">Urban</option>
              <option value="Forest">Forest</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>
          
          <div>
            <label className="block font-medium mb-1">
              Usage Purpose <span className="text-red-600">*</span>
            </label>
            <select
              name="usagePurpose"
              required
              value={form.usagePurpose}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Usage Purpose</option>
              <option value="Construction">Construction</option>
              <option value="Survey">Survey</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Timeline to Deliver Output <span className="text-red-600">*</span>
          </label>
          <input
            name="deliveryTimeline"
            required
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={form.deliveryTimeline}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Additional Requirements
          </label>
          <textarea
            name="additionalRequirements"
            rows={4}
            value={form.additionalRequirements}
            onChange={handleChange}
            className="input"
            placeholder="Please specify any additional requirements or special considerations..."
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
