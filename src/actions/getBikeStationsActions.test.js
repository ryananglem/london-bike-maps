import React from 'react';
import { requestAllBikeStations, receiveAllBikeStations, getAllBikeStationsError} from './getBikeStationsActions'


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
