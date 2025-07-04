
'use client';

import { useState, ChangeEvent, FormEvent, JSX } from 'react';
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";

interface FormData {
  fullName: string;
  institutionName: string;
  email: string;
  phone: string;
  unitsRequired: number | '';
  kitRequirement: string;
  additionalComponents: string;
  trainingRequired: string;
  deliveryTimeline: string;
  comments: string;
}

const kitRequirements = ['Kit', 'Assembled drone'];

export default function FifthProdForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: '',
    institutionName: '',
    email: '',
    phone: '',
    unitsRequired: '',
    kitRequirement: '',
    additionalComponents: '',
    trainingRequired: '',
    deliveryTimeline: '',
    comments: ''
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
    alert('Training drone inquiry submitted successfully!');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex justify-center py-0 px-0">
  <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl w-full rounded-xl bg-white p-0">
   <h2 className="text-2xl font-bold text-center mb-4">Training Drone (Educational) Inquiry Form</h2>
        
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
              Institution Name
            </label>
            <input
              name="institutionName"
              type="text"
              value={form.institutionName}
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
              Phone <span className="text-red-600">*</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Number of Units Required <span className="text-red-600">*</span>
            </label>
            <input
              name="unitsRequired"
              required
              type="number"
              min="1"
              value={form.unitsRequired}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">
              Kit requirement or assembled drone <span className="text-red-600">*</span>
            </label>
            <select
              name="kitRequirement"
              required
              value={form.kitRequirement}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select option</option>
              {kitRequirements.map(req => (
                <option key={req} value={req}>{req}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Additional Components Needed
          </label>
          <textarea
            name="additionalComponents"
            rows={3}
            value={form.additionalComponents}
            onChange={handleChange}
            className="form-input"
            placeholder="Spare props, tools, manuals, etc..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Training Material/Workshops Required? <span className="text-red-600">*</span>
            </label>
            <select
              name="trainingRequired"
              required
              value={form.trainingRequired}
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
              Delivery Timeline <span className="text-red-600">*</span>
            </label>
            <input
              name="deliveryTimeline"
              required
              type="date"
              min={today}
              value={form.deliveryTimeline}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Comments
          </label>
          <textarea
            name="comments"
            rows={4}
            value={form.comments}
            onChange={handleChange}
            className="form-input"
            placeholder="Any additional information or specific requirements..."
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
