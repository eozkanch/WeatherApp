'use client';

import { useState } from 'react';
import { Moon, Sun, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle } from 'lucide-react';
import { WeatherData } from '@/lib/weather-api';

interface WeatherCardProps {
  data: WeatherData;
  onCityChange: (cityName: string) => void;
}

export default function WeatherCard({ data, onCityChange }: WeatherCardProps) {
  const [showCityInput, setShowCityInput] = useState(false);
  const [cityInput, setCityInput] = useState("");

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string, size: string = "w-8 h-8") => {
    if (!condition) return <Moon className={size} />;
    
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return <Sun className={size} />;
    }
    if (conditionLower.includes('partly cloudy') || conditionLower.includes('overcast')) {
      return <CloudDrizzle className={size} />;
    }
    if (conditionLower.includes('cloud')) {
      return <Cloud className={size} />;
    }
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className={size} />;
    }
    if (conditionLower.includes('snow')) {
      return <CloudSnow className={size} />;
    }
    if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
      return <Zap className={size} />;
    }
    return <Moon className={size} />;
  };

  // Handle city change
  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim() && onCityChange) {
      onCityChange(cityInput.trim());
      setCityInput("");
      setShowCityInput(false);
    }
  };

  // Get current hour and next 6 hours
  const getCurrentAndNextHours = () => {
    if (!data?.forecast?.forecastday?.[0]?.hour) return [];
    
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const allHours = data.forecast.forecastday[0].hour;
    
    return allHours.slice(currentHour, currentHour + 7).map((hour, index) => {
      const time = new Date(hour.time);
      const displayTime = index === 0 ? "Now" : `${time.getHours().toString().padStart(2, '0')}:00`;
      
      return {
        time: displayTime,
        temp: Math.round(hour.temp_c),
        icon: getWeatherIcon(hour.condition.text, "w-6 h-6")
      };
    });
  };

  // Daily forecast data from API
  const getDailyForecast = () => {
    if (!data?.forecast?.forecastday) return [];
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return data.forecast.forecastday.slice(0, 3).map((day, index) => {
      const date = new Date(day.date);
      const dayName = index === 0 ? "Today" : dayNames[date.getDay()];
      
      return {
        day: dayName,
        minTemp: Math.round(day.day.mintemp_c),
        maxTemp: Math.round(day.day.maxtemp_c),
        icon: getWeatherIcon(day.day.condition.text, "w-8 h-8")
      };
    });
  };

  const hours = getCurrentAndNextHours();
  const days = getDailyForecast();

  // Get high/low for today
  const todayForecast = data?.forecast?.forecastday?.[0]?.day;
  const highTemp = todayForecast ? Math.round(todayForecast.maxtemp_c) : null;
  const lowTemp = todayForecast ? Math.round(todayForecast.mintemp_c) : null;

  return (
    <div className="w-full h-full flex flex-col text-white overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full px-6 py-8 overflow-y-auto">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-4">
          {/* About Link */}
          <a 
            href="/about" 
            className="text-white/70 hover:text-white text-sm transition-colors duration-200"
          >
            About
          </a>
          
          {/* City Input Toggle */}
          <button 
            onClick={() => setShowCityInput(!showCityInput)}
            className="text-white text-sm opacity-70 hover:opacity-100 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm"
          >
            Change City
          </button>
        </div>

        {/* City Input */}
        {showCityInput && (
          <div className="mb-6">
            <form onSubmit={handleCitySubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter city name..."
                autoFocus
                className="flex-1 px-5 py-3 sm:py-2 bg-white/20 text-white text-base sm:text-sm rounded-xl backdrop-blur-sm border border-white/30 focus:border-white/50 focus:outline-none placeholder-white/60 min-h-[48px] sm:min-h-0"
              />
              <button
                type="submit"
                className="px-6 py-3 sm:py-2 bg-white/30 text-white text-base sm:text-sm font-medium rounded-xl hover:bg-white/40 active:scale-95 backdrop-blur-sm transition-all min-h-[48px] sm:min-h-0 sm:w-auto"
              >
                OK
              </button>
            </form>
          </div>
        )}

       

        {/* City Name */}
        <div className="text-center mb-2">
          <h1 className="text-3xl font-light tracking-wide">
            {data?.location?.name || "Geneva"}
          </h1>
        </div>

        {/* Temperature */}
        {data?.current && (
          <>
            <div className="text-center mb-2">
              <div className="text-8xl font-thin">
                {Math.round(data.current.temp_c)}°
              </div>
            </div>

            {/* Weather Condition */}
            <div className="text-center mb-2">
              <p className="text-xl font-light">
                {data.current.condition?.text || "Unknown"}
              </p>
            </div>

            {/* High/Low */}
            {highTemp !== null && lowTemp !== null && (
              <div className="text-center mb-6">
                <p className="text-lg font-light">
                  <span className="text-white/90">↑ {highTemp}°</span>
                  <span className="mx-2 text-white/90">↓ {lowTemp}°</span>
                </p>
              </div>
            )}
          </>
        )}

     

        {/* Hourly Forecast */}
        {hours.length > 0 && (
          <div className="mb-6 px-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <div className="flex justify-between items-center overflow-x-auto gap-4 pb-2">
              {hours.map((h, i) => (
                <div key={i} className="flex flex-col items-center min-w-[60px]">
                  <span className="text-sm font-light mb-2">{h.time}</span>
                  <div className="mb-2">{h.icon}</div>
                  <span className="text-base font-medium">{h.temp}°</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3-Day Forecast */}
        {days.length > 0 && (
          <div className="px-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs uppercase tracking-wider opacity-70">3-Day Forecast</span>
            </div>
            <div className="space-y-3">
              {days.map((d, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0">
                  <span className="text-base font-light w-12">{d.day}</span>
                  <div className="flex-1 flex justify-center">{d.icon}</div>
                  <div className="flex items-center gap-4 text-base">
                    <span className="opacity-60">{d.minTemp}°</span>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 rounded-full"></div>
                    <span className="font-medium">{d.maxTemp}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
