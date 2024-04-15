export const SET_AIR_POLLUTION = 'SET_AIR_POLLUTION';

const initialState = [];

const airpollReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AIR_POLLUTION:
      return {...state, airPoll: action.payload};
    default:
      return state;
  }
};

export default airpollReducer;