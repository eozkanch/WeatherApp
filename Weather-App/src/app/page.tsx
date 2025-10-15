'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import WeatherCard from '@/components/WeatherCard';
import Loading from '@/components/Loading';
import { fetchWeatherData, WeatherData, getBackgroundImage } from '@/lib/weather-api';

export default function Home() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string>('/bg-images-optimized/general-day.webp');

  const loadWeatherData = async (cityName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await fetchWeatherData(cityName);
      setData(weatherData);
      
      // Arkaplan resmini güncelle
      if (weatherData?.current?.condition?.text && weatherData?.location?.localtime) {
        const newBgImage = getBackgroundImage(
          weatherData.current.condition.text,
          weatherData.location.localtime
        );
        setBgImage(newBgImage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      // 5 saniye sonra hata mesajını kaldır
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load Geneva by default
    loadWeatherData('Geneva');
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden relative">
      {/* Optimized Background Image */}
      <Image
        src={bgImage}
        alt="Weather background"
        fill
        priority
        quality={85}
        className="object-cover"
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
      
      {/* Background Overlay - daha karanlık overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      
    
      {/* Weather Card Component - Full Screen */}
      <div className="relative z-10 w-full h-full max-w-md mx-auto">
        {data && (
          <WeatherCard 
            data={data} 
            onCityChange={loadWeatherData}
          />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-red-600 text-white px-8 py-6 rounded-2xl shadow-2xl max-w-md text-center animate-fade-in">
          <div className="flex flex-col items-center gap-3">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="font-medium text-lg leading-relaxed">{error}</p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>

      {/* Loading State */}
      {loading && <Loading />}
    </div>
  );
}
