'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { LocateFixed } from 'lucide-react';
import type { CityImage } from '@/lib/city-image';
import WeatherIcon from '@/components/WeatherIcon';
import { useUnit } from '@/lib/units';
import { WeatherData } from '@/lib/weather-api';
import WindCard from '@/components/details/WindCard';
import UvCard from '@/components/details/UvCard';
import AirQualityCard from '@/components/details/AirQualityCard';
import SunCard from '@/components/details/SunCard';
import { getBarGeometry, getHourlyWindow, getMarkerPosition, getOverallRange } from '@/lib/weather/forecast';

interface WeatherCardProps {
  data: WeatherData;
  onCityChange: (cityName: string) => void;
  onLocate?: () => void;
  locating?: boolean;
  /** Şehir fotoğrafı arka plandaysa Unsplash atfı */
  photoCredit?: CityImage['credit'];
}

export default function WeatherCard({ data, onCityChange, onLocate, locating = false, photoCredit }: WeatherCardProps) {
  const { unit, toggleUnit, temp } = useUnit();
  const { days: forecastDays, current, location } = data;

  const [showCityInput, setShowCityInput] = useState(false);
  const [cityInput, setCityInput] = useState("");
  // Seçim, ait olduğu veriye bağlıdır: yeni şehir/veri gelince otomatik bugüne döner
  const [selection, setSelection] = useState({ forData: data, day: 0 });
  const selectedDay = selection.forData === data ? selection.day : 0;
  const selectDay = (day: number) => setSelection({ forData: data, day });
  const hourlyScrollRef = useRef<HTMLDivElement>(null);

  // Gün veya veri değişince saatlik liste başa sarsın
  useEffect(() => {
    hourlyScrollRef.current?.scrollTo({ left: 0 });
  }, [selectedDay, data]);

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const city = cityInput.trim();
    if (!city) return;
    onCityChange(city);
    setCityInput("");
    setShowCityInput(false);
  };

  const dayLabels = useMemo(() => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return forecastDays.map((day, index) =>
      index === 0 ? "Today" : dayNames[new Date(`${day.date}T00:00:00`).getDay()]
    );
  }, [forecastDays]);

  // Seçili güne odaklı saatlik tahmin
  const hours = useMemo(() => {
    // Şehrin yerel saati (cihaz saati değil): "YYYY-MM-DD HH:mm"
    const localHour = Number(location.localtime.slice(11, 13));

    return getHourlyWindow(forecastDays, selectedDay, localHour).map((hour, index) => ({
      time: selectedDay === 0 && index === 0 ? "Now" : `${hour.hour.toString().padStart(2, '0')}:00`,
      temp: temp(hour.temp),
      code: hour.condition.code,
      isDay: hour.isDay,
    }));
  }, [forecastDays, location.localtime, selectedDay, temp]);

  // 3 günlük satırlar: çubuklar genel min–max aralığına göre hesaplanır
  const days = useMemo(() => {
    const overall = getOverallRange(forecastDays, unit);

    return forecastDays.slice(0, 3).map((day, index) => ({
      day: dayLabels[index],
      minTemp: temp(day.minTemp),
      maxTemp: temp(day.maxTemp),
      code: day.condition.code,
      bar: overall
        ? getBarGeometry(day.minTemp[unit], day.maxTemp[unit], overall)
        : { left: 0, width: 100 },
      // Yalnızca bugün için anlık sıcaklık işareti
      marker: index === 0
        ? getMarkerPosition(current.temp[unit], day.minTemp[unit], day.maxTemp[unit])
        : null,
    }));
  }, [forecastDays, current.temp, unit, dayLabels, temp]);

  const today = forecastDays[0];
  const highTemp = today ? temp(today.maxTemp) : null;
  const lowTemp = today ? temp(today.minTemp) : null;

  return (
    <div className="w-full h-full flex flex-col text-white overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full px-4 sm:px-6 md:px-8 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] overflow-y-auto no-scrollbar">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-4">
          {/* About Link */}
          <a 
            href="/about" 
            className="text-white/70 hover:text-white text-sm transition-colors duration-200"
          >
            About
          </a>
          
          <div className="flex items-center gap-2">
            {/* Unit Toggle */}
            <button
              onClick={toggleUnit}
              aria-label={`°C / °F, currently ${unit === 'c' ? 'Celsius' : 'Fahrenheit'}. Switch unit`}
              className="text-white text-sm px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm opacity-70 hover:opacity-100"
            >
              <span className={unit === 'c' ? 'font-semibold' : 'opacity-60'}>°C</span>
              <span className="opacity-40"> / </span>
              <span className={unit === 'f' ? 'font-semibold' : 'opacity-60'}>°F</span>
            </button>

            {/* Use My Location */}
            {onLocate && (
              <button
                onClick={onLocate}
                disabled={locating}
                aria-label="Use my location"
                className="text-white p-1.5 rounded-full bg-white/10 backdrop-blur-sm opacity-70 hover:opacity-100 disabled:opacity-40"
              >
                <LocateFixed className={`w-4 h-4 ${locating ? 'animate-pulse' : ''}`} />
              </button>
            )}

            {/* City Input Toggle */}
            <button 
              onClick={() => setShowCityInput(!showCityInput)}
              className="text-white text-sm opacity-70 hover:opacity-100 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm"
            >
              Change City
            </button>
          </div>
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
            {location.name}
          </h1>
        </div>

        {/* Temperature */}
        <div className="text-center mb-2">
          <div className="text-7xl sm:text-8xl font-thin">{temp(current.temp)}°</div>
        </div>

        {/* Weather Condition */}
        <div className="text-center mb-2">
          <p className="text-xl font-light">{current.condition.text}</p>
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

        {/* Hourly Forecast */}
        {hours.length > 0 && (
          <div className="mb-6 px-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            {selectedDay !== 0 && (
              <p className="text-xs uppercase tracking-wider opacity-70 mb-3">{dayLabels[selectedDay]} · Hourly</p>
            )}
            <div ref={hourlyScrollRef} className="flex items-center overflow-x-auto gap-4 pb-2">
              {hours.map((h, i) => (
                <div key={`${selectedDay}-${i}`} className="flex flex-col items-center min-w-[60px]">
                  <span className="text-sm font-light mb-2">{h.time}</span>
                  <div className="mb-2"><WeatherIcon code={h.code} isDay={h.isDay} className="w-6 h-6" /></div>
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
                <button
                  key={i}
                  type="button"
                  onClick={() => selectDay(i)}
                  aria-pressed={selectedDay === i}
                  className={`w-full flex items-center justify-between py-2 px-2 -mx-2 rounded-xl text-left border-b border-white/10 last:border-b-0 transition-colors ${
                    selectedDay === i ? 'bg-white/15' : 'hover:bg-white/5'
                  }`}
                >
                  <span className="text-base font-light w-12">{d.day}</span>
                  <div className="flex-1 flex justify-center"><WeatherIcon code={d.code} className="w-8 h-8" /></div>
                  <div className="flex items-center gap-3 text-base">
                    <span className="opacity-60 w-8 text-right">{d.minTemp}°</span>
                    <div className="relative w-20 h-1 bg-white/20 rounded-full">
                      <div
                        className="absolute top-0 h-full rounded-full"
                        style={{
                          left: `${d.bar.left}%`,
                          width: `${d.bar.width}%`,
                          background: 'linear-gradient(to right, #60a5fa, #4ade80, #facc15)',
                          // Renk, çubuğun kendi genişliği değil 3 günlük genel aralığa göre dağılsın
                          backgroundSize: `${10000 / d.bar.width}% 100%`,
                          backgroundPosition: `${d.bar.width >= 100 ? 0 : (d.bar.left / (100 - d.bar.width)) * 100}% 0`,
                        }}
                      >
                        {d.marker !== null && (
                          <span
                            className="absolute top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-black/30"
                            style={{ left: `${d.marker}%` }}
                          />
                        )}
                      </div>
                    </div>
                    <span className="font-medium w-8">{d.maxTemp}°</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Detail Cards (Bento Grid) */}
        {forecastDays[selectedDay] && (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-6">
            <WindCard wind={current.wind} />
            <UvCard uv={selectedDay === 0 ? current.uv : forecastDays[selectedDay].uv} />
            <AirQualityCard airQuality={current.airQuality} />
            <SunCard
              astro={forecastDays[selectedDay].astro}
              localtime={location.localtime}
              isToday={selectedDay === 0}
            />
          </div>
        )}


        {/* Unsplash atfı (API kuralı) */}
        {photoCredit && (
          <p className="text-center text-[11px] text-white/60 pb-2">
            Photo by{' '}
            <a href={photoCredit.profileUrl} target="_blank" rel="noopener noreferrer" className="underline">
              {photoCredit.name}
            </a>{' '}
            on{' '}
            <a href="https://unsplash.com/?utm_source=weather_app&utm_medium=referral" target="_blank" rel="noopener noreferrer" className="underline">
              Unsplash
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
