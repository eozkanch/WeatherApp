import { Sun } from 'lucide-react';
import BentoCard from './BentoCard';

const LEVELS = [
  { max: 2, label: 'Low', advice: 'No protection needed.' },
  { max: 5, label: 'Moderate', advice: 'Wear sunscreen outdoors.' },
  { max: 7, label: 'High', advice: 'Seek shade at midday.' },
  { max: 10, label: 'Very High', advice: 'Extra protection needed.' },
  { max: Infinity, label: 'Extreme', advice: 'Avoid the sun if possible.' },
];

const SCALE_MAX = 11;

export default function UvCard({ uv }: { uv: number }) {
  const level = LEVELS.find((l) => Math.round(uv) <= l.max) ?? LEVELS[LEVELS.length - 1];
  const position = Math.min(Math.max(uv / SCALE_MAX, 0), 1) * 100;

  return (
    <BentoCard title="UV Index" icon={<Sun className="w-4 h-4" />}>
      <div className="text-3xl font-light leading-none">{Math.round(uv)}</div>
      <div className="text-sm mt-1">{level.label}</div>
      <div className="relative mt-4 h-1.5 rounded-full" style={{ background: 'linear-gradient(to right,#4ade80,#facc15,#fb923c,#ef4444,#a855f7)' }}>
        <span
          className="absolute top-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-black/30"
          style={{ left: `${position}%` }}
        />
      </div>
      <p className="text-xs mt-auto pt-3 opacity-80">{level.advice}</p>
    </BentoCard>
  );
}
