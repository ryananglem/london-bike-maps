import staticData from './staticData';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock';
import {getAllBikeStations} from './bikeHireApi';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

import { apiConfig } from './apiConfig';

it('should get bike station data from api', async () => {
    process.env.REACT_APP_TFL_SERVICE_URL='https://api.tfl.gov.uk/';
    process.env.REACT_APP_TFL_APPLICATION_KEY='9bad5c1b4fa4a3971fe0f7b55ebd643b';
    process.env.REACT_APP_TFL_APPLICATION_ID='e9264262';
    fetchMock
        .mock(process.env.REACT_APP_TFL_SERVICE_URL + 'BikePoint' + apiConfig.apiKeyConfig, staticData);

    const stations = [
        {
        "coords": {
            "lat": 51.529163,
            "lng": -0.10997,
        },
        "id": "1",
        "name": "River Street , Clerkenwell",
        },
        {
            "coords": {
                "lat": 51.499606,
                "lng": -0.197574,
            },
            "id": "2",
            "name": "Phillimore Gardens, Kensington",
        }];

    const expectedActions = [
        { type: 'REQUEST_ALL_BIKE_STATIONS', isFetchingStations: true },
        { type: 'RECEIVE_ALL_BIKE_STATIONS', stations: stations, isFetchingStations: false  }
    ];
    const store = mockStore({ stations: [] });

    return await store.dispatch(getAllBikeStations())
        .then(() => { // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })

    });
