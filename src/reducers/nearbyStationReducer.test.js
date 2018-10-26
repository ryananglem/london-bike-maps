import nearbyStationReducer  from './nearbyStationReducer';
import { requestNearbyBikeStations,
    receiveNearbyBikeStations,
    getNearbyBikeStationsError
} from '../actions/getNearestStations';

const initialState = {
    isFetchingStations:false,
    error:'',
    stations: []
};

const stations = [
    { id: 1, name:'North Greenwich', coords: { lat: 51.5, lng: 0 }, infoWindowIsOpen: true},
    { id: 2, name:'King Edward Park', coords: { lat: 51.51, lng: -0.05 }, infoWindowIsOpen: false}
];

it('requests nearby bike stations', () => {
    const action = requestNearbyBikeStations();

    const newState = nearbyStationReducer(initialState, action);

    expect(newState.isFetchingStations).toEqual(true);
});

it('receives nearby bike stations', () => {
    const action = receiveNearbyBikeStations(stations);

    const newState = nearbyStationReducer(initialState, action);

    expect(newState.isFetchingStations).toEqual(false);
    expect(newState.stations).toEqual(stations);
});

it('handles get nearby bike stations error', () => {
    const error = 'an error!';
    const action = getNearbyBikeStationsError(error);

    const newState = nearbyStationReducer(initialState, action);

    expect(newState.isFetchingStations).toEqual(false);
    expect(newState.error).toEqual(error);
});
