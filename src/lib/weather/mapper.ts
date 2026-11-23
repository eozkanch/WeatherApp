import type {
  AirQuality,
  Condition,
  CurrentWeather,
  DayForecast,
  HourForecast,
  WeatherData,
} from './types';

/* ---- WeatherAPI ham yanıt tipleri (yalnızca kullandığımız alanlar) ---- */

interface RawCondition {
  text: string;
  icon: string;
  code: number;
}

interface RawAirQuality {
  co?: number;
  no2?: number;
  o3?: number;
  so2?: number;
  pm2_5?: number;
  pm10?: number;
  'us-epa-index'?: number;
}

interface RawHour {
  time: string;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  is_day: number;
  chance_of_rain: number;
  condition: RawCondition;
}

interface RawForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    daily_chance_of_rain: number;
    uv: number;
    condition: RawCondition;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moon_phase: string;
    moon_illumination: number | string;
  };
  hour: RawHour[];
}

export interface RawForecastResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    is_day: number;
    humidity: number;
    uv: number;
    wind_kph: number;
    wind_mph: number;
    wind_degree: number;
    wind_dir: string;
    gust_kph: number;
    gust_mph: number;
    condition: RawCondition;
    air_quality?: RawAirQuality;
  };
  forecast: { forecastday: RawForecastDay[] };
}

/* ---- Dönüştürücüler ---- */

const mapCondition = (c: RawCondition): Condition => ({
  text: c.text,
  code: c.code,
  icon: c.icon,
});

const mapAirQuality = (aq?: RawAirQuality): AirQuality | null => {
  // Bazı konumlarda air_quality boş obje gelebilir
  if (!aq || typeof aq['us-epa-index'] !== 'number') return null;
  return {
    usEpaIndex: aq['us-epa-index'],
    pm25: aq.pm2_5 ?? 0,
    pm10: aq.pm10 ?? 0,
    o3: aq.o3 ?? 0,
    no2: aq.no2 ?? 0,
    so2: aq.so2 ?? 0,
    co: aq.co ?? 0,
  };
};

const mapHour = (h: RawHour): HourForecast => ({
  time: h.time,
  // "YYYY-MM-DD HH:mm" -> HH (Date parse etmeden, cihaz saat diliminden bağımsız)
  hour: Number(h.time.slice(11, 13)),
  temp: { c: h.temp_c, f: h.temp_f },
  feelsLike: { c: h.feelslike_c, f: h.feelslike_f },
  chanceOfRain: h.chance_of_rain,
  isDay: h.is_day === 1,
  condition: mapCondition(h.condition),
});

const mapDay = (d: RawForecastDay): DayForecast => ({
  date: d.date,
  minTemp: { c: d.day.mintemp_c, f: d.day.mintemp_f },
  maxTemp: { c: d.day.maxtemp_c, f: d.day.maxtemp_f },
  chanceOfRain: d.day.daily_chance_of_rain,
  uv: d.day.uv,
  condition: mapCondition(d.day.condition),
  astro: {
    sunrise: d.astro.sunrise,
    sunset: d.astro.sunset,
    moonPhase: d.astro.moon_phase,
    moonIllumination: Number(d.astro.moon_illumination),
  },
  hours: d.hour.map(mapHour),
});

const mapCurrent = (c: RawForecastResponse['current']): CurrentWeather => ({
  temp: { c: c.temp_c, f: c.temp_f },
  feelsLike: { c: c.feelslike_c, f: c.feelslike_f },
  humidity: c.humidity,
  uv: c.uv,
  isDay: c.is_day === 1,
  condition: mapCondition(c.condition),
  wind: {
    kph: c.wind_kph,
    mph: c.wind_mph,
    degree: c.wind_degree,
    dir: c.wind_dir,
    gust: { kph: c.gust_kph, mph: c.gust_mph },
  },
  airQuality: mapAirQuality(c.air_quality),
});

export function mapForecastResponse(raw: RawForecastResponse): WeatherData {
  return {
    location: {
      name: raw.location.name,
      region: raw.location.region,
      country: raw.location.country,
      localtime: raw.location.localtime,
      tzId: raw.location.tz_id,
      lat: raw.location.lat,
      lon: raw.location.lon,
    },
    current: mapCurrent(raw.current),
    days: raw.forecast.forecastday.map(mapDay),
  };
}
