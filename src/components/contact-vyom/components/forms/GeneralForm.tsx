'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

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

export default function GeneralForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    city: '', state: '', message: '',
  });
  const [droneTypes, setDroneTypes] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDroneTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected && !droneTypes.includes(selected)) {
      setDroneTypes([...droneTypes, selected]);
    }
    e.target.value = '';
  };

  const removeDroneType = (type: string) => {
    setDroneTypes(droneTypes.filter(t => t !== type));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...form, droneTypes });
  };

  return (
    <div className="flex justify-center py-10 px-4 bg-green7 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl w-full p-8 rounded-xl bg-white shadow-xl">
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
        </div>

        <div>
          <label className="block font-medium mb-1">Type of Drone</label>
          <div className="input flex flex-wrap items-center gap-2 min-h-[48px]">
            {droneTypes.map((type, index) => (
              <div key={index} className="flex items-center bg-green6 text-black px-3 py-1 rounded-full shadow">
                <span className="mr-2 text-sm">{type}</span>
                <button type="button" onClick={() => removeDroneType(type)} className="hover:text-red-600">
                  <X size={16} />
                </button>
              </div>
            ))}
            <select onChange={handleDroneTypeSelect} className="flex-1 bg-transparent outline-none">
              <option value="">{droneTypes.length > 0 ? '' : 'Select Type of Drone'}</option>
              <option value="General">General</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Surveillance">Surveillance</option>
              <option value="Custom Drone">Custom Drone</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Your Message/Query <span className="text-red-600">*</span></label>
          <textarea
            name="message"
            rows={4}
            required
            value={form.message}
            onChange={handleChange}
            className="input"
          />
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
          .input:focus-within {
            outline: none;
            box-shadow: 0 0 0 2px ${colorPalette.green3};
          }
        `}</style>
      </form>
    </div>
  );
}