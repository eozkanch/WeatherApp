import { NextRequest, NextResponse } from 'next/server';
import { mapForecastResponse, type RawForecastResponse } from '@/lib/weather/mapper';
import type { WeatherErrorBody } from '@/lib/weather/types';
import { parseCityName } from '@/lib/weather/validation';

const REVALIDATE_SECONDS = 600; // 10 dk
const UPSTREAM_TIMEOUT_MS = 8000;
const UPSTREAM = 'https://api.weatherapi.com/v1/forecast.json';

function errorResponse(status: number, body: WeatherErrorBody) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

/** Geçici ağ hatası/5xx için bir kez yeniden dener; her denemede zaman aşımı uygular. */
async function fetchUpstream(url: URL): Promise<Response> {
  const attempt = () =>
    fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

  try {
    const response = await attempt();
    return response.status >= 500 ? await attempt() : response;
  } catch {
    return attempt();
  }
}

/** Sorgudan WeatherAPI `q` değerini üretir; geçersizse null. */
function resolveQuery(params: URLSearchParams): string | null {
  const lat = params.get('lat');
  const lon = params.get('lon');

  if (lat !== null || lon !== null) {
    const latN = Number(lat);
    const lonN = Number(lon);
    if (
      lat === null || lon === null || lat.trim() === '' || lon.trim() === '' ||
      !Number.isFinite(latN) || !Number.isFinite(lonN) ||
      Math.abs(latN) > 90 || Math.abs(lonN) > 180
    ) {
      return null;
    }
    // 2 ondalık (~1 km): yakın kullanıcılar aynı cache girdisini paylaşır
    return `${latN.toFixed(2)},${lonN.toFixed(2)}`;
  }

  const q = parseCityName(params.get('q'));
  if (!q) return null;
  // Cache hit oranı için normalize et
  return q.toLowerCase().replace(/\s+/g, ' ');
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return errorResponse(500, {
      error: 'server_misconfigured',
      message: 'Weather service is not configured.',
    });
  }

  const q = resolveQuery(request.nextUrl.searchParams);
  if (!q) {
    return errorResponse(400, {
      error: 'invalid_query',
      message: 'Please enter a valid city name or coordinates.',
    });
  }

  const url = new URL(UPSTREAM);
  url.searchParams.set('key', apiKey);
  url.searchParams.set('q', q);
  url.searchParams.set('days', '3');
  url.searchParams.set('aqi', 'yes');
  url.searchParams.set('alerts', 'no');

  let upstream: Response;
  try {
    upstream = await fetchUpstream(url);
  } catch {
    return errorResponse(502, {
      error: 'upstream_error',
      message: 'Weather service is unreachable. Please try again.',
    });
  }

  if (!upstream.ok) {
    // WeatherAPI: 400 + code 1006 = konum bulunamadı; 401/403 = anahtar/kota
    if (upstream.status === 400) {
      return errorResponse(404, {
        error: 'not_found',
        message: 'City not found. Please check the spelling and try again.',
      });
    }
    if (upstream.status === 403 || upstream.status === 429) {
      return errorResponse(429, {
        error: 'rate_limited',
        message: 'Weather service limit exceeded. Please try again later.',
      });
    }
    return errorResponse(502, {
      error: 'upstream_error',
      message: 'Weather service error. Please try again.',
    });
  }

  try {
    const raw = (await upstream.json()) as RawForecastResponse;
    return NextResponse.json(mapForecastResponse(raw), {
      headers: {
        'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=300`,
      },
    });
  } catch {
    return errorResponse(502, {
      error: 'upstream_error',
      message: 'Unexpected response from weather service.',
    });
  }
}
