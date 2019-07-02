import * as types from "./actionTypes";
import { recenterMap } from "./mapActions";
import { getNearbyBikeStations } from "./getNearestStations";

export const requestStationSearch = searchText => ({
  type: types.REQUEST_STATION_SEARCH,
  searchResults: null,
  searchText
});

export const receiveStationSearch = searchResults => ({
  type: types.RECEIVE_STATION_SEARCH,
  searchResults
});

export const noStationFound = () => ({
  type: types.NO_STATION_FOUND,
  searchResults: null
});

export const noSearchTerm = () => ({
  type: types.NO_SEARCH_TERM,
  searchResults: null
});

export const stationSearch = searchText => {
  return (dispatch, getState) => {
    if (searchText) {
      dispatch(requestStationSearch(searchText));
      const stations = getState().root.bikeStation.stations;
      let searchResults;
      if (isNaN(searchText)) {
        searchResults = stations.find(
          s => s.name.toLowerCase() === searchText.toLowerCase()
        );
      } else {
        searchResults = stations.find(s => s.terminalName === searchText);
      }

      if (searchResults === undefined) {
        dispatch(noStationFound());
      } else {
        dispatch(receiveStationSearch(searchResults));
        dispatch(recenterMap(searchResults.coords));
        dispatch(getNearbyBikeStations(searchResults.coords, 500));
      }
    } else {
      dispatch(noSearchTerm());
    }
  };
};
