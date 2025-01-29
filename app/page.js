import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-4xl font-bold text-white mb-12">Welcome to My Website</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/chat">
          <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-purple-100">
            <h2 className="text-2xl font-semibold mb-2 text-purple-700">Chat</h2>
            <p className="text-gray-700">Join the chat and connect with others.</p>
          </div>
        </Link>
        <Link href="/desserts">
          <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-pink-100">
            <h2 className="text-2xl font-semibold mb-2 text-pink-700">Desserts</h2>
            <p className="text-gray-700">Explore our delicious dessert options.</p>
          </div>
        </Link>
        <Link href="/countdown">
          <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-red-100">
            <h2 className="text-2xl font-semibold mb-2 text-red-700">Countdown</h2>
            <p className="text-gray-700">Check out the countdown to our event.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
