'use client'

import React, { useState } from 'react';
import AgeCalculator from './AgeCalculator';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 via-white to-white"></div>
      
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700">
            Age Calculator
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 max-w-md mx-auto text-lg">
            Discover your precise age in years, months, and days
          </p>
        </div>
        
        {/* Main Content */}
        <div className="w-full grid place-items-center">
          <AgeCalculator />
        </div>
        
      </div>
      
      {/* Decorative elements */}
      <div className="fixed -bottom-48 -left-48 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="fixed -top-48 -right-48 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
    </div>
  );
} 