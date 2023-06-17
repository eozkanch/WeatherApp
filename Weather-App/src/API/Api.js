import axios from 'axios';
import { useEffect, useState } from 'react';
import CurrentDay from '../components/CurrentDay';
import { BsMoonStars, BsSearch } from 'react-icons/bs';
import { FaSun } from 'react-icons/fa';
import { BgImages } from '../components/BgImages';
import { Spinner } from 'react-bootstrap';

const Api = () => {
  const apiKey = process.env.REACT_APP_GHOST_API_KEY;

  const [data, setData] = useState({});
  const [search, setSearch] = useState('');
  const [value, setValue] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCountryFlag, setShowCountryFlag] = useState(false);
  const [flagUrl, setFlagUrl] = useState('');
  const [isEvening, setIsEvening] = useState(false);
  const [cityTime, setCityTime] = useState('');

  useEffect(() => {
    // Fetch weather data from the API
    async function getApi() {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${search}&days=3&aqi=yes&alerts=no`
        );
        setData(response.data);
        console.log(response.data);
        const city = response.data?.location?.tz_id.split('/')[1];
        getCityTime(city, response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (search !== '') {
      getApi();
    }
  }, [search, apiKey]);

  const getCityTime = (city, data) => {
    // Calculate city time and check if it's evening
    const cityTime = data?.location?.localtime;
    const currentHour = new Date(cityTime).getHours();
    const isEveningTime = currentHour >= 18 || currentHour <= 6;
    setIsEvening(isEveningTime);
    setCityTime(cityTime);
    console.log(isEveningTime);
  };

  useEffect(() => {
    // Fetch country data from the API
    async function getCountryData() {
      setLoading(true);
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountryData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getCountryData();
  }, []);

  useEffect(() => {
    // Get country flag based on weather data
    const getCountryFlag = (country) => {
      // Find the flag URL for the given country
      if (country && countryData.length > 0) {
        const countryInfo = countryData.find((item) => item.name.common === country);
        return countryInfo ? countryInfo.flags.svg : '';
      }
      return '';
    };

    const country = data?.location?.country;
    const countryFlag = getCountryFlag(country);
    setShowCountryFlag(!!countryFlag);
    setFlagUrl(countryFlag);
  }, [data, countryData]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearch(value);
  };

  const condition = data?.current?.condition?.text;
  const conditionStyle = {
    background:
      condition === 'Sunny'
        ? `url(${BgImages.sunny})`
        : condition === 'Clear'
        ? `url(${BgImages.clear})`
        : condition === 'Cloudy' ||
          condition === 'Partly cloudy' ||
          condition === 'Heavy cloudy'
        ? `url(${BgImages.cloudy})`
        : condition === 'Light rain shower' ||
          condition === 'Patchy rain possible' ||
          condition === 'Moderate rain' ||
          condition === 'Patchy light drizzle' ||
          condition === 'Light drizzle' ||
          condition === 'Moderate or heavy rain shower' ||
          condition === 'Thundery outbreaks possible' ||
          condition === 'Moderate or heavy rain with thunder' ||
          condition === 'Light rain' ||
          condition === 'Patchy light rain with thunder'
        ? `url(${BgImages.rain})`
        : condition === 'Storm' || condition === 'Heavy rain at times'
        ? `url(${BgImages.storm})`
        : condition === 'Snowstorm' ||
          condition === 'Irregular light snow' ||
          condition === 'Light snow' ||
          condition === 'Medium heavy snow' ||
          condition === 'Thick with snow'
        ? `url(${BgImages.snow})`
        : condition === 'Mist' || condition === 'Overcast' || condition === 'Fog'
        ? `url(${BgImages.overcast})`
        : `url(${BgImages.general})`,
  };

  return (
    <div className="api" style={{ background: conditionStyle.background }}>
      <form onSubmit={onSubmit}>
        <div className="search-cont">
          {showCountryFlag && <img className="flag-animation" src={flagUrl} alt="Country Flag" />}
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type="text"
            className="search-input"
            placeholder="Please enter a city name..."
          />
          <button type="submit" className="search-btn">
            {' '}
            <BsSearch size={30} />{' '}
          </button>

          {showCountryFlag && (
            <div className={`icon-wrapper ${isEvening ? 'evening' : ''}`}>
              {isEvening ? (
                <BsMoonStars color="white" size={60} />
              ) : (
                <FaSun color="yellow" size={60} />
              )}
            </div>
          )}
        </div>
      </form>

      {loading ? (
        <Spinner animation="grow" />
      ) : (
        <>
          {Object.entries(data).length !== 0 && <CurrentDay data={data} cityTime={cityTime} />}
        </>
      )}
    </div>
  );
};

export default Api;
