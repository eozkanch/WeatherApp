'use client';

import { Wind } from 'lucide-react';
import { useUnit } from '@/lib/units';
import type { CurrentWeather } from '@/lib/weather/types';
import BentoCard from './BentoCard';

export default function WindCard({ wind }: { wind: CurrentWeather['wind'] }) {
  const { unit } = useUnit();
  const metric = unit === 'c';
  const speed = Math.round(metric ? wind.kph : wind.mph);
  const gust = Math.round(metric ? wind.gust.kph : wind.gust.mph);
  const speedUnit = metric ? 'km/h' : 'mph';

  // wind_degree rüzgârın GELDİĞİ yönü verir. Ok, halkada o yönde durur ve merkeze doğru (esme yönüne) bakar.
  const fromRotation = wind.degree % 360;

  return (
    <BentoCard title="Wind" icon={<Wind className="w-4 h-4" />}>
      <div
        className="relative mx-auto w-full max-w-[8.5rem] aspect-square"
        role="img"
        aria-label={`Wind from ${wind.dir}, ${speed} ${speedUnit}`}
      >
        <svg viewBox="-8 -8 116 116" className="absolute inset-0 w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
          {Array.from({ length: 36 }, (_, i) => {
            const major = i % 9 === 0;
            return (
              <line
                key={i}
                x1="50" y1="10" x2="50" y2={major ? 16 : 13}
                stroke="white" strokeOpacity={major ? 0.7 : 0.3} strokeWidth="1"
                transform={`rotate(${i * 10} 50 50)`}
              />
            );
          })}
          <g fill="white" fontSize="8" textAnchor="middle" opacity="0.8">
            <text x="50" y="28">N</text>
            <text x="76" y="53">E</text>
            <text x="50" y="79">S</text>
            <text x="24" y="53">W</text>
          </g>
          <g style={{ transform: `rotate(${fromRotation}deg)`, transformOrigin: '50px 50px', transition: 'transform 0.6s ease' }}>
            <path d="M44 -4 L56 -4 L50 11 Z" fill="white" />
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-light leading-none">{speed}</span>
          <span className="text-[10px] opacity-70">{speedUnit}</span>
        </div>
      </div>
      <p className="text-center text-xs mt-3 opacity-80">
        From {wind.dir} · Gusts {gust}
      </p>
    </BentoCard>
  );
}
