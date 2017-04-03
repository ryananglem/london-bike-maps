import { apiConfig } from './apiConfig'
import * as types from './actionTypes'
//import staticData from './static-data/staticData'

export const requestAllBikeStations = () => ({
    type: types.REQUEST_ALL_BIKE_STATIONS,
    isFetchingStations: true
});

export const receiveAllBikeStations = stations => ({
    type: types.RECEIVE_ALL_BIKE_STATIONS,
    isFetchingStations: false,
    stations
});

export const getAllBikeStationsError = error => ({
    type: types.GET_ALL_BIKE_STATIONS_ERROR,
    isFetchingStations: false,
    error
});

export const toggleBikeStationInfoWindow = bikeStation => {
    return {
        type: types.TOGGLE_BIKE_STATION_INFOWINDOW,
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
                    infoWindowIsOpen: false,
                    terminalName: getAdditionalPropertyValue(station.additionalProperties, 'TerminalName'),
                    bikes: getAdditionalPropertyValue(station.additionalProperties, 'NbBikes'),
                    spaces: getAdditionalPropertyValue(station.additionalProperties, 'NbEmptyDocks'),
                    totalDocks: getAdditionalPropertyValue(station.additionalProperties, 'NbDocks')
                });
            });
            dispatch(receiveAllBikeStations(stations))
        }).catch((err)=> {
            dispatch(getAllBikeStationsError(err.message));
        });
    }
};

function getAdditionalPropertyValue(properties, key)
{
    return properties.find(s => s.key===key).value;
}