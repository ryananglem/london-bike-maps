import * as types from './actionTypes'
import { requestNearbyBikeStations,
    receiveNearbyBikeStations,
    getNearbyBikeStationsError,
    getNearbyBikeStations
} from './getNearestStations'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

jest.mock('../api/nearestStation.js')

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

it('should request and receive nearest bike station data from api', () => {

    const coords = { lat:51.529163 , lng:-0.10997 };
    const radius = 500;
    const expectedActions = [
        { type: types.REQUEST_NEARBY_BIKE_STATIONS, isFetchingStations: true },
        { type: types.RECEIVE_NEARBY_BIKE_STATIONS, stations: stations, isFetchingStations: false  }
    ];
    const store = mockStore({ stations: [] });
    const stationMock = require('../api/nearestStation').getNearbyStations.mockReturnValue(Promise.resolve(stations))

    return store.dispatch(getNearbyBikeStations(coords, radius))
        .then(() => { // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
})

it('should handle error from api', () => {

    const coords = { lat:51.529163 , lng:-0.10997 };
    const radius = 500;
    const expectedActions = [
        { type: types.REQUEST_NEARBY_BIKE_STATIONS, isFetchingStations: true },
        { type: types.GET_NEARBY_BIKE_STATIONS_ERROR, isFetchingStations: false, error: "error"  }
    ];
    const store = mockStore({ stations: [] });
    const stationMock = require('../api/nearestStation').getNearbyStations.mockReturnValue(Promise.reject({ message: 'error'}))

    return store.dispatch(getNearbyBikeStations(coords, radius))
        .then(() => { // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
})



const stations = [{
    "bikes": "15",
    "coords": {"lat": 51.506451, "lng": -0.170279},
    "distance": 53.784502205714475,
    "id": "248",
    "infoWindowIsOpen": false,
    "name": "Triangle Car Park, Hyde Park",
    "spaces": "10",
    "terminalName": "001088",
    "totalDocks": "27"
}, {
    "bikes": "6",
    "coords": {"lat": 51.505013, "lng": -0.172729},
    "distance": 218.63885813128283,
    "id": "300",
    "infoWindowIsOpen": false,
    "name": "Serpentine Car Park, Hyde Park",
    "spaces": "10",
    "terminalName": "001217",
    "totalDocks": "16"
}];

it('should request nearest stations', () => {

    const expectedAction = {
        type: types.REQUEST_NEARBY_BIKE_STATIONS,
        isFetchingStations: true
    };
    expect(requestNearbyBikeStations()).toEqual(expectedAction);
});

it('should receive nearby stations', () => {
    const stations = [
        { id: 1, name:'North Greenwich', coords: { lat: 51.5, lng: 0 }},
        { id: 2, name:'King Edward Park', coords: { lat: 51.51, lng: -0.05 }}
    ];
    const expectedAction = {
        type: types.RECEIVE_NEARBY_BIKE_STATIONS,
        isFetchingStations: false,
        stations
    };
    expect(receiveNearbyBikeStations(stations)).toEqual(expectedAction);
});

it('should handle error getting nearby stations', () => {
    const error = 'error!!';
    const expectedAction = {
        type: types.GET_NEARBY_BIKE_STATIONS_ERROR,
        isFetchingStations: false,
        error
    };
    expect(getNearbyBikeStationsError(error)).toEqual(expectedAction);
});
