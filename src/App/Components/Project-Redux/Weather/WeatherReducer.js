export const SET_WEATHER = 'SET_WEATHER';
export const SET_FORECAST = 'SET_FORECAST';
export const SET_AIR_POLLUTION = 'SET_AIR_POLLUTION';

const initialState = {
  weather: null,
  forecast: null,
  airPollution: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WEATHER:
      return {
        ...state,
        weather: action.payload,
      };
    case SET_FORECAST:
      return {
        ...state,
        forecast: action.payload,
      };
    case SET_AIR_POLLUTION:
      return {
        ...state,
        airPollution: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
