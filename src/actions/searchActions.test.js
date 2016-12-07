import {
    requestStationSearch,
    receiveStationSearch,
    noSearchTerm,
    noStationFound,
    stationSearch} from './searchActions'
import configureMockStore from 'redux-mock-store'

import thunk from 'redux-thunk'
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const stations = [
    { id: 1, name:'North Greenwich', coords: { lat: 51.5, lng: 0 }, infoWindowIsOpen: true},
    { id: 2, name:'King Edward Park', coords: { lat: 51.51, lng: -0.05 }, infoWindowIsOpen: false}
];

it('should request search', () => {

    const searchText = 'North';
    const expectedAction = {
        type: 'REQUEST_STATION_SEARCH',
        searchText: searchText,
        searchResults: []
    };
    expect(requestStationSearch(searchText)).toEqual(expectedAction);
});

it('should receive search results', () => {

    const expectedAction = {
        type: 'RECEIVE_STATION_SEARCH',
        searchResults: stations,
    };
    expect(receiveStationSearch(stations)).toEqual(expectedAction);
});

it('should return no station found event', () => {

    const expectedAction = {
        type: 'NO_STATION_FOUND',
        searchResults: [],
    };
    expect(noStationFound()).toEqual(expectedAction);
});

it('should return no search term event', () => {

    const expectedAction = {
        type: 'NO_SEARCH_TERM',
        searchResults: [],
    };
    expect(noSearchTerm()).toEqual(expectedAction);
});

it('should search for stations',() => {
/*
    const expectedActions = [
        { type: 'REQUEST_STATION_SEARCH', searchText: 'King' },
        { type: 'RECEIVE_STATION_SEARCH', searchResults: stations }
    ];
    const store = mockStore({ stations: [] });

    jest.mock(getState().rootReducer.bikeStationReducer.stations, () => { return stations });
    return store.dispatch(stationSearch('Kingz'))
        .then(() => {
            expect(store.getActions().toEqual(expectedActions))
        });
*/
});
