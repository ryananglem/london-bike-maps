import { apiConfig } from './apiConfig'
//import staticData from './static-data/staticData'

export const requestAllBikeStations = () => ({
    type: "REQUEST_ALL_BIKE_STATIONS",
    isFetchingStations: true
});

export const receiveAllBikeStations = stations => ({
    type: "RECEIVE_ALL_BIKE_STATIONS",
    isFetchingStations: false,
    stations
});

export const getAllBikeStationsError = error => ({
    type: "GET_ALL_BIKE_STATIONS_ERROR",
    isFetchingStations: false,
    error
});

export const toggleBikeStationInfoWindow = bikeStation => {
    return {
        type: "TOGGLE_BIKE_STATION_INFOWINDOW",
        bikeStation
    }
};

export const getAllBikeStations = () => {
    let myHeaders = new Headers();
    let config = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: myHeaders
    };
    const url = process.env.REACT_APP_TFL_SERVICE_URL + 'BikePoint' + apiConfig.apiKeyConfig;
    return (dispatch) => {
        dispatch(requestAllBikeStations());
        return fetch(url, config).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            //return staticData;
            return response.json();
        }).then((data) => {
            const stations = data.map(station => {
                return( {
                    id: station.id.substring(station.id.indexOf("BikePoints_")+11, station.id.length),
                    name: station.commonName,
                    coords: {
                        lat: station.lat,
                        lng: station.lon
                    },
                    infoWindowIsOpen: false
                });
            });
            dispatch(receiveAllBikeStations(stations))
        }).catch((err)=> {
            dispatch(getAllBikeStationsError(err.message));
        });
    }
};