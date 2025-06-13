import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated RoboFly inspired loader */}
        <div className="relative mb-8">
          {/* Main drone body */}
          <div className="w-16 h-8 bg-emerald-600 rounded-lg mx-auto relative animate-pulse">
            {/* Propeller arms */}
            <div className="absolute -top-2 -left-6 w-4 h-4 bg-emerald-500 rounded-full animate-spin origin-center"></div>
            <div className="absolute -top-2 -right-6 w-4 h-4 bg-emerald-500 rounded-full animate-spin origin-center" style={{animationDirection: 'reverse'}}></div>
            <div className="absolute -bottom-2 -left-6 w-4 h-4 bg-emerald-500 rounded-full animate-spin origin-center" style={{animationDirection: 'reverse'}}></div>
            <div className="absolute -bottom-2 -right-6 w-4 h-4 bg-emerald-500 rounded-full animate-spin origin-center"></div>
            
            {/* Center indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-ping"></div>
          </div>
          
          {/* Floating animation container */}
          <div className="animate-bounce">
            {/* Propeller blur effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <div className="w-20 h-1 bg-emerald-300 opacity-30 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading text with brand styling */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold tracking-wide">
            <span className="text-emerald-600">ROBO</span><span className="text-black">FLY</span>
          </h2>
          
          {/* Loading dots animation */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 mx-auto bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full animate-pulse relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-ping"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;