'use client';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center text-white">
        {/* Offline Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Offline Mode</h1>
          <p className="text-white/70">You&apos;re currently offline</p>
        </div>

        {/* Offline Message */}
        <div className="mb-6">
          <p className="text-sm text-white/80 leading-relaxed">
            Don&apos;t worry! You can still view cached weather data. 
            Some features may be limited until you&apos;re back online.
          </p>
        </div>

        {/* Features Available Offline */}
        <div className="mb-6 text-left">
          <h3 className="text-sm font-semibold mb-3 text-white/90">Available Offline:</h3>
          <ul className="text-xs text-white/70 space-y-2">
            <li className="flex items-center">
              <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
              Cached weather data
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
              Background images
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
              App interface
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2"></span>
              Limited functionality
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-xl transition-colors duration-200 font-medium"
          >
            Try Again
          </button>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full bg-transparent border border-white/30 hover:border-white/50 text-white py-3 px-4 rounded-xl transition-colors duration-200 font-medium"
          >
            Go Back
          </button>
        </div>

        {/* Connection Status */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex items-center justify-center space-x-2 text-xs text-white/60">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span>No internet connection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
