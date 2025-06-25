'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, GraduationCap, Drone, Users } from 'lucide-react';

import GeneralForm from '@/components/contact-vyom/components/forms/GeneralForm';
import TrainingForm from './forms/TrainingForm';
import DroneProductForm from './forms/DroneProductForm';
import CareerForm from './forms/CareerForm';

const tabs = [
  { id: 'general', label: 'General Query', icon: MessageSquareText },
  { id: 'training', label: 'Training', icon: GraduationCap },
  { id: 'drone', label: 'Drone Product', icon: Drone },
  { id: 'career', label: 'Join our Team (Career)', icon: Users },
];

export default function TabSelector() {
  const [activeTab, setActiveTab] = useState('general');

  const renderForm = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralForm />;
      case 'training':
        return <TrainingForm />;
      case 'drone':
        return <DroneProductForm />;
      case 'career':
        return <CareerForm />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Tab Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 border-b pb-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center justify-center text-center text-sm font-medium py-2 transition duration-300 ${
              activeTab === id
                ? 'text-green-600'
                : 'text-gray-500 hover:text-green-500'
            }`}
          >
            {Icon && (
              <Icon
                className={`w-6 h-6 mb-1 ${
                  activeTab === id ? 'stroke-green-600' : 'stroke-gray-400'
                }`}
              />
            )}
            <span>{label}</span>
            {activeTab === id && (
              <div className="w-full h-[2px] mt-1 bg-green-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Form Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="mt-10 bg-green-50 p-6 rounded-lg shadow"
        >
          {renderForm()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
