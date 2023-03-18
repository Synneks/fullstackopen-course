import axios from 'redaxios';

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  main: {
    feels_like: string;
    temp: string;
  };
  weather: Weather[];
}

const getWeatherInfo = (capital: string) =>
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    )
    .then((res) => res.data);

export default getWeatherInfo;
