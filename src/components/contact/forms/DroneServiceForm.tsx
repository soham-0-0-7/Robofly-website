'use client';

import { useState, useEffect } from 'react';
import { colorPalette } from "@/utils/variables";

interface DroneServiceFormProps {
  id?: string; // id as string
}

const indianStatesAndUTs = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];

const SERVICE_OPTIONS = [
  {
    id: 1,
    title: "Agricultural Surveillance Drone Solutions",
  },
  {
    id: 2,
    title: "Drone Mapping Services (DSM, DTM, Ortho)",
  },
  {
    id: 3,
    title: "Dam Surveillance and Structural Analysis",
  },
  {
    id: 4,
    title: "Industrial & Infrastructure Inspection Services",
  },
  {
    id: 5,
    title: "Forest Fire Prediction & Eradication System",
  },
  {
    id: 6,
    title: "Post-Wildfire Biodiversity & Impact Assessment",
  },
];

export default function DroneServiceForm({ id }: DroneServiceFormProps) {
  const [form, setForm] = useState({
    serviceType: 'Unsure',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    state: '',
    course: '',
    reason: '',
  });

  useEffect(() => {
    const matched = SERVICE_OPTIONS.find(option => option.id.toString() === id);
    if (matched) {
      setForm(prev => ({ ...prev, serviceType: matched.title }));
    } else {
      setForm(prev => ({ ...prev, serviceType: 'Unsure' }));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="flex justify-center py-10 px-4 bg-green7 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl w-full rounded-xl bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Service Type Select */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">
              Type of Service <span className="text-red-600">*</span>
            </label>
            <select
              name="serviceType"
              required
              value={form.serviceType}
              onChange={handleChange}
              className="input"
            >
              <option value="Unsure">Unsure</option>
              {SERVICE_OPTIONS.map(option => (
                <option key={option.id} value={option.title}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              First Name <span className="text-red-600">*</span>
            </label>
            <input name="firstName" required value={form.firstName} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input name="lastName" required value={form.lastName} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Email ID <span className="text-red-600">*</span>
            </label>
            <input name="email" required value={form.email} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Phone No. <span className="text-red-600">*</span>
            </label>
            <input name="phone" required value={form.phone} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input name="company" value={form.company} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium mb-1">
              City/Town/Village <span className="text-red-600">*</span>
            </label>
            <input name="city" required value={form.city} onChange={handleChange} className="input" />
          </div>
<div>
            <label className="block font-medium mb-1">
              State / UT <span className="text-red-600">*</span>
            </label>
            <select
              name="state"
              required
              value={form.state}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select State / UT</option>
              {indianStatesAndUTs.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">
              What course are you interested in? <span className="text-red-600">*</span>
            </label>
            <select name="course" required value={form.course} onChange={handleChange} className="input">
              <option value="">Course of Interest</option>
              <option value="Drone Pilot Training">Drone Pilot Training</option>
              <option value="Drone Repair">Drone Repair</option>
              <option value="Drone Photography">Drone Photography</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Why do you want to join this training program?</label>
          <textarea
            name="reason"
            rows={4}
            value={form.reason}
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
            background: ${colorPalette.whiteMint};
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
