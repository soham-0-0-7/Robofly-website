import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* Simple green spinner */}
      <div className="w-12 h-12 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;