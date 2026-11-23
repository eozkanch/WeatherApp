export interface CityImage {
  /** Unsplash CDN adresi (hotlink); boyut/kalite parametreleri eklenmiş */
  src: string;
  /** Baskın renk: görsel yüklenene kadar arka plan rengi */
  color: string;
  credit: {
    name: string;
    profileUrl: string;
    photoUrl: string;
  };
}

/** Şehir fotoğrafını alır; yoksa/yapılandırılmamışsa null (çağıran hava durumu görseline döner). */
export async function fetchCityImage(city: string, signal?: AbortSignal): Promise<CityImage | null> {
  try {
    const response = await fetch(`/api/city-image?q=${encodeURIComponent(city)}`, { signal });
    if (!response.ok) return null;
    return (await response.json()) as CityImage;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    return null;
  }
}
