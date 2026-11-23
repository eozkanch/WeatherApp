import type { DayForecast, HourForecast, Temp, Unit } from './types';

/**
 * Seçili gün için saatlik pencere.
 * - Bugün: şehrin şu anki yerel saatinden başlayıp (sonraki güne taşarak) 24 saat.
 * - Diğer günler: o günün 00:00–23:00 saatleri.
 */
export function getHourlyWindow(
  days: DayForecast[],
  selectedIndex: number,
  localHour: number
): HourForecast[] {
  const day = days[selectedIndex];
  if (!day) return [];

  if (selectedIndex !== 0) return day.hours;

  const upcoming = [...day.hours.slice(localHour), ...(days[1]?.hours ?? [])];
  return upcoming.slice(0, 24);
}

export interface TempRange {
  min: number;
  max: number;
}

const value = (t: Temp, unit: Unit) => t[unit];

/** 3 günün genel min–max aralığı (seçili birimde). */
export function getOverallRange(days: DayForecast[], unit: Unit): TempRange | null {
  if (days.length === 0) return null;
  return {
    min: Math.min(...days.map((d) => value(d.minTemp, unit))),
    max: Math.max(...days.map((d) => value(d.maxTemp, unit))),
  };
}

export interface BarGeometry {
  /** 0–100: çubuğun sol kenarı */
  left: number;
  /** 0–100: çubuğun genişliği */
  width: number;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/** Günün min–max aralığını genel aralığa göre yüzde olarak konumlandırır. */
export function getBarGeometry(dayMin: number, dayMax: number, overall: TempRange): BarGeometry {
  const span = overall.max - overall.min;
  // Üç gün de aynı sıcaklıksa sıfıra bölme olmasın: tam genişlik
  if (span <= 0) return { left: 0, width: 100 };

  const left = clamp(((dayMin - overall.min) / span) * 100, 0, 100);
  const right = clamp(((dayMax - overall.min) / span) * 100, 0, 100);
  // Çok dar aralıklarda çubuk görünür kalsın
  const width = Math.max(right - left, 6);
  return { left: Math.min(left, 100 - width), width };
}

/** Anlık sıcaklığın çubuk içindeki konumu (0–100); aralık yoksa 50. */
export function getMarkerPosition(current: number, dayMin: number, dayMax: number): number {
  const span = dayMax - dayMin;
  if (span <= 0) return 50;
  return clamp(((current - dayMin) / span) * 100, 0, 100);
}
