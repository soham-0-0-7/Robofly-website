'use client';

import { useState, ChangeEvent, FormEvent, JSX } from 'react';
import { colorPalette } from "@/utils/variables";

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  linkedin: string;
  hearAbout: string;
  experience: string;
  education: string;
  workplace: string;
  interest: string;
  message: string;
  relocate: string;
  availability: string;
  currentSalary: string;
  expectedSalary: string;
  resume: string | null;
  portfolio: string | null;
}

type FieldConfig = [keyof FormData, string];

const indianStatesAndUTs = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export default function CareerForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', gender: '', phone: '', email: '', city: '', state: '', linkedin: '',
    hearAbout: '', experience: '', education: '', workplace: '', interest: '',
    message: '', relocate: '', availability: '', currentSalary: '', expectedSalary: '', resume: null, portfolio: null
  });

  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [hasGeneralError, setHasGeneralError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) =>
    /^(?:\+91|0091)?[6-9]\d{9}$/.test(phone.trim());

  const handleSubmit = (e: FormEvent) => {
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
    console.log(form);
    alert('Form submitted successfully!');
  };

  const basicFields: FieldConfig[] = [
    ['firstName', 'First Name'],
    ['lastName', 'Last Name'],
    ['gender', 'Gender'],
    ['phone', 'Phone No.'],
    ['email', 'Email ID'],
    ['city', 'City/Town/Village'],
    ['state', 'State / UT'],
    ['linkedin', 'LinkedIn Profile URL'],
    ['hearAbout', 'How did you hear about this Job Opening?'],
    ['experience', 'Experience (in years)'],
    ['education', 'Educational Qualification'],
    ['workplace', 'Current/Previous Place of Work'],
    ['interest', 'Why are you interested in this role?']
  ];

  const additionalFields: FieldConfig[] = [
    ['relocate', 'Are you willing to relocate?'],
    ['availability', 'Availability to join the new role (in months)'],
    ['currentSalary', 'Current Salary (INR)'],
    ['expectedSalary', 'Expected Salary']
  ];

  return (
    <div className="flex justify-center py-10 px-4">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl w-full rounded-xl bg-white">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {basicFields.map(([key, label]) => (
            <div key={key} className={key === 'interest' ? 'md:col-span-2' : ''}>
              <label className="block font-medium mb-1">
                {label} {(key !== 'workplace' && key !== 'interest') && <span className="text-red-600">*</span>}
              </label>
              {key === 'gender' ? (
                <select
                  name={key}
                  required
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : key === 'state' ? (
                <select
                  name={key}
                  required
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select State / UT</option>
                  {indianStatesAndUTs.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              ) : key === 'hearAbout' ? (
                <select
                  name={key}
                  required
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Company Website">Company Website</option>
                  <option value="Friend/Colleague">Friend/Colleague</option>
                  <option value="Job Portal">Job Portal</option>
                  <option value="Other">Other</option>
                </select>
              ) : key === 'experience' ? (
                <input
                  name={key}
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                />
              ) : key === 'email' ? (
                <>
                  <input
                    name={key}
                    required
                    type="email"
                    value={form[key] as string}
                    onChange={handleChange}
                    className="input"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </>
              ) : key === 'phone' ? (
                <>
                  <input
                    name={key}
                    required
                    type="text"
                    value={form[key] as string}
                    onChange={handleChange}
                    className="input"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </>
              ) : key === 'interest' ? (
                <textarea
                  name={key}
                  rows={4}
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                  placeholder="Why are you interested in this role?"
                />
              ) : (
                <input
                  name={key}
                  required={key !== 'workplace'}
                  type={key === 'linkedin' ? 'url' : 'text'}
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                />
              )}
            </div>
          ))}
        </div>

        {/* Message */}
        <div>
          <label className="block font-medium mb-1">
            Your Message/Query
          </label>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* Resume and Portfolio as URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Resume/CV (Drive link) <span className="text-red-600">*</span>
            </label>
            <input
              type="url"
              name="resume"
              required
              placeholder="make your file in drive public"
              value={form.resume || ''}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Upload Portfolio (Drive link, optional)
            </label>
            <input
              type="url"
              name="portfolio"
              placeholder="make your file in drive public"
              value={form.portfolio || ''}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {additionalFields.map(([key, label]) => (
            <div key={key}>
              <label className="block font-medium mb-1">
                {label} {key !== 'currentSalary' && <span className="text-red-600">*</span>}
              </label>
              {key === 'relocate' ? (
                <select
                  name={key}
                  required
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              ) : (
                <input
                  name={key}
                  required={key !== 'currentSalary'}
                  type="number"
                  min="0"
                  step="1"
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                />
              )}
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#1ba100] hover:bg-[#104a2f] text-white py-2 px-8 rounded-full transition hover:scale-105"
          >
            Submit Application
          </button>
          {hasGeneralError && (
            <p className="text-red-600 text-center mt-4">
              There was some error in filling the form. Please recheck!
            </p>
          )}
        </div>

        {/* Styles */}
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
