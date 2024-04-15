import { axiosInstance } from "../../../Instance/axios";
import toast from 'react-hot-toast';
import { SET_WEATHER } from "./WeatherReducer";
import { SET_FORECAST } from "./ForecastReducer";
import { SET_AIR_POLLUTION } from "./AirPollReducer";
const API_KEY = "236d682406b84fbc915c86a3879b4b13";

const fetchWeatherAndForecastDataAction = (country) => {
  return async (dispatch) => {
    let weatherResponse;
    let forecastResponse;
    try {
      // Fetch weather data
      const weatherData = await axiosInstance.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: country,
          appid: API_KEY,
        },
      });
      weatherResponse = weatherData.data;

      // Fetch forecast data
      const forecastData = await axiosInstance.get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          lat: weatherData.data.coord.lat,
          lon: weatherData.data.coord.lon,
          appid: API_KEY,
        },
      });
      forecastResponse = forecastData.data;

      // Fetch air pollution data
      const airPollutionData = await axiosInstance.get("https://api.openweathermap.org/data/2.5/air_pollution", {
        params: {
          lat: forecastData.data.city.coord.lat,
          lon: forecastData.data.city.coord.lon,
          appid: API_KEY,
        },
      });

      // Dispatch actions with the retrieved data
      dispatch({ type: SET_WEATHER, payload: weatherResponse });
      dispatch({ type: SET_FORECAST, payload: forecastResponse });
      dispatch({ type: SET_AIR_POLLUTION, payload: airPollutionData.data.list[0] });
      dispatch({ type: "CLEAR_SEARCH_QUERY" }); // Assuming this action clears the search query

    } catch (error) {
      console.log('Error fetching weather and forecast data:', error);
    }
  };
};

export default fetchWeatherAndForecastDataAction;
