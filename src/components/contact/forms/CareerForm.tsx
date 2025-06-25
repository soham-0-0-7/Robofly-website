'use client';

import { useState } from 'react';
import {colorPalette} from "@/utils/variables"


export default function CareerForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', gender: '', phone: '', email: '', city: '', state: '', linkedin: '', position: '', location: '',
    hearAbout: '', experience: '', education: '', workplace: '', interest: '', message: '', relocate: '', availability: '',
    currentSalary: '', expectedSalary: '', resume: null, portfolio: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="flex justify-center py-10 px-4 bg-green7 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl w-full rounded-xl bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ['firstName', 'First Name'], ['lastName', 'Last Name'], ['gender', 'Gender'],
            ['phone', 'Phone No.'], ['email', 'Email ID'], ['city', 'City/Town/Village'], ['state', 'State'],
            ['linkedin', 'LinkedIn Profile URL'], ['position', 'Position Applying For'], ['location', 'Job Location'],
            ['hearAbout', 'How did you hear about this Job Opening?'], ['experience', 'Experience'],
            ['education', 'Educational Qualification'], ['workplace', 'Current/Previous Place of Work (whichever applicable)'],
            ['interest', 'Why are you interested in this role?']
          ].map(([key, label]) => (
            <div key={key} className="col-span-1">
              <label className="block font-medium mb-1">{label} <span className="text-red-500">*</span></label>
              <input
                type="text"
                name={key}
                value={form[key] || ''}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block font-medium mb-1">Your Message/Query <span className="text-red-500">*</span></label>
          <textarea
            name="message"
            rows={4}
            required
            value={form.message}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Resume/CV <span className="text-red-500">*</span></label>
            <input name="resume" type="file" accept=".pdf,.doc,.docx" required onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">Upload Portfolio (if applicable)</label>
            <input name="portfolio" type="file" accept=".pdf,.jpg,.png,.pptx" onChange={handleChange} className="input" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ['relocate', 'Are you willing to relocate?'],
            ['availability', 'Availability to join the new role'],
            ['currentSalary', 'Current Salary (INR)'],
            ['expectedSalary', 'Expected Salary']
          ].map(([key, label]) => (
            <div key={key}>
              <label className="block font-medium mb-1">{label} <span className="text-red-500">*</span></label>
              <input
                type="text"
                name={key}
                required
                value={form[key] || ''}
                onChange={handleChange}
                className="input"
              />
            </div>
          ))}
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
