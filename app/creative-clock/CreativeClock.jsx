'use client'

import React, { useEffect, useState } from 'react';

function getTimeDigits(is24) {
  const now = new Date();
  let h = now.getHours();
  if (!is24) h = h % 12 || 12;
  const m = now.getMinutes();
  const s = now.getSeconds();
  const hStr = h.toString().padStart(2, '0');
  const mStr = m.toString().padStart(2, '0');
  const sStr = s.toString().padStart(2, '0');
  return [
    hStr[0], hStr[1], mStr[0], mStr[1], sStr[0], sStr[1]
  ];
}

function getDigitRange(index, is24) {
  if (index === 0) return is24 ? [0, 1, 2] : [0, 1];
  if (index === 2 || index === 4) return [0, 1, 2, 3, 4, 5];
  if (!is24 && index === 1) return [1,2,3,4,5,6,7,8,9,0,1,2]; // 12-hour mode, second digit can be 0-2 for 10-12, 1-9 for 01-09
  return [0,1,2,3,4,5,6,7,8,9];
}

const DIGIT_HEIGHT = 36; // px
const VISIBLE_DIGITS = 7; // 3 above, 1 center, 3 below
const HIGHLIGHT_SIZE = 45; // px

function SliderDigit({ digit, index, is24 }) {
  const range = getDigitRange(index, is24);
  const digitIdx = range.indexOf(Number(digit));
  const centerIdx = Math.floor(VISIBLE_DIGITS / 2);

  // Calculate padding above and below
  let displayDigits = [];
  for (let i = digitIdx - centerIdx; i <= digitIdx + centerIdx; i++) {
    if (i < 0 || i >= range.length) {
      displayDigits.push('');
    } else {
      displayDigits.push(range[i]);
    }
  }

  const visibleHeight = VISIBLE_DIGITS * DIGIT_HEIGHT;
  const translateY = 0;

  return (
    <div className="relative flex flex-col items-center" style={{ height: visibleHeight, width: HIGHLIGHT_SIZE }}>
      {/* Digits column with overflow hidden */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div
          className="flex flex-col items-center transition-transform duration-500 will-change-transform w-full"
          style={{
            transform: `translateY(${translateY}px)`
          }}
        >
          {displayDigits.map((n, i) => (
            <span
              key={i}
              className={`text-slate-700 text-xl font-mono font-extrabold h-[${DIGIT_HEIGHT}px] flex items-center justify-center w-full select-none transition-colors duration-300 ${i === centerIdx && n !== '' ? 'text-slate-900' : 'opacity-40'}`}
              style={{ height: `${DIGIT_HEIGHT}px`, lineHeight: `${DIGIT_HEIGHT}px` }}
            >
              {n}
            </span>
          ))}
        </div>
        {/* Static highlight */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ width: HIGHLIGHT_SIZE, height: HIGHLIGHT_SIZE }}>
          <div className="w-full h-full rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center text-2xl font-extrabold text-slate-900 font-mono backdrop-blur-md">
            {digit}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreativeClock() {
  const [is24, setIs24] = useState(true);
  const [digits, setDigits] = useState(getTimeDigits(is24));

  useEffect(() => {
    const interval = setInterval(() => {
      setDigits(getTimeDigits(is24));
    }, 1000);
    return () => clearInterval(interval);
  }, [is24]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex gap-2 items-center">
        <button
          className={`px-3 py-1 rounded-full font-mono text-sm font-bold border transition-colors duration-200 ${is24 ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'}`}
          onClick={() => setIs24(true)}
        >
          24h
        </button>
        <button
          className={`px-3 py-1 rounded-full font-mono text-sm font-bold border transition-colors duration-200 ${!is24 ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'}`}
          onClick={() => setIs24(false)}
        >
          12h
        </button>
      </div>
      <div className="flex items-end justify-center gap-4 bg-white/80 rounded-2xl p-8 shadow-2xl border border-slate-200">
        {digits.map((digit, i) => (
          <SliderDigit key={i} digit={digit} index={i} is24={is24} />
        ))}
      </div>
    </div>
  );
} 