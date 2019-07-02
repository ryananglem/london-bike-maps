import * as types from "./actionTypes";
import { getNearbyStations } from "../api/nearestStation";

//import nearestStationStaticData from './static-data/nearestStationStaticData';

export const requestNearbyBikeStations = () => ({
  type: types.REQUEST_NEARBY_BIKE_STATIONS,
  isFetchingStations: true
});

export const receiveNearbyBikeStations = stations => ({
  type: types.RECEIVE_NEARBY_BIKE_STATIONS,
  isFetchingStations: false,
  stations
});

export const getNearbyBikeStationsError = error => ({
  type: types.GET_NEARBY_BIKE_STATIONS_ERROR,
  isFetchingStations: false,
  error
});

export const getNearbyBikeStations = (coords, radius) => {
  return dispatch => {
    dispatch(requestNearbyBikeStations());

    return getNearbyStations(coords, radius)
      .then(stations => {
        dispatch(receiveNearbyBikeStations(stations));
      })
      .catch(err => {
        dispatch(getNearbyBikeStationsError(err.message));
      });
  };
};
