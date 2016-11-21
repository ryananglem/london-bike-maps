
const initialState = {
    isFetchingStations:false,
    stations: [],
    error:''
};

const bikeStationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_ALL_BIKE_STATIONS':
            return {
                isFetchingStations: true
            };
        case 'RECEIVE_ALL_BIKE_STATIONS':
            return {
                isFetchingStations: false,
                stations: action.stations,
                error: ''
            };
        case 'GET_ALL_BIKE_STATIONS_ERROR':
            return {
                isFetchingStations: false,
                error: action.error
            };
        default:
            return state;
    }
}
export default bikeStationReducer;