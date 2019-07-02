import * as types from "./actionTypes";
import {
  requestStationSearch,
  receiveStationSearch,
  noSearchTerm,
  noStationFound,
  stationSearch
} from "./searchActions";
import configureMockStore from "redux-mock-store";

import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it("should request search", () => {
  const searchText = "North";
  const expectedAction = {
    type: types.REQUEST_STATION_SEARCH,
    searchText: searchText,
    searchResults: null
  };
  expect(requestStationSearch(searchText)).toEqual(expectedAction);
});

it("should receive search results", () => {
  const expectedAction = {
    type: types.RECEIVE_STATION_SEARCH,
    searchResults: stations
  };
  expect(receiveStationSearch(stations)).toEqual(expectedAction);
});

it("should return no station found event", () => {
  const expectedAction = {
    type: types.NO_STATION_FOUND,
    searchResults: null
  };
  expect(noStationFound()).toEqual(expectedAction);
});

it("should return no search term event", () => {
  const expectedAction = {
    type: types.NO_SEARCH_TERM,
    searchResults: null
  };
  expect(noSearchTerm()).toEqual(expectedAction);
});

it("should return value present in list when searching for stations", () => {
  const searchText = "River Street , Clerkenwell";
  const expectedActions = [
    {
      type: types.REQUEST_STATION_SEARCH,
      searchText: searchText,
      searchResults: null
    },
    {
      type: types.RECEIVE_STATION_SEARCH,
      searchResults: {
        bikes: "1",
        coords: {
          lat: 51.529163,
          lng: -0.10997
        },
        id: "1",
        name: "River Street , Clerkenwell",
        infoWindowIsOpen: false,
        spaces: "18",
        terminalName: "001023",
        totalDocks: "19"
      }
    },
    {
      type: types.RECENTER_MAP,
      coords: { lat: 51.529163, lng: -0.10997 }
    },
    { isFetchingStations: true, type: "REQUEST_NEARBY_BIKE_STATIONS" }
  ];
  const store = mockStore({
    root: { bikeStation: { stations: stations } }
  });
  store.dispatch(stationSearch(searchText));
  expect(store.getActions()).toEqual(expectedActions);
});

it("should dispatch error when not item matching search during searching for stations", () => {
  const searchText = "Not here";
  const expectedActions = [
    {
      type: types.REQUEST_STATION_SEARCH,
      searchText: searchText,
      searchResults: null
    },
    { type: types.NO_STATION_FOUND, searchResults: null }
  ];
  const store = mockStore({
    root: { bikeStation: { stations: stations } }
  });
  store.dispatch(stationSearch(searchText));
  expect(store.getActions()).toEqual(expectedActions);
});

it("should dispatch error when no search term present during search for stations", () => {
  const searchText = "";
  const expectedActions = [{ type: types.NO_SEARCH_TERM, searchResults: null }];
  const store = mockStore({ root: { bikeStation: { stations: stations } } });
  store.dispatch(stationSearch(searchText));
  expect(store.getActions()).toEqual(expectedActions);
});

const stations = [
  {
    bikes: "1",
    coords: {
      lat: 51.529163,
      lng: -0.10997
    },
    id: "1",
    name: "River Street , Clerkenwell",
    infoWindowIsOpen: false,
    spaces: "18",
    terminalName: "001023",
    totalDocks: "19"
  },
  {
    bikes: "28",
    coords: {
      lat: 51.499606,
      lng: -0.197574
    },
    id: "2",
    name: "Phillimore Gardens, Kensington",
    infoWindowIsOpen: false,
    spaces: "8",
    terminalName: "001018",
    totalDocks: "37"
  }
];
