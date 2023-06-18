Check out the [Weather App](https://weather-app-eozkanch.vercel.app/) for real-time weather information.


<img src="/Weather-App/src/images/project_img_1.jpeg" witdth ="400px">


This React component fetches weather data from the WeatherAPI and country data from the Rest Countries API. It provides the following functionalities:


<img src="/login-app/public/images/login.jpeg" witdth ="400px">


1. Current Weather Display: The component shows the current weather condition based on the fetched data from the WeatherAPI. It dynamically sets the background image according to the weather condition.

2. City Search: Users can enter a specific city name in the search input. Upon submission, the component fetches weather data for the entered city using the WeatherAPI.

3. Country Flag Display: The component displays the flag of the country based on the weather data. It retrieves the flag URL from the Rest Countries API using the country name obtained from the weather data.

4. Time-based Icon: The component determines the local time of the city and displays an appropriate icon indicating whether it is evening or day. If the current hour is between 18:00 and 06:00, it shows a moon and stars icon; otherwise, it shows a sun icon.

The component utilizes the `axios` library for making HTTP requests and leverages React hooks such as `useState` and `useEffect` for managing state and performing side effects. It also incorporates conditional logic to handle different weather conditions and time-based icon rendering.

Please note that for the component to function correctly, you need to ensure that the required environment variable (`REACT_APP_GHOST_API_KEY`) is properly set with the WeatherAPI key in your development or deployment environment.


# WeatherApp
