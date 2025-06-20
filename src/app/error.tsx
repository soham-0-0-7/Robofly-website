"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { colorPalette, imgSrc } from '@/utils/variables';

interface PageErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PageError({ error, reset }: PageErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6"
      style={{ 
        background: `linear-gradient(135deg, ${colorPalette.green1} 0%, ${colorPalette.greenDeep} 50%, ${colorPalette.greenShadow} 100%)` 
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/5 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-white/15 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-white/8 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Logo Section */}
        <div className="mb-8 flex justify-center">
          <div className="relative group">
            <div 
              className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
              style={{ backgroundColor: colorPalette.green3 }}
            ></div>
            <div 
              className="relative p-6 rounded-full border-2 backdrop-blur-sm"
              style={{ 
                backgroundColor: `${colorPalette.white}10`,
                borderColor: colorPalette.green3 
              }}
            >
              <Image 
                src={imgSrc} 
                alt="Robofly Logo" 
                width={80} 
                height={80} 
                className="transition-transform duration-300 group-hover:rotate-12"
              />
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 
              className="text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(45deg, ${colorPalette.white}, ${colorPalette.green4})` 
              }}
            >
              Oops!
            </h1>
            <h2 className="text-2xl font-semibold text-white">
              Something went wrong
            </h2>
          </div>

          <div 
            className="p-6 rounded-xl border backdrop-blur-sm"
            style={{ 
              backgroundColor: `${colorPalette.white}05`,
              borderColor: `${colorPalette.green3}30` 
            }}
          >
            <p className="text-white/80 text-lg mb-4">
              We encountered an unexpected error while processing your request. 
              Our drone fleet is working to fix this issue!
            </p>
            
            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left">
                <summary 
                  className="cursor-pointer text-sm font-medium mb-2 hover:opacity-80 transition-opacity"
                  style={{ color: colorPalette.green4 }}
                >
                  Technical Details
                </summary>
                <div 
                  className="p-4 rounded-lg text-xs font-mono overflow-auto max-h-32"
                  style={{ 
                    backgroundColor: `${colorPalette.blackDeep}80`,
                    color: colorPalette.greenPastel 
                  }}
                >
                  <p className="break-all">{error.message}</p>
                  {error.digest && (
                    <p className="mt-2 opacity-60">Digest: {error.digest}</p>
                  )}
                </div>
              </details>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={reset}
              className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl"
              style={{ 
                backgroundColor: colorPalette.green3,
                boxShadow: `0 4px 20px ${colorPalette.green3}40`
              }}
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105"
              style={{ 
                backgroundColor: 'transparent',
                color: colorPalette.green4,
                border: `2px solid ${colorPalette.green4}`
              }}
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </button>
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-center gap-2 text-sm text-white/60 mt-8">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: colorPalette.green3 }}
            ></div>
            <span>If the problem persists, please contact our support team</span>
          </div>
        </div>
      </div>
    </div>
  );
}