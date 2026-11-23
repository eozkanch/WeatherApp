import { Leaf } from 'lucide-react';
import type { AirQuality } from '@/lib/weather/types';
import BentoCard from './BentoCard';

const LABELS = [
  'Good',
  'Moderate',
  'Unhealthy for sensitive groups',
  'Unhealthy',
  'Very unhealthy',
  'Hazardous',
];

export default function AirQualityCard({ airQuality }: { airQuality: AirQuality | null }) {
  if (!airQuality) {
    return (
      <BentoCard title="Air Quality" icon={<Leaf className="w-4 h-4" />}>
        <p className="text-sm opacity-70">Not available for this location.</p>
      </BentoCard>
    );
  }

  const index = Math.min(Math.max(Math.round(airQuality.usEpaIndex), 1), 6);
  // 6 eşit dilim; işaret ilgili dilimin ortasında
  const position = ((index - 0.5) / 6) * 100;

  return (
    <BentoCard title="Air Quality" icon={<Leaf className="w-4 h-4" />}>
      <div className="text-3xl font-light leading-none">{index}</div>
      <div className="text-sm mt-1">{LABELS[index - 1]}</div>
      <div className="relative mt-4 h-1.5 rounded-full" style={{ background: 'linear-gradient(to right,#4ade80,#facc15,#fb923c,#ef4444,#a855f7,#7f1d1d)' }}>
        <span
          className="absolute top-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-black/30"
          style={{ left: `${position}%` }}
        />
      </div>
      <p className="text-xs mt-auto pt-3 opacity-80">
        PM2.5 {airQuality.pm25.toFixed(1)} · PM10 {airQuality.pm10.toFixed(1)} µg/m³
      </p>
    </BentoCard>
  );
}
