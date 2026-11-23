import { Sunrise } from 'lucide-react';
import { formatDuration, getSunProgress, localtimeToMinutes, parseClockMinutes } from '@/lib/weather/astro';
import type { Astro } from '@/lib/weather/types';
import BentoCard from './BentoCard';

interface SunCardProps {
  astro: Astro;
  /** Şehrin yerel zamanı; yalnızca bugün seçiliyken güneşin anlık konumu gösterilir */
  localtime: string;
  isToday: boolean;
}

// Yarım daire yay: merkez (100,90), yarıçap 80
const CX = 100;
const CY = 90;
const R = 80;

export default function SunCard({ astro, localtime, isToday }: SunCardProps) {
  const sunrise = parseClockMinutes(astro.sunrise);
  const sunset = parseClockMinutes(astro.sunset);
  const hasSun = sunrise !== null && sunset !== null && sunset > sunrise;

  const progress = hasSun && isToday ? getSunProgress(localtimeToMinutes(localtime), sunrise, sunset) : null;

  let sunX = 0;
  let sunY = 0;
  if (progress !== null) {
    const theta = Math.PI * (1 - progress);
    sunX = CX + R * Math.cos(theta);
    sunY = CY - R * Math.sin(theta);
  }

  return (
    <BentoCard title="Sun" icon={<Sunrise className="w-4 h-4" />}>
      {hasSun ? (
        <>
          <svg viewBox="0 0 200 100" className="w-full" role="img" aria-label={`Sunrise ${astro.sunrise}, sunset ${astro.sunset}`}>
            <line x1="10" y1={CY} x2="190" y2={CY} stroke="white" strokeOpacity="0.3" />
            <path d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`} fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="3 4" />
            {progress !== null && (
              <>
                <path
                  d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${sunX} ${sunY}`}
                  fill="none" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round"
                />
                <circle cx={sunX} cy={sunY} r="7" fill="#facc15" stroke="white" strokeWidth="1.5" />
              </>
            )}
          </svg>
          <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-xs mt-1">
            <div>
              <div className="opacity-60">Sunrise</div>
              <div className="text-sm whitespace-nowrap">{astro.sunrise}</div>
            </div>
            <div className="text-right">
              <div className="opacity-60">Sunset</div>
              <div className="text-sm whitespace-nowrap">{astro.sunset}</div>
            </div>
          </div>
          <p className="text-xs mt-3 opacity-80">Daylight {formatDuration(sunset - sunrise)}</p>
        </>
      ) : (
        <p className="text-sm opacity-70">{astro.sunrise || 'No sunrise/sunset today.'}</p>
      )}
      <p className="text-xs mt-auto pt-2 opacity-80">
        {astro.moonPhase} · {astro.moonIllumination}%
      </p>
    </BentoCard>
  );
}
