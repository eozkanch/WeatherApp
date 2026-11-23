/** "06:12 AM" -> gün başından itibaren dakika. "No sunrise" gibi değerlerde null. */
export function parseClockMinutes(value: string): number | null {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(value.trim());
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === 'PM') h += 12;
  return h * 60 + Number(m[2]);
}

/** "YYYY-MM-DD HH:mm" -> gün başından itibaren dakika (şehrin yerel saati). */
export function localtimeToMinutes(localtime: string): number {
  return Number(localtime.slice(11, 13)) * 60 + Number(localtime.slice(14, 16));
}

/** Gündüz boyunca güneşin ilerlemesi: 0 (doğuş) – 1 (batış); gündüz dışında null. */
export function getSunProgress(nowMin: number, sunriseMin: number, sunsetMin: number): number | null {
  if (sunsetMin <= sunriseMin) return null;
  if (nowMin < sunriseMin || nowMin > sunsetMin) return null;
  return (nowMin - sunriseMin) / (sunsetMin - sunriseMin);
}

export function formatDuration(minutes: number): string {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}
