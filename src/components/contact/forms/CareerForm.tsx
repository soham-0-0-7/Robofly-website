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
  position: string;
  location: string;
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
  resume: File | null;
  portfolio: File | null;
}

type FieldConfig = [keyof FormData, string];

export default function CareerForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', gender: '', phone: '', email: '', city: '', state: '', linkedin: '',
    position: '', location: '', hearAbout: '', experience: '', education: '', workplace: '', interest: '',
    message: '', relocate: '', availability: '', currentSalary: '', expectedSalary: '', resume: null, portfolio: null
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]: files?.length ? files[0] : value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  const basicFields: FieldConfig[] = [
    ['firstName', 'First Name'],
    ['lastName', 'Last Name'],
    ['gender', 'Gender'],
    ['phone', 'Phone No.'],
    ['email', 'Email ID'],
    ['city', 'City/Town/Village'],
    ['state', 'State'],
    ['linkedin', 'LinkedIn Profile URL'],
    ['position', 'Position Applying For'],
    ['location', 'Job Location'],
    ['hearAbout', 'How did you hear about this Job Opening?'],
    ['experience', 'Experience'],
    ['education', 'Educational Qualification'],
    ['workplace', 'Current/Previous Place of Work'],
    ['interest', 'Why are you interested in this role?']
  ];

  const additionalFields: FieldConfig[] = [
    ['relocate', 'Are you willing to relocate?'],
    ['availability', 'Availability to join the new role'],
    ['currentSalary', 'Current Salary (INR)'],
    ['expectedSalary', 'Expected Salary']
  ];

  return (
    <div className="flex justify-center py-10 px-4">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl w-full rounded-xl bg-white">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {basicFields.map(([key, label]) => (
            <div key={key}>
              <label className="block font-medium mb-1">
                {label} <span className="text-red-600">*</span>
              </label>
              <input
                name={key}
                required
                type={
                  key === 'email' ? 'email' :
                  key === 'phone' ? 'tel' :
                  key === 'linkedin' ? 'url' :
                  'text'
                }
                value={form[key] as string}
                onChange={handleChange}
                className="input"
              />
            </div>
          ))}
        </div>

        {/* Message */}
        <div>
          <label className="block font-medium mb-1">
            Your Message/Query <span className="text-red-600">*</span>
          </label>
          <textarea
            name="message"
            required
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* Resume and Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Resume/CV <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              name="resume"
              required
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Upload Portfolio (if applicable)
            </label>
            <input
              type="file"
              name="portfolio"
              accept=".pdf,.jpg,.png,.pptx"
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
                {label} <span className="text-red-600">*</span>
              </label>
              <input
                name={key}
                required
                type={key.includes('Salary') ? 'number' : 'text'}
                value={form[key] as string}
                onChange={handleChange}
                className="input"
                {...(key.includes('Salary') && { min: '0', step: '1000' })}
              />
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
        </div>

        {/* Unified Input Styles */}
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
