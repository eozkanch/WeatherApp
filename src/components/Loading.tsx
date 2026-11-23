export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 backdrop-blur-md bg-black/40">
      <div className="relative">
        {/* Animated background glow */}
        <div className="absolute inset-0 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-60"></div>
        </div>
        
        {/* Main loading card */}
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex flex-col items-center space-y-6">
            {/* Animated spinner */}
            <div className="relative w-20 h-20">
              {/* Outer ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full animate-spin"></div>
              {/* Middle ring */}
              <div className="absolute inset-2 border-4 border-transparent border-t-purple-400 border-r-pink-400 rounded-full animate-spin-reverse"></div>
              {/* Inner ring */}
              <div className="absolute inset-4 border-4 border-transparent border-t-pink-400 border-r-blue-400 rounded-full animate-spin"></div>
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Loading text */}
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Loading
              </h3>
              <p className="text-white/70 text-sm font-medium">
                Getting weather data...
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
