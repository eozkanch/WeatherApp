// Uygulamanın kendi (normalize edilmiş) veri modeli.
// Bileşenler ham WeatherAPI alanlarını görmez; her ölçü C/F (veya kph/mph) çifti olarak gelir,
// böylece birim değişimi için dönüşüm hesabı gerekmez.

export type Unit = 'c' | 'f';

export interface Temp {
  c: number;
  f: number;
}

export interface Speed {
  kph: number;
  mph: number;
}

export interface Condition {
  text: string;
  code: number;
  icon: string;
}

export interface AirQuality {
  /** US EPA indeksi: 1 (iyi) – 6 (tehlikeli) */
  usEpaIndex: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
}

export interface HourForecast {
  /** "YYYY-MM-DD HH:mm" – şehrin yerel saati */
  time: string;
  /** 0–23, şehrin yerel saati */
  hour: number;
  temp: Temp;
  feelsLike: Temp;
  chanceOfRain: number;
  isDay: boolean;
  condition: Condition;
}

export interface Astro {
  /** API'den geldiği gibi: "06:12 AM" */
  sunrise: string;
  sunset: string;
  moonPhase: string;
  moonIllumination: number;
}

export interface DayForecast {
  /** "YYYY-MM-DD" */
  date: string;
  minTemp: Temp;
  maxTemp: Temp;
  chanceOfRain: number;
  uv: number;
  condition: Condition;
  astro: Astro;
  hours: HourForecast[];
}

export interface CurrentWeather {
  temp: Temp;
  feelsLike: Temp;
  humidity: number;
  uv: number;
  isDay: boolean;
  condition: Condition;
  wind: Speed & {
    degree: number;
    dir: string;
    gust: Speed;
  };
  airQuality: AirQuality | null;
}

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    /** "YYYY-MM-DD HH:mm" – şehrin yerel saati */
    localtime: string;
    tzId: string;
    lat: number;
    lon: number;
  };
  current: CurrentWeather;
  days: DayForecast[];
}

/** Route Handler hata gövdesi */
export interface WeatherErrorBody {
  error: 'invalid_query' | 'not_found' | 'rate_limited' | 'server_misconfigured' | 'upstream_error';
  message: string;
}
