'use client';

import { useState, useEffect } from 'react';
import { colorPalette } from "@/utils/variables";

import GenForm from '@/components/contact/forms/serviceForms/GenForm';
import FirstServiceForm from '@/components/contact/forms/serviceForms/FirstServiceForm';
import SecondServiceForm from '@/components/contact/forms/serviceForms/SecondServiceForm';
import ThirdServiceForm from '@/components/contact/forms/serviceForms/ThirdServiceForm';
import FourthServiceForm from '@/components/contact/forms/serviceForms/FourthServiceForm';
import FifthServiceForm from '@/components/contact/forms/serviceForms/FifthServiceForm';
import SixthServiceForm from '@/components/contact/forms/serviceForms/SixthServiceForm';

interface DroneServiceFormProps {
  id?: string;
}

const SERVICE_OPTIONS = [
  { id: 1, title: "Agricultural Surveillance Drone Solutions" },
  { id: 2, title: "Drone Mapping Services (DSM, DTM, Ortho)" },
  { id: 3, title: "Dam Surveillance and Structural Analysis" },
  { id: 4, title: "Industrial & Infrastructure Inspection Services" },
  { id: 5, title: "Forest Fire Prediction & Eradication System" },
  { id: 6, title: "Post-Wildfire Biodiversity & Impact Assessment" },
];

export default function DroneServiceForm({ id }: DroneServiceFormProps) {
  const [form, setForm] = useState({ serviceType: 'General' });
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  useEffect(() => {
    const matched = SERVICE_OPTIONS.find(option => option.id.toString() === id);
    if (matched) {
      setForm({ serviceType: matched.title });
      setSelectedServiceId(matched.id);
    } else {
      setForm({ serviceType: 'General' });
      setSelectedServiceId(null);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setForm({ serviceType: value });

    if (value === 'General') {
      setSelectedServiceId(null);
    } else {
      const matched = SERVICE_OPTIONS.find(opt => opt.title === value);
      setSelectedServiceId(matched?.id ?? null);
    }
  };

  const renderServiceForm = () => {
    if (form.serviceType === 'General') return <GenForm />;
    switch (selectedServiceId) {
      case 1: return <FirstServiceForm />;
      case 2: return <SecondServiceForm />;
      case 3: return <ThirdServiceForm />;
      case 4: return <FourthServiceForm />;
      case 5: return <FifthServiceForm />;
      case 6: return <SixthServiceForm />;
      default: return null;
    }
  };

  return (
    <div className="flex justify-center py-10 px-4 bg-green7 min-h-screen">
      <div className="space-y-6 max-w-3xl w-full rounded-xl bg-white p-0">
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
            <option value="General">General</option>
            {SERVICE_OPTIONS.map(option => (
              <option key={option.id} value={option.title}>
                {option.title}
              </option>
            ))}
          </select>
        </div>

        {renderServiceForm()}

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
      </div>
    </div>
  );
}
