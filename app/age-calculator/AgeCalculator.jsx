'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export default function AgeCalculator() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState({ years: '--', months: '--', days: '--' });
  const [errors, setErrors] = useState({});
  const [isCalculated, setIsCalculated] = useState(false);

  // Form validation
  const validate = () => {
    const newErrors = {};
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Validate day
    if (!day) {
      newErrors.day = 'This field is required';
    } else if (isNaN(day) || day < 1 || day > 31) {
      newErrors.day = 'Must be a valid day';
    }

    // Validate month
    if (!month) {
      newErrors.month = 'This field is required';
    } else if (isNaN(month) || month < 1 || month > 12) {
      newErrors.month = 'Must be a valid month';
    }

    // Validate year
    if (!year) {
      newErrors.year = 'This field is required';
    } else if (isNaN(year) || year > currentYear) {
      newErrors.year = 'Must be in the past';
    }

    // Check if the date is valid (e.g., no Feb 30th)
    if (day && month && year && !newErrors.day && !newErrors.month && !newErrors.year) {
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() != year ||
        date.getMonth() != month - 1 ||
        date.getDate() != day
      ) {
        newErrors.day = 'Must be a valid date';
      } else if (date > currentDate) {
        newErrors.year = 'Must be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAge = () => {
    if (!validate()) return;

    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    
    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();
    
    // Adjust for negative days
    if (ageDays < 0) {
      ageMonths--;
      // Get the last day of the previous month
      const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      ageDays = lastMonth.getDate() + ageDays;
    }
    
    // Adjust for negative months
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }
    
    setAge({
      years: ageYears,
      months: ageMonths,
      days: ageDays
    });
    setIsCalculated(true);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-8xl shadow-lg max-w-3xl w-full">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-10">
        <div className="flex flex-col">
          <label className={`text-sm font-bold uppercase tracking-widest mb-1 ${errors.day ? 'text-red-500' : 'text-gray-500'}`}>
            Day
          </label>
          <input
            type="text"
            placeholder="DD"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className={`border ${errors.day ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-4 text-xl font-bold focus:outline-none focus:border-purple-500`}
          />
          {errors.day && <p className="text-red-500 text-xs italic mt-1">{errors.day}</p>}
        </div>
        
        <div className="flex flex-col">
          <label className={`text-sm font-bold uppercase tracking-widest mb-1 ${errors.month ? 'text-red-500' : 'text-gray-500'}`}>
            Month
          </label>
          <input
            type="text"
            placeholder="MM"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className={`border ${errors.month ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-4 text-xl font-bold focus:outline-none focus:border-purple-500`}
          />
          {errors.month && <p className="text-red-500 text-xs italic mt-1">{errors.month}</p>}
        </div>
        
        <div className="flex flex-col">
          <label className={`text-sm font-bold uppercase tracking-widest mb-1 ${errors.year ? 'text-red-500' : 'text-gray-500'}`}>
            Year
          </label>
          <input
            type="text"
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={`border ${errors.year ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-4 text-xl font-bold focus:outline-none focus:border-purple-500`}
          />
          {errors.year && <p className="text-red-500 text-xs italic mt-1">{errors.year}</p>}
        </div>
      </div>
      
      <div className="relative flex items-center justify-center sm:justify-end mb-10">
        <div className="absolute left-0 right-0 border-t border-gray-300"></div>
        <button
          onClick={calculateAge}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 z-10 transition duration-300 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" strokeWidth="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g></svg>
        </button>
      </div>
      
      <div className="font-extrabold italic text-5xl md:text-6xl leading-tight">
        <div className="flex items-baseline">
          <span className="text-purple-600 mr-2">{isCalculated ? age.years : '--'}</span>
          <span className="text-black">years</span>
        </div>
        <div className="flex items-baseline">
          <span className="text-purple-600 mr-2">{isCalculated ? age.months : '--'}</span>
          <span className="text-black">months</span>
        </div>
        <div className="flex items-baseline">
          <span className="text-purple-600 mr-2">{isCalculated ? age.days : '--'}</span>
          <span className="text-black">days</span>
        </div>
      </div>
    </div>
  );
} 