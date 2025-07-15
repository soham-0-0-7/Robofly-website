
'use client';

import { useState, ChangeEvent, FormEvent, JSX } from 'react';
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  surveillanceType: string;
  surveillanceTypeOther: string;
  flightTime: number | '';
  cameraType: string;
  cameraTypeOther: string;
  transmissionRange: number | '';
  useFrequency: string;
  operatingEnvironment: string;
  regulatoryPermissions: string;
  specialRequirements: string;
}

const surveillanceTypes = [
  'Perimeter monitoring',
  'Infrastructure surveillance',
  'Crowd monitoring',
  'Other'
];

const cameraTypes = [
  'Thermal',
  'Optical',
  'Night Vision',
  'Zoom',
  'Multispectral',
  'Other'
];

const useFrequencies = ['Daily', 'Weekly', 'Emergency Only'];
const operatingEnvironments = ['Urban', 'Forest', 'Coastal', 'Desert'];

export default function SecondProdForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: '',
    organizationName: '',
    email: '',
    phone: '',
    surveillanceType: '',
    surveillanceTypeOther: '',
    flightTime: '',
    cameraType: '',
    cameraTypeOther: '',
    transmissionRange: '',
    useFrequency: '',
    operatingEnvironment: '',
    regulatoryPermissions: '',
    specialRequirements: ''
  });

  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [hasGeneralError, setHasGeneralError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setForm(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    setErrors(prev => ({ ...prev, [name]: undefined }));
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
    console.log(form);
    alert('Surveillance drone inquiry submitted successfully!');
  };

  return (
    <div className="flex justify-center py-0 px-0">
  <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl w-full rounded-xl bg-white p-0">
      <h2 className="text-2xl font-bold text-center mb-4">Surveillance Drone Inquiry Form</h2>
        
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
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">
              Company/Organization <span className="text-red-600">*</span>
            </label>
            <input
              name="organizationName"
              required
              type="text"
              value={form.organizationName}
              onChange={handleChange}
              className="form-input"
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
              className="form-input"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block font-medium mb-1">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              name="phone"
              required
              type="text"
              value={form.phone}
              onChange={handleChange}
              className="form-input"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Type of Surveillance
          </label>
          <select
            name="surveillanceType"
            value={form.surveillanceType}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select surveillance type</option>
            {surveillanceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {form.surveillanceType === 'Other' && (
            <input
              name="surveillanceTypeOther"
              type="text"
              placeholder="Please specify..."
              value={form.surveillanceTypeOther}
              onChange={handleChange}
              className="form-input mt-2"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Required Flight Time (minutes)
            </label>
            <input
              name="flightTime"
              type="number"
              min="0"
              value={form.flightTime}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">
              Required Transmission Range (metres)
            </label>
            <input
              name="transmissionRange"
              type="number"
              min="0"
              value={form.transmissionRange}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Preferred Camera Type
          </label>
          <select
            name="cameraType"
            value={form.cameraType}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select camera type</option>
            {cameraTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {form.cameraType === 'Other' && (
            <input
              name="cameraTypeOther"
              type="text"
              placeholder="Please specify..."
              value={form.cameraTypeOther}
              onChange={handleChange}
              className="form-input mt-2"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Expected Use Frequency <span className="text-red-600">*</span>
            </label>
            <select
              name="useFrequency"
              required
              value={form.useFrequency}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select frequency</option>
              {useFrequencies.map(freq => (
                <option key={freq} value={freq}>{freq}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block font-medium mb-1">
              Operating Environment <span className="text-red-600">*</span>
            </label>
            <select
              name="operatingEnvironment"
              required
              value={form.operatingEnvironment}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select environment</option>
              {operatingEnvironments.map(env => (
                <option key={env} value={env}>{env}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Any Regulatory Permissions Already Acquired? <span className="text-red-600">*</span>
          </label>
          <select
            name="regulatoryPermissions"
            required
            value={form.regulatoryPermissions}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Special Requirements
          </label>
          <textarea
            name="specialRequirements"
            rows={4}
            value={form.specialRequirements}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-[#1ba100] hover:bg-[#104a2f] text-white py-3 px-8 rounded-full transition hover:scale-105"
          >
            Submit Inquiry
          </button>

          {hasGeneralError && (
            <p className="text-red-600 text-center mt-4">
              There was some error in filling the form. Please recheck!
            </p>
          )}
        </div>

        <style>{`
          .form-input {
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            width: 100%;
            background: ${colorPalette.whiteMint};
            transition: box-shadow 0.3s ease;
          }
          .form-input:focus {
            outline: none;
            box-shadow: 0 0 0 2px ${colorPalette.green3};
          }
        `}</style>
      </form>
    </div>
  );
}
