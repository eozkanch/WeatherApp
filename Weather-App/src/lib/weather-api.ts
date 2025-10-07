import axios from 'axios';

const API_KEY = "35555b2c72ac4a89bf1222251221705";

export interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
    tz_id: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
    air_quality?: {
      us_epa_index: number;
    };
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        daily_chance_of_rain: number;
        condition: {
          text: string;
          icon: string;
        };
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      }>;
    }>;
  };
}

export const fetchWeatherData = async (cityName: string): Promise<WeatherData> => {
  if (!cityName.trim()) {
    throw new Error('City name is required');
  }

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=3&aqi=yes&alerts=no`
    );
    return response.data;
  } catch (error: any) {
    // API hatasını kontrol et
    if (error.response) {
      // API yanıt verdi ama hata kodu döndü
      if (error.response.status === 400) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (error.response.status === 401) {
        throw new Error('API key is invalid. Please check your API key.');
      } else if (error.response.status === 403) {
        throw new Error('API key limit exceeded. Please try again later.');
      }
    } else if (error.request) {
      // İstek gönderildi ama yanıt alınamadı
      throw new Error('Network error. Please check your internet connection.');
    }
    
    // Genel hata mesajı
    throw new Error('An error occurred. Please try again.');
  }
};

// Gündüz mü gece mi kontrol et (localtime'a göre)
export const isDay = (localtime: string): boolean => {
  const hour = new Date(localtime).getHours();
  return hour >= 6 && hour < 20; // 6:00 - 20:00 arası gündüz
};

// Hava durumuna ve gündüz/gece durumuna göre arkaplan resmi döndür
export const getBackgroundImage = (condition: string, localtime: string): string => {
  if (!condition) {
    return isDay(localtime) ? '/bg-images/general-day.jpg' : '/bg-images/general-night.jpg';
  }
  
  const conditionLower = condition.toLowerCase();
  const isDaytime = isDay(localtime);
  
  // Clear / Sunny
  if (conditionLower.includes('clear')) {
    return isDaytime ? '/bg-images/clear-day.jpg' : '/bg-images/clear-night-sky.jpg';
  }
  
  if (conditionLower.includes('sunny')) {
    return '/bg-images/sunny.jpg';
  }
  
  // Cloudy
  if (conditionLower.includes('cloudy') && !conditionLower.includes('partly')) {
    return isDaytime ? '/bg-images/cloudy-day-sky.jpg' : '/bg-images/cloudy-night-sky.jpg';
  }
  
  // Overcast / Partly Cloudy
  if (conditionLower.includes('overcast') || conditionLower.includes('partly')) {
    return isDaytime ? '/bg-images/overcast-day.jpg' : '/bg-images/overcast-night.jpg';
  }
  
  // Rain / Drizzle
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return isDaytime ? '/bg-images/rainy-day.jpg' : '/bg-images/rainy-night.jpg';
  }
  
  // Snow
  if (conditionLower.includes('snow')) {
    return isDaytime ? '/bg-images/snow-day.jpg' : '/bg-images/snow-night.jpg';
  }
  
  // Storm / Thunder
  if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
    return isDaytime ? '/bg-images/storm-day.jpg' : '/bg-images/storm-night.jpg';
  }
  
  // Varsayılan
  return isDaytime ? '/bg-images/general-day.jpg' : '/bg-images/general-night.jpg';
};
