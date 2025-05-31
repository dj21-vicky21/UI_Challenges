import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="pt-20 pb-10 px-6 md:px-10 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          <span className="block">Frontend</span>
          <span className="block text-emerald-400">Challenge Hub</span>
        </h1>
        <p className="mt-4 text-slate-400 max-w-2xl text-lg">
          Explore interactive UI components and functional implementations built with React and Tailwind CSS.
        </p>
      </header>

      {/* Main content */}
      <main className="px-6 md:px-10 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Chat Challenge */}
          <Link href="/chat" className="group">
            <div className="h-full bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <span className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <h2 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">Chat</h2>
                </div>
                <p className="text-slate-400 mb-4">Join the chat and connect with others in real-time.</p>
                <div className="mt-auto flex justify-end">
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                    Explore 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desserts Challenge */}
          <Link href="/desserts" className="group">
            <div className="h-full bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <span className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </span>
                  <h2 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">Desserts</h2>
                </div>
                <p className="text-slate-400 mb-4">Browse through a delicious collection of dessert options.</p>
                <div className="mt-auto flex justify-end">
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                    Explore 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Countdown Challenge */}
          <Link href="/countdown" className="group">
            <div className="h-full bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <span className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <h2 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">Countdown</h2>
                </div>
                <p className="text-slate-400 mb-4">Watch as the countdown timer ticks away to your event.</p>
                <div className="mt-auto flex justify-end">
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                    Explore 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Infinite Comment Chat */}
          <Link href="/infinite-comment-chat" className="group">
            <div className="h-full bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <span className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                  </span>
                  <h2 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">Infinite Comment Chat</h2>
                </div>
                <p className="text-slate-400 mb-4">Experience a threaded comment system with infinite nesting.</p>
                <div className="mt-auto flex justify-end">
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                    Explore 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Age Calculator */}
          <Link href="/age-calculator" className="group">
            <div className="h-full bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <span className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <h2 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">Age Calculator</h2>
                </div>
                <p className="text-slate-400 mb-4">Calculate your exact age in years, months, and days with precision.</p>
                <div className="mt-auto flex justify-end">
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                    Explore 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 mt-auto">
        <div className="px-6 md:px-10 max-w-7xl mx-auto">
          <p className="text-slate-500 text-center">Frontend Mentor Challenges • {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
