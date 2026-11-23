import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudMoon,
  CloudMoonRain,
  CloudRain,
  CloudSnow,
  CloudSun,
  CloudSunRain,
  Moon,
  Sun,
} from 'lucide-react';

type IconComponent = typeof Sun;
interface IconPair {
  day: IconComponent;
  night: IconComponent;
}

const both = (icon: IconComponent): IconPair => ({ day: icon, night: icon });

const CLEAR: IconPair = { day: Sun, night: Moon };
const PARTLY_CLOUDY: IconPair = { day: CloudSun, night: CloudMoon };
const CLOUDY = both(Cloud);
const FOG = both(CloudFog);
const DRIZZLE = both(CloudDrizzle);
const RAIN_POSSIBLE: IconPair = { day: CloudSunRain, night: CloudMoonRain };
const RAIN = both(CloudRain);
const SNOW = both(CloudSnow);
const ICE = both(CloudHail);
const THUNDER = both(CloudLightning);

/** WeatherAPI condition.code -> ikon. https://www.weatherapi.com/docs/weather_conditions.json */
const ICONS_BY_CODE: Record<number, IconPair> = {
  1000: CLEAR,
  1003: PARTLY_CLOUDY,
  1006: CLOUDY, // Cloudy
  1009: CLOUDY, // Overcast
  1012: FOG, // Haze
  1015: FOG, // Dust haze
  1018: FOG, // Blowing dust
  1021: FOG, // Dust storm
  1024: FOG, // Sandstorm
  1027: FOG, // Severe sandstorm
  1030: FOG, // Mist
  1033: FOG, // Smoke
  1036: FOG, // Smoky haze
  1039: FOG, // Smog
  1042: FOG, // Severe smog
  1045: FOG, // Saharan dust
  1048: FOG, // Dust
  1135: FOG, // Fog
  1147: FOG, // Freezing fog
  1063: RAIN_POSSIBLE, // Patchy rain possible
  1072: DRIZZLE, // Patchy freezing drizzle possible
  1150: DRIZZLE,
  1153: DRIZZLE,
  1168: DRIZZLE, // Freezing drizzle
  1171: DRIZZLE, // Heavy freezing drizzle
  1180: RAIN,
  1183: RAIN,
  1186: RAIN,
  1189: RAIN,
  1192: RAIN,
  1195: RAIN,
  1198: RAIN, // Light freezing rain
  1201: RAIN, // Moderate or heavy freezing rain
  1240: RAIN, // Light rain shower
  1243: RAIN,
  1246: RAIN,
  1066: SNOW, // Patchy snow possible
  1069: SNOW, // Patchy sleet possible
  1114: SNOW, // Blowing snow
  1117: SNOW, // Blizzard
  1204: SNOW, // Light sleet
  1207: SNOW,
  1210: SNOW,
  1213: SNOW,
  1216: SNOW,
  1219: SNOW,
  1222: SNOW,
  1225: SNOW,
  1249: SNOW, // Light sleet showers
  1252: SNOW,
  1255: SNOW, // Light snow showers
  1258: SNOW,
  1237: ICE, // Ice pellets
  1261: ICE, // Light showers of ice pellets
  1264: ICE,
  1087: THUNDER, // Thundery outbreaks possible
  1273: THUNDER,
  1276: THUNDER,
  1279: THUNDER,
  1282: THUNDER,
};

interface WeatherIconProps {
  /** WeatherAPI condition.code */
  code: number;
  /** Gündüz mü? (güneş/ay ikonları için); varsayılan gündüz */
  isDay?: boolean;
  className?: string;
}

export default function WeatherIcon({ code, isDay = true, className }: WeatherIconProps) {
  const pair = ICONS_BY_CODE[code] ?? CLOUDY; // bilinmeyen kod: nötr bulut
  const Icon = isDay ? pair.day : pair.night;
  return <Icon className={className} aria-hidden="true" />;
}
