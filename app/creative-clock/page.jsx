'use client'

import CreativeClock from './CreativeClock';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-700">Creative Clock</h1>
      <CreativeClock />
    </div>
  );
} 