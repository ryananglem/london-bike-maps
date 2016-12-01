import React from 'react';
import { getAllBikeStations,
        requestAllBikeStations,
        receiveAllBikeStations,
        getAllBikeStationsError,
        toggleBikeStationInfoWindow
        } from './getBikeStationsActions'

import staticData from './static-data/staticData';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock';

import { apiConfig } from './apiConfig';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

it('should get bike station data from api', () => {
    process.env.REACT_APP_TFL_SERVICE_URL='https://api.tfl.gov.uk/';
    process.env.REACT_APP_TFL_APPLICATION_KEY='9bad5c1b4fa4a3971fe0f7b55ebd643b';
    process.env.REACT_APP_TFL_APPLICATION_ID='e9264262';
    fetchMock
        .mock(process.env.REACT_APP_TFL_SERVICE_URL + 'BikePoint' + apiConfig.apiKeyConfig, staticData);

    const expectedActions = [
        { type: 'REQUEST_ALL_BIKE_STATIONS', isFetchingStations: true },
        { type: 'RECEIVE_ALL_BIKE_STATIONS', stations: stations, isFetchingStations: false  }
    ];
    const store = mockStore({ stations: [] });

    return store.dispatch(getAllBikeStations())
        .then(() => { // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })

});

const stations = [
    {
        "bikes": "1",
        "coords": {
            "lat": 51.529163,
            "lng": -0.10997,
        },
        "id": "1",
        "name": "River Street , Clerkenwell",
        "infoWindowIsOpen": false,
        "spaces": "18",
        "terminalName": "001023",
        "totalDocks": "19",
    },
    {
        "bikes": "28",
        "coords": {
            "lat": 51.499606,
            "lng": -0.197574,
        },
        "id": "2",
        "name": "Phillimore Gardens, Kensington",
        "infoWindowIsOpen": false,
        "spaces": "8",
        "terminalName": "001018",
        "totalDocks": "37",
    }];

it('should request all stations', () => {

    const expectedAction = {
        type: 'REQUEST_ALL_BIKE_STATIONS',
        isFetchingStations: true
    };
    expect(requestAllBikeStations()).toEqual(expectedAction);
});

it('should receive all stations', () => {
    const stations = [
        { id: 1, name:'North Greenwich', coords: { lat: 51.5, lng: 0 }},
        { id: 2, name:'King Edward Park', coords: { lat: 51.51, lng: -0.05 }}
    ];
    const expectedAction = {
        type: 'RECEIVE_ALL_BIKE_STATIONS',
        isFetchingStations: false,
        stations
    };
    expect(receiveAllBikeStations(stations)).toEqual(expectedAction);
});

it('should handle error getting all stations', () => {
    const error = 'error!!';
    const expectedAction = {
        type: 'GET_ALL_BIKE_STATIONS_ERROR',
        isFetchingStations: false,
        error
    };
    expect(getAllBikeStationsError(error)).toEqual(expectedAction);
});

it('should toggle infowindow display attribute', () => {
    const bikeStation =  { id: 1, name:'North Greenwich', coords: { lat: 51.5, lng: 0 }, infoWindowIsOpen: true };
    const expectedAction = {
        type: 'TOGGLE_BIKE_STATION_INFOWINDOW',
        bikeStation: bikeStation
    };
    expect(toggleBikeStationInfoWindow(bikeStation)).toEqual(expectedAction);
})