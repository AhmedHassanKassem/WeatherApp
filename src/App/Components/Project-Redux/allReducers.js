import {combineReducers} from 'redux'
import weatherReducer from './Weather/WeatherReducer'
import forecastReducer from './Weather/ForecastReducer';
import airpollReducer from './Weather/AirPollReducer';
const appReducers = combineReducers({
  weather : weatherReducer,
  forecast : forecastReducer,
  airPoll : airpollReducer
})

export default appReducers;    