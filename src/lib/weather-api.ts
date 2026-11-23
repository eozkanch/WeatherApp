import type { WeatherData, WeatherErrorBody } from '@/lib/weather/types';

export type { WeatherData } from '@/lib/weather/types';

export type WeatherQuery =
  | { city: string }
  | { lat: number; lon: number };

/**
 * Hava durumunu kendi Route Handler'ımızdan (/api/weather) alır.
 * API anahtarı yalnızca sunucuda tutulur.
 */
export const fetchWeatherData = async (
  query: WeatherQuery | string,
  signal?: AbortSignal
): Promise<WeatherData> => {
  const q: WeatherQuery = typeof query === 'string' ? { city: query } : query;

  const params = new URLSearchParams();
  if ('city' in q) {
    if (!q.city.trim()) throw new Error('City name is required');
    params.set('q', q.city.trim());
  } else {
    params.set('lat', String(q.lat));
    params.set('lon', String(q.lon));
  }

  let response: Response;
  try {
    response = await fetch(`/api/weather?${params.toString()}`, { signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    throw new Error('Network error. Please check your internet connection.');
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as WeatherErrorBody | null;
    throw new Error(body?.message ?? 'An error occurred. Please try again.');
  }

  return (await response.json()) as WeatherData;
};
