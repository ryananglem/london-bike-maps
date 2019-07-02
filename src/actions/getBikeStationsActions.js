import { getAllStations } from "../api/allStations";
import * as types from "./actionTypes";

export const requestAllBikeStations = () => ({
  type: types.REQUEST_ALL_BIKE_STATIONS,
  isFetchingStations: true
});

export const receiveAllBikeStations = stations => ({
  type: types.RECEIVE_ALL_BIKE_STATIONS,
  isFetchingStations: false,
  stations
});

export const getAllBikeStationsError = error => ({
  type: types.GET_ALL_BIKE_STATIONS_ERROR,
  isFetchingStations: false,
  error
});

export const toggleBikeStationInfoWindow = bikeStation => {
  return {
    type: types.TOGGLE_BIKE_STATION_INFOWINDOW,
    bikeStation
  };
};

export const getAllBikeStations = () => {
  return dispatch => {
    dispatch(requestAllBikeStations());
    return getAllStations()
      .then(stationData => {
        dispatch(receiveAllBikeStations(stationData));
      })
      .catch(err => {
        dispatch(getAllBikeStationsError(err.message));
      });
  };
};
