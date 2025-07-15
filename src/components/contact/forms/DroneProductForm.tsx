'use client';

import { useState, useEffect } from 'react';
import { colorPalette } from "@/utils/variables";

import GenForm from '@/components/contact/forms/productForms/GenForm';
import FirstProdForm from '@/components/contact/forms/productForms/FirstProdForm';
import SecondProdForm from '@/components/contact/forms/productForms/SecondProdForm';
import ThirdProdForm from '@/components/contact/forms/productForms/ThirdProdForm';
import FourthProdForm from '@/components/contact/forms/productForms/FourthProdForm';
import FifthProdForm from '@/components/contact/forms/productForms/FifthProdForm';
import SixthProdForm from '@/components/contact/forms/productForms/SixthProdForm';

interface DroneProductFormProps {
  id?: string;
}

const DRONE_TYPE_OPTIONS = [
  { id: 1, title: "Agricultural Drone", value: "Agricultural" },
  { id: 2, title: "Surveillance Drone", value: "Surveillance" },
  { id: 3, title: "Logistics Package Dropping Drone", value: "Logistics" },
  { id: 4, title: "FPV Drone", value: "FPV" },
  { id: 5, title: "Training Drone", value: "Training" },
  { id: 6, title: "Custom Drone", value: "Custom" },
];

export default function DroneProductForm({ id }: DroneProductFormProps) {
  const [form, setForm] = useState({ droneType: 'General' });
  const [selectedDroneId, setSelectedDroneId] = useState<number | null>(null);

  useEffect(() => {
    const matched = DRONE_TYPE_OPTIONS.find(option => option.id.toString() === id);
    if (matched) {
      setForm({ droneType: matched.value });
      setSelectedDroneId(matched.id);
    } else {
      setForm({ droneType: 'General' });
      setSelectedDroneId(null);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setForm({ droneType: value });

    if (value === 'General') {
      setSelectedDroneId(null);
    } else {
      const matched = DRONE_TYPE_OPTIONS.find(opt => opt.value === value);
      setSelectedDroneId(matched?.id ?? null);
    }
  };

  const renderProductForm = () => {
    if (form.droneType === 'General') return <GenForm />;
    switch (selectedDroneId) {
      case 1: return <FirstProdForm />;
      case 2: return <SecondProdForm />;
      case 3: return <ThirdProdForm />;
      case 4: return <FourthProdForm />;
      case 5: return <FifthProdForm />;
      case 6: return <SixthProdForm />;
      default: return null;
    }
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="space-y-6 max-w-3xl w-full rounded-xl bg-white p-0">
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">
            Type of Drone <span className="text-red-600">*</span>
          </label>
          <select
            name="droneType"
            required
            value={form.droneType}
            onChange={handleChange}
            className="input"
          >
            <option value="General">General</option>
            {DRONE_TYPE_OPTIONS.map(option => (
              <option key={option.id} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>
        </div>

        {renderProductForm()}

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
      </div>
    </div>
  );
}
