import * as types from "../actions/actionTypes";
const initialState = {
  isFetchingStations: false,
  stations: [],
  error: ""
};

const nearbyStationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_NEARBY_BIKE_STATIONS:
      return {
        isFetchingStations: true
      };
    case types.RECEIVE_NEARBY_BIKE_STATIONS:
      return {
        isFetchingStations: false,
        stations: action.stations
      };
    case types.GET_NEARBY_BIKE_STATIONS_ERROR:
      return {
        isFetchingStations: false,
        error: action.error
      };
    default:
      return state;
  }
};
export default nearbyStationReducer;
