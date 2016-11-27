const initialState = {
    isFetchingStations:false,
    stations: [],
    error:''
};

const bikeStation = (state, action) => {
    switch(action.type) {
        case 'TOGGLE_BIKE_STATION_INFOWINDOW':
            if (state.id !== action.bikeStation.id) {
                return state;
            }
            return {
                    ...state, infoWindowIsOpen: !state.infoWindowIsOpen
            }
        default:
            return state;
    }
}

const bikeStationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_ALL_BIKE_STATIONS':
            return {
                isFetchingStations: true
            };
        case 'RECEIVE_ALL_BIKE_STATIONS':
            return {
                isFetchingStations:  false ,
                stations: action.stations
            };
        case 'GET_ALL_BIKE_STATIONS_ERROR':
            return {
                isFetchingStations: false ,
                error: action.error
            };
        case 'TOGGLE_BIKE_STATION_INFOWINDOW':{
            return {stations: state.stations.map(station => bikeStation(station, action))};
        }
        default:
            return state;
    }
};
export default bikeStationReducer;