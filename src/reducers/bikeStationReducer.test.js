import React from "react";
import bikeStationReducer from "./bikeStationReducer";
import {
  requestAllBikeStations,
  receiveAllBikeStations,
  getAllBikeStationsError,
  toggleBikeStationInfoWindow
} from "../actions/getBikeStationsActions";

const initialState = {
  isFetchingStations: false,
  error: "",
  stations: []
};

const bikeStation = {
  id: 1,
  name: "North Greenwich",
  coords: { lat: 51.5, lng: 0 },
  infoWindowIsOpen: true
};
const stations = [
  bikeStation,
  {
    id: 2,
    name: "King Edward Park",
    coords: { lat: 51.51, lng: -0.05 },
    infoWindowIsOpen: false
  }
];

it("requests all bike stations", () => {
  const action = requestAllBikeStations();

  const newState = bikeStationReducer(initialState, action);

  expect(newState.isFetchingStations).toEqual(true);
});

it("receives all bike stations", () => {
  const action = receiveAllBikeStations(stations);

  const newState = bikeStationReducer(initialState, action);

  expect(newState.isFetchingStations).toEqual(false);
  expect(newState.stations).toEqual(stations);
});

it("handles get bike stations error", () => {
  const error = "an error!";
  const action = getAllBikeStationsError(error);

  const newState = bikeStationReducer(initialState, action);

  expect(newState.isFetchingStations).toEqual(false);
  expect(newState.error).toEqual(error);
});

it("should toggle the infoWindowIsOpen flag for a bike station", () => {
  const action = toggleBikeStationInfoWindow(bikeStation);
  const stationsState = {
    isFetchingStations: false,
    stations: stations,
    error: ""
  };
  const newState = bikeStationReducer(stationsState, action);

  expect(newState.stations[0].infoWindowIsOpen).toEqual(false);
});
