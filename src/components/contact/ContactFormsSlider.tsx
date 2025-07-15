'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import GeneralForm from './forms/GeneralForm';
import DroneServiceForm from './forms/DroneServiceForm';
import DroneProductForm from './forms/DroneProductForm';
import CareerForm from './forms/CareerForm';

import { MessageSquareText, Wrench, Users } from 'lucide-react';

type ContactFormsSliderProps = {
  type?: string;
  id?: string;
};

// Custom DroneIcon component from inline SVG
const DroneIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-drone-icon ${className}`}
  >
    <path d="M10 10 7 7" />
    <path d="m10 14-3 3" />
    <path d="m14 10 3-3" />
    <path d="m14 14 3 3" />
    <path d="M14.205 4.139a4 4 0 1 1 5.439 5.863" />
    <path d="M19.637 14a4 4 0 1 1-5.432 5.868" />
    <path d="M4.367 10a4 4 0 1 1 5.438-5.862" />
    <path d="M9.795 19.862a4 4 0 1 1-5.429-5.873" />
    <rect x="10" y="8" width="4" height="8" rx="1" />
  </svg>
);

// Tabs configuration
const tabs = [
  { id: 'general', label: 'General Query', icon: MessageSquareText },
  { id: 'service', label: 'Drone Service', icon: Wrench },
  { id: 'drone', label: 'Drone Product', icon: DroneIcon },
  { id: 'career', label: 'Join our Team (Career)', icon: Users },
];

export default function ContactFormsSlider({ type, id }: ContactFormsSliderProps) {
  const defaultTab = tabs.find(tab => tab.id === type) ? type! : 'general';
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [clickedTab, setClickedTab] = useState<string>('');

  // Sync prop `type` changes to internal state (optional: you can remove this if type is static)
  useEffect(() => {
    const validTab = tabs.find(tab => tab.id === type);
    if (validTab) setActiveTab(type!);
    else setActiveTab('general');
  }, [type]);

  const renderForm = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralForm />;
      case 'service':
        return <DroneServiceForm id={id} />;
      case 'drone':
        return <DroneProductForm id={id} />;
      case 'career':
        return <CareerForm />;
      default:
        return <GeneralForm />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-0 py-0">
      {/* Tab Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 border-b pb-2 mb-4">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          const isClicked = clickedTab === id;

          return (
            <button
              key={id}
              onClick={() => {
                setClickedTab(id);
                setActiveTab(id);
              }}
              className={`flex flex-col items-center justify-center text-center text-sm font-medium py-2 transition duration-300 ${
                isActive ? 'text-green-600' : 'text-gray-500 hover:text-green-500'
              }`}
            >
              <motion.div
                key={isClicked ? `${id}-clicked` : `${id}-static`}
                animate={
                  isClicked
                    ? { rotate: [0, 15, -15, 10, -10, 5, 0] }
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                <Icon
                  className={`w-6 h-6 mb-1 ${
                    isActive ? 'stroke-green-600' : 'stroke-gray-400'
                  }`}
                />
              </motion.div>
              <span>{label}</span>
              {isActive && (
                <div className="w-full h-[2px] mt-1 bg-green-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Form Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="mt-0 p-0 rounded-lg"
        >
          {renderForm()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
