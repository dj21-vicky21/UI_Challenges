'use client'

import React, { useState } from 'react';
import AgeCalculator from './AgeCalculator';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Age Calculator</h1>
      <AgeCalculator />
    </div>
  );
} 