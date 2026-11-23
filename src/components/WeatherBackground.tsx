'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Layer {
  src: string;
  id: number;
  loaded: boolean;
}

// Fotoğraf yokken/yüklenirken gösterilen yedek: gündüz-gece gradient'i
const FALLBACK = {
  day: 'linear-gradient(160deg, #2f6fb0, #7fb4e6)',
  night: 'linear-gradient(160deg, #0a1230, #1f2f5c)',
};

interface WeatherBackgroundProps {
  /** Şehir fotoğrafı (Unsplash CDN); null ise yedek gradient görünür */
  src: string | null;
  /** Fotoğrafın baskın rengi: yüklenirken zemin rengi */
  color?: string;
  isDay?: boolean;
}

/**
 * Şehir fotoğrafını cross-fade ile gösterir.
 * Yeni fotoğraf yüklenene kadar öncekisi (veya gradient) görünür kalır.
 */
export default function WeatherBackground({ src, color, isDay = false }: WeatherBackgroundProps) {
  const nextId = useRef(0);
  const [layers, setLayers] = useState<Layer[]>([]);

  // src değişince yeni katman ekle; null ise katmanları kaldır
  useEffect(() => {
    setLayers((prev) => {
      if (src === null) return prev.length ? [] : prev;
      return prev[prev.length - 1]?.src === src ? prev : [...prev, { src, id: nextId.current++, loaded: false }];
    });
  }, [src]);

  // En üstteki katman görününce alttakileri kaldır
  const top = layers[layers.length - 1];
  useEffect(() => {
    if (!top?.loaded || layers.length === 1) return;
    const timer = setTimeout(() => {
      setLayers((prev) => prev.filter((l) => l.id === top.id));
    }, 1000);
    return () => clearTimeout(timer);
  }, [top, layers.length]);

  const markLoaded = (id: number) =>
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, loaded: true } : l)));

  return (
    <div
      className="absolute inset-0 transition-colors duration-700"
      style={{ backgroundImage: isDay ? FALLBACK.day : FALLBACK.night, backgroundColor: color }}
      aria-hidden="true"
    >
      {layers.map((layer) => (
        <Image
          key={layer.id}
          src={layer.src}
          alt=""
          fill
          unoptimized // Unsplash kuralı: görsel kendi CDN'inden gösterilir (hotlink)
          loading="eager"
          fetchPriority="high"
          className={`object-cover weather-bg-layer ${layer.loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => markLoaded(layer.id)}
        />
      ))}
    </div>
  );
}
