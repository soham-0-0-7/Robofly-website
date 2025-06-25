'use client';

import { useState } from 'react';

const colorPalette = {
  green1: '#002d1a',
  green2: '#104a2f',
  green3: '#399d6c',
  green4: '#bde6cf',
  green5: '#1ba100',
  green6: '#8fe4ce',
  green7: '#e4f1ec',
  black: '#000000',
  white: '#ffffff',
};

export default function DroneProductForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', city: '', state: '', product: '', amc: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl w-full p-8 rounded-xl bg-white shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">First Name <span className="text-red-600">*</span></label>
            <input name="firstName" required value={form.firstName} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">Last Name <span className="text-red-600">*</span></label>
            <input name="lastName" required value={form.lastName} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">Email ID <span className="text-red-600">*</span></label>
            <input name="email" required value={form.email} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone No. <span className="text-red-600">*</span></label>
            <input name="phone" required value={form.phone} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input name="company" value={form.company} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">City/Town/Village <span className="text-red-600">*</span></label>
            <input name="city" required value={form.city} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">State <span className="text-red-600">*</span></label>
            <select name="state" required value={form.state} onChange={handleChange} className="input">
              <option value="">Select State</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Delhi">Delhi</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Drone Product of Interest <span className="text-red-600">*</span></label>
            <input name="product" required value={form.product} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">Drone Product Part or AMC of Interest <span className="text-red-600">*</span></label>
            <input name="amc" required value={form.amc} onChange={handleChange} className="input" />
          </div>
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
            background: white;
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