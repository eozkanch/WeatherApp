'use client';

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';
import type { Speed, Temp, Unit } from '@/lib/weather/types';

const STORAGE_KEY = 'weather-unit';

interface UnitContextValue {
  unit: Unit;
  setUnit: (unit: Unit) => void;
  toggleUnit: () => void;
  /** Yuvarlanmış sayı (ör. 7) */
  temp: (t: Temp) => number;
  /** Derece işaretli metin (ör. "7°") */
  formatTemp: (t: Temp) => string;
  /** Hız ve birim (ör. "12 km/h" / "7 mph") */
  formatSpeed: (s: Speed) => string;
}

const UnitContext = createContext<UnitContextValue | null>(null);

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('storage', listener); // başka sekmede değişirse
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function readUnit(): Unit {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'f' ? 'f' : 'c';
  } catch {
    return 'c'; // localStorage erişilemezse varsayılan
  }
}

const readServerUnit = (): Unit => 'c';

export function UnitProvider({ children }: { children: React.ReactNode }) {
  // Sunucu ve ilk istemci render'ı 'c' kullanır (hydration uyumu); sonra kayıtlı tercih okunur.
  const unit = useSyncExternalStore(subscribe, readUnit, readServerUnit);

  const setUnit = useCallback((next: Unit) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // yoksay
    }
    listeners.forEach((notify) => notify());
  }, []);

  const value = useMemo<UnitContextValue>(() => {
    const temp = (t: Temp) => Math.round(unit === 'c' ? t.c : t.f);
    return {
      unit,
      setUnit,
      toggleUnit: () => setUnit(unit === 'c' ? 'f' : 'c'),
      temp,
      formatTemp: (t) => `${temp(t)}°`,
      formatSpeed: (s) => (unit === 'c' ? `${Math.round(s.kph)} km/h` : `${Math.round(s.mph)} mph`),
    };
  }, [unit, setUnit]);

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}

export function useUnit(): UnitContextValue {
  const ctx = useContext(UnitContext);
  if (!ctx) throw new Error('useUnit must be used within <UnitProvider>');
  return ctx;
}
