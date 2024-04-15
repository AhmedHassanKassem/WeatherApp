export const SET_FORECAST = 'SET_FORECAST';

const initialState = [];

const forecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORECAST:
      return {...state, forecast: action.payload};
    default:
      return state;
  }
};

export default forecastReducer;
