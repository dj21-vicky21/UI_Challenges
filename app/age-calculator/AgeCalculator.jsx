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
  const [isCalculating, setIsCalculating] = useState(false);

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

    setIsCalculating(true);

    setTimeout(() => {
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
      setIsCalculating(false);
    }, 800); // Add a slight delay for animation effect
  };

  return (
    <div className="glass-effect p-8 md:p-12 rounded-[24px] rounded-br-[100px] shadow-[0_20px_60px_-10px_rgba(103,60,205,0.2)] max-w-3xl w-full">
      {/* Header */}
      <h2 className="sr-only">Age Calculator Form</h2>
      
      {/* Input fields */}
      <div className="grid grid-cols-3 gap-5 md:gap-8 mb-16">
        <div className="flex flex-col">
          <label className={`text-sm font-extrabold uppercase tracking-[0.2em] mb-2 ${errors.day ? 'text-red-500' : 'text-slate-500'}`}>
            Day
          </label>
          <input
            type="text"
            placeholder="DD"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className={`border-2 ${errors.day ? 'border-red-500 focus:border-red-500' : 'border-slate-200 hover:border-purple-300 focus:border-purple-500'} rounded-xl py-3 px-4 text-2xl font-extrabold focus:outline-none transition-all duration-200 shadow-sm placeholder:text-slate-300 text-slate-800`}
            maxLength="2"
          />
          {errors.day && <p className="text-red-500 text-xs font-bold mt-2 italic">{errors.day}</p>}
        </div>
        
        <div className="flex flex-col">
          <label className={`text-sm font-extrabold uppercase tracking-[0.2em] mb-2 ${errors.month ? 'text-red-500' : 'text-slate-500'}`}>
            Month
          </label>
          <input
            type="text"
            placeholder="MM"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className={`border-2 ${errors.month ? 'border-red-500 focus:border-red-500' : 'border-slate-200 hover:border-purple-300 focus:border-purple-500'} rounded-xl py-3 px-4 text-2xl font-extrabold focus:outline-none transition-all duration-200 shadow-sm placeholder:text-slate-300 text-slate-800`}
            maxLength="2"
          />
          {errors.month && <p className="text-red-500 text-xs font-bold mt-2 italic">{errors.month}</p>}
        </div>
        
        <div className="flex flex-col">
          <label className={`text-sm font-extrabold uppercase tracking-[0.2em] mb-2 ${errors.year ? 'text-red-500' : 'text-slate-500'}`}>
            Year
          </label>
          <input
            type="text"
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={`border-2 ${errors.year ? 'border-red-500 focus:border-red-500' : 'border-slate-200 hover:border-purple-300 focus:border-purple-500'} rounded-xl py-3 px-4 text-2xl font-extrabold focus:outline-none transition-all duration-200 shadow-sm placeholder:text-slate-300 text-slate-800`}
            maxLength="4"
          />
          {errors.year && <p className="text-red-500 text-xs font-bold mt-2 italic">{errors.year}</p>}
        </div>
      </div>
      
      {/* Divider with button */}
      <div className="relative flex items-center justify-center sm:justify-end mb-12">
        <div className="absolute left-0 right-0 border-t-2 border-slate-100"></div>
        <button
          onClick={calculateAge}
          disabled={isCalculating}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-5 z-10 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300/50 transform hover:scale-105 hover:shadow-[0_10px_25px_-5px_rgba(124,58,237,0.5)] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed animate-pulse-shadow"
          aria-label="Calculate age"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44" className={isCalculating ? 'animate-pulse' : ''}>
            <g fill="none" stroke="#FFF" strokeWidth="2">
              <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
            </g>
          </svg>
        </button>
      </div>
      
      {/* Results display */}
      <div className="font-extrabold italic text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
        {isCalculated ? (
          <>
            <div className="flex items-baseline transition-all animate-fade-in">
              <span className="text-purple-600 mr-3 animate-slide-in">{age.years}</span>
              <span className="text-slate-800">years</span>
            </div>
            <div className="flex items-baseline transition-all animate-fade-in" style={{animationDelay: '0.2s'}}>
              <span className="text-purple-600 mr-3 animate-slide-in" style={{animationDelay: '0.2s'}}>{age.months}</span>
              <span className="text-slate-800">months</span>
            </div>
            <div className="flex items-baseline transition-all animate-fade-in" style={{animationDelay: '0.4s'}}>
              <span className="text-purple-600 mr-3 animate-slide-in" style={{animationDelay: '0.4s'}}>{age.days}</span>
              <span className="text-slate-800">days</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-baseline">
              <span className="text-purple-600 mr-3 opacity-50">--</span>
              <span className="text-slate-800">years</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-purple-600 mr-3 opacity-50">--</span>
              <span className="text-slate-800">months</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-purple-600 mr-3 opacity-50">--</span>
              <span className="text-slate-800">days</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 