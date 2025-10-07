'use client';

export default function About() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        html, body {
          overflow: auto !important;
          height: auto !important;
        }
        
        @keyframes spotlight-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          25% {
            transform: translate(100px, 50px) scale(1.1);
            opacity: 1;
          }
          50% {
            transform: translate(-50px, 100px) scale(0.9);
            opacity: 0.7;
          }
          75% {
            transform: translate(80px, -30px) scale(1.05);
            opacity: 0.9;
          }
        }
        
        @keyframes spotlight-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
          }
          33% {
            transform: translate(-120px, -80px) scale(1.2);
            opacity: 1;
          }
          66% {
            transform: translate(60px, 40px) scale(0.85);
            opacity: 0.8;
          }
        }
        
        @keyframes spotlight-3 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.75;
          }
          20% {
            transform: translate(-80px, 60px) scale(1.15) rotate(45deg);
            opacity: 0.9;
          }
          40% {
            transform: translate(90px, -70px) scale(0.9) rotate(90deg);
            opacity: 1;
          }
          60% {
            transform: translate(-60px, -50px) scale(1.1) rotate(180deg);
            opacity: 0.85;
          }
          80% {
            transform: translate(70px, 80px) scale(0.95) rotate(270deg);
            opacity: 0.95;
          }
        }
        
        .animate-spotlight-1 {
          animation: spotlight-1 15s ease-in-out infinite;
        }
        
        .animate-spotlight-2 {
          animation: spotlight-2 20s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-spotlight-3 {
          animation: spotlight-3 18s ease-in-out infinite;
          animation-delay: 4s;
        }
      `}} />
      
      <div className="min-h-screen bg-black text-gray-100 py-12 px-6 relative overflow-hidden">
        {/* Gradient Background Effects - Animated Spotlights */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-spotlight-1"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-spotlight-2"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-spotlight-3"></div>
        </div>

        <div className="max-w-4xl mx-auto pb-12 relative z-10">
          {/* Back Button */}
          <a 
            href="/"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-all duration-300 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Weather App</span>
          </a>

          {/* Title with Gradient */}
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            About This Project
          </h1>

          {/* Description */}
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Weather Forecast Application
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                A modern, real-time weather application built with Next.js 15, React 19, and TypeScript. 
                Get accurate weather forecasts with beautiful, dynamic backgrounds that change based on 
                current weather conditions and time of day.
              </p>
            </section>

            <section className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Features
              </h2>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span className="text-gray-300">Real-time weather data from WeatherAPI.com</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span className="text-gray-300">3-day weather forecast</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span className="text-gray-300">Hourly temperature predictions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span className="text-gray-300">Dynamic backgrounds based on weather conditions (day/night)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span className="text-gray-300">Search any city worldwide</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span className="text-gray-300">Responsive and mobile-friendly design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span className="text-gray-300">Beautiful UI with Tailwind CSS</span>
                </li>
              </ul>
            </section>

            <section className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-pink-500/50 transition-all duration-300">
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Technologies Used
              </h2>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-pink-400 mr-3">▹</span>
                  <span className="text-gray-300"><strong className="text-white">Next.js 15</strong> - React framework with App Router</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-3">▹</span>
                  <span className="text-gray-300"><strong className="text-white">React 19</strong> - Latest version with improved performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-3">▹</span>
                  <span className="text-gray-300"><strong className="text-white">TypeScript</strong> - Type-safe development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-3">▹</span>
                  <span className="text-gray-300"><strong className="text-white">Tailwind CSS 4</strong> - Modern utility-first CSS</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-3">▹</span>
                  <span className="text-gray-300"><strong className="text-white">Axios</strong> - HTTP client for API requests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-3">▹</span>
                  <span className="text-gray-300"><strong className="text-white">Lucide React</strong> - Beautiful icon library</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-3">▹</span>
                  <span className="text-gray-300"><strong className="text-white">WeatherAPI.com</strong> - Weather data provider</span>
                </li>
              </ul>
            </section>

            <section className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Weather Conditions
              </h2>
              <p className="text-lg mb-4 text-gray-300">
                The application displays different background images based on:
              </p>
              <ul className="space-y-3 text-lg ml-4">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">•</span>
                  <span className="text-gray-300">Clear sky (day/night)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">•</span>
                  <span className="text-gray-300">Sunny conditions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">•</span>
                  <span className="text-gray-300">Cloudy weather (day/night)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">•</span>
                  <span className="text-gray-300">Overcast conditions (day/night)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">•</span>
                  <span className="text-gray-300">Rainy weather (day/night)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">•</span>
                  <span className="text-gray-300">Snow (day/night)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">•</span>
                  <span className="text-gray-300">Storms and thunder (day/night)</span>
                </li>
              </ul>
            </section>

            <section className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
                How It Works
              </h2>
              <ol className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">1.</span>
                  <span className="text-gray-300">Enter a city name in the search box</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">2.</span>
                  <span className="text-gray-300">The app fetches real-time weather data from WeatherAPI</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">3.</span>
                  <span className="text-gray-300">Background automatically changes based on weather and time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">4.</span>
                  <span className="text-gray-300">View current temperature, conditions, and forecasts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 font-bold">5.</span>
                  <span className="text-gray-300">See hourly predictions and 3-day forecast</span>
                </li>
              </ol>
            </section>

            <section className="pt-6 border-t border-white/10">
              <p className="text-base text-gray-400">
                Built with <span className="text-pink-400">❤️</span> using modern web technologies
              </p>
              <p className="text-base text-gray-400 mt-2">
                Weather data provided by <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">WeatherAPI.com</a>
              </p>
            </section>

            {/* Developer Info */}
            <section className="mt-8 backdrop-blur-sm bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                  EO
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Ebubekir OZKAN
                  </h3>
                  <p className="text-gray-400 text-sm">Full-Stack Developer</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href="https://github.com/eozkanch" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                    @eozkanch
                  </a>
                </div>
                
                <div className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <a href="https://www.linkedin.com/in/ebubekirozkan/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
                
                <div className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Genève, Switzerland</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400 leading-relaxed">
                  Specialized in <span className="text-cyan-400">Java</span>, <span className="text-purple-400">React</span>, <span className="text-pink-400">Next.js</span>, and modern web technologies. 
                  Passionate about building beautiful and functional applications.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}