import { NextRequest, NextResponse } from 'next/server';
import { parseCityName } from '@/lib/weather/validation';
import type { CityImage } from '@/lib/city-image';

const API = 'https://api.unsplash.com';
const REVALIDATE_SECONDS = 60 * 60 * 24; // Şehir fotoğrafı günlerce değişmez; 24 saat
const TIMEOUT_MS = 6000;
// Unsplash kuralı: bağlantılara uygulama adıyla utm parametreleri eklenir
const UTM = 'utm_source=weather_app&utm_medium=referral';

interface UnsplashPhoto {
  color: string | null;
  urls: { raw: string };
  links: { html: string; download_location: string };
  user: { name: string; links: { html: string } };
}

const withUtm = (url: string) => `${url}${url.includes('?') ? '&' : '?'}${UTM}`;

const unsplashFetch = (url: string, accessKey: string, init: RequestInit = {}) =>
  fetch(url, {
    ...init,
    headers: { Authorization: `Client-ID ${accessKey}`, 'Accept-Version': 'v1' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

function toCityImage(photo: UnsplashPhoto): CityImage {
  return {
    // Unsplash'ın imgix parametreleri: boyut, kalite, modern format. Kendi CDN'inden gösterilir (hotlink).
    src: `${photo.urls.raw}&w=1600&q=70&fm=webp&fit=crop&auto=format`,
    color: photo.color ?? '#0a0a0a',
    credit: {
      name: photo.user.name,
      profileUrl: withUtm(photo.user.links.html),
      photoUrl: withUtm(photo.links.html),
    },
  };
}

export async function GET(request: NextRequest) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }

  const city = parseCityName(request.nextUrl.searchParams.get('q'));
  if (!city) {
    return NextResponse.json({ error: 'invalid_query' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const search = new URL(`${API}/search/photos`);
    search.searchParams.set('query', `${city} city`);
    search.searchParams.set('orientation', 'landscape');
    search.searchParams.set('content_filter', 'high');
    search.searchParams.set('per_page', '1');

    const response = await unsplashFetch(search.toString(), accessKey, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!response.ok) {
      return NextResponse.json({ error: 'upstream_error' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
    }

    const { results } = (await response.json()) as { results: UnsplashPhoto[] };
    const photo = results[0];
    if (!photo) {
      return NextResponse.json({ error: 'not_found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
    }

    // Unsplash kuralı: fotoğraf kullanıldığında download ucu çağrılır (cache doldurulurken bir kez)
    void unsplashFetch(photo.links.download_location, accessKey, { next: { revalidate: REVALIDATE_SECONDS } }).catch(() => {});

    return NextResponse.json(toCityImage(photo), {
      headers: { 'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=3600` },
    });
  } catch {
    return NextResponse.json({ error: 'upstream_error' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
}
