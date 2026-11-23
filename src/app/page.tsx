'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { preload } from 'react-dom';
import WeatherBackground from '@/components/WeatherBackground';
import Loading from '@/components/Loading';
import WeatherCard from '@/components/WeatherCard';
import { fetchWeatherData, WeatherData, WeatherQuery } from '@/lib/weather-api';
import { getCurrentCoords } from '@/lib/geolocation';
import { fetchCityImage, type CityImage } from '@/lib/city-image';

const DEFAULT_CITY = 'Geneva';

// Okunabilirlik için arka plan karartması (şehir fotoğrafı ve yedek gradient üstünde)
const OVERLAY = 'linear-gradient(to bottom, rgba(0,0,0,.6), rgba(0,0,0,.4), rgba(0,0,0,.55))';

export default function Home() {
  // İlk veri isteğini JS indirilirken paralel başlat; sonraki fetch aynı URL ile bu yanıtı kullanır
  preload(`/api/weather?q=${DEFAULT_CITY}`, { as: 'fetch', crossOrigin: 'anonymous' });
  preload(`/api/city-image?q=${encodeURIComponent(DEFAULT_CITY)}`, { as: 'fetch', crossOrigin: 'anonymous' });

  const [data, setData] = useState<WeatherData | null>(null);
  // İlk açılışta varsayılan şehir yüklenir: başlangıçta yükleniyor durumunda
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Arka plan: şehrin fotoğrafı; yoksa (yükleniyor/bulunamadı) gündüz-gece gradient'i
  const [cityImage, setCityImage] = useState<CityImage | null>(null);

  const [locating, setLocating] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showError = useCallback((message: string) => {
    setError(message);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(() => setError(null), 5000);
  }, []);

  /** Hava durumunu ve şehir fotoğrafını çeker. Yükleniyor/hata durumunu çağıran hazırlar. */
  const fetchAndShow = useCallback(async (query: WeatherQuery | string) => {
    // Önceki istek hâlâ sürüyorsa iptal et (yarış durumunu önler)
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const { signal } = controller;

    // Şehir adı yazıldıysa fotoğraf, hava durumu ile paralel istenir
    const earlyPhoto = typeof query === 'string' ? fetchCityImage(query, signal) : null;
    earlyPhoto?.catch(() => {}); // iptal edilirse yakalanmamış hata olmasın

    try {
      const weatherData = await fetchWeatherData(query, signal);
      setData(weatherData);

      // Koordinatla aramada şehir adı ancak şimdi biliniyor
      const { name, country } = weatherData.location;
      (earlyPhoto ?? fetchCityImage(`${name} ${country}`, signal))
        .then((image) => {
          if (abortRef.current === controller) setCityImage(image);
        })
        .catch(() => {}); // iptal
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      showError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      if (abortRef.current === controller) setLoading(false);
    }
  }, [showError]);

  /** Kullanıcı eylemiyle (şehir araması, konum) yeni veri iste. */
  const search = useCallback((query: WeatherQuery | string) => {
    setLoading(true);
    setError(null);
    setCityImage(null); // önceki şehrin fotoğrafı yeni şehirle gösterilmesin
    return fetchAndShow(query);
  }, [fetchAndShow]);

  const handleLocate = useCallback(async () => {
    setLocating(true);
    try {
      await search(await getCurrentCoords());
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Could not determine your location.');
    } finally {
      setLocating(false);
    }
  }, [search, showError]);

  useEffect(() => {
    // Varsayılan şehir; konum izni kullanıcı butona basınca istenir
    // Dış sisteme (ağ) senkron: state yalnızca await sonrasında güncellenir
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAndShow(DEFAULT_CITY);
    return () => abortRef.current?.abort();
  }, [fetchAndShow]);

  return (
    <div className="h-dvh w-screen flex items-center justify-center overflow-hidden relative">
      {/* Arka plan: şehir fotoğrafı (cross-fade) */}
      <WeatherBackground src={cityImage?.src ?? null} color={cityImage?.color} isDay={data?.current.isDay} />

      {/* Okunabilirlik karartması */}
      <div className="absolute inset-0" style={{ backgroundImage: OVERLAY }} />

      {/* Weather Card Component - Full Screen */}
      <div className="relative z-10 w-full h-full max-w-md md:max-w-xl mx-auto">
        {data && (
          <WeatherCard 
            data={data} 
            onCityChange={search}
            onLocate={handleLocate}
            locating={locating}
            photoCredit={cityImage?.credit}
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
