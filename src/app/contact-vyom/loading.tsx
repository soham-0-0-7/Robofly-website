import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Hexagonal tech pattern */}
        <div className="relative mb-12">
          {/* Central hexagon */}
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 border-4 border-gray-300 transform rotate-45 rounded-lg animate-spin"></div>
            <div className="absolute inset-2 border-2 border-emerald-500 transform -rotate-45 rounded-lg animate-spin" style={{animationDuration: '3s', animationDirection: 'reverse'}}></div>
            <div className="absolute inset-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full animate-pulse flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
          
          {/* Orbiting elements */}
          <div className="absolute inset-0 animate-spin" style={{animationDuration: '4s'}}>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full"></div>
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-3 h-3 bg-gray-600 rounded-full"></div>
            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-3 h-3 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        {/* Brand text with letter animation */}
        <div className="mb-8">
          <div className="text-4xl font-bold tracking-wider flex justify-center items-center space-x-1">
            {['R', 'O', 'B', 'O'].map((letter, index) => (
              <span 
                key={index}
                className="text-emerald-600 animate-pulse inline-block"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                {letter}
              </span>
            ))}
            {['F', 'L', 'Y'].map((letter, index) => (
              <span 
                key={index}
                className="text-black animate-pulse inline-block ml-2"
                style={{animationDelay: `${(index + 4) * 0.2}s`}}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Circuit-like progress indicator */}
        <div className="w-80 mx-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse"></div>
            </div>
            <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-8 flex justify-center items-center space-x-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <span className="text-gray-600 text-sm font-medium">Loading</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;