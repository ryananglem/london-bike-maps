import * as types from './actionTypes'
import { apiConfig } from './apiConfig'
//import nearestStationStaticData from './static-data/nearestStationStaticData';

export const requestNearbyBikeStations = () => ({
    type: types.REQUEST_NEARBY_BIKE_STATIONS,
    isFetchingStations: true
});

export const receiveNearbyBikeStations = stations => ({
    type: types.RECEIVE_NEARBY_BIKE_STATIONS,
    isFetchingStations: false,
    stations
});

export const getNearbyBikeStationsError = error => ({
    type: types.GET_NEARBY_BIKE_STATIONS_ERROR,
    isFetchingStations: false,
    error
});

export const getNearbyBikeStations = (coords, radius) => {
    let myHeaders = new Headers();
    let config = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: myHeaders
    };
    const url = encodeURI(process.env.REACT_APP_TFL_SERVICE_URL
        + 'BikePoint'
        + apiConfig.apiKeyConfig
        + '&lat=' + coords.lat.toString() + '&lon=' + coords.lng.toString() +'&radius=' + radius.toString());

    return (dispatch) => {
        dispatch(requestNearbyBikeStations());

        return fetch(url, config).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
            //return nearestStationStaticData;

        }).then((data) => {
            const stations = data.places.map(station => {
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
                    totalDocks: getAdditionalPropertyValue(station.additionalProperties, 'NbDocks'),
                    distance: station.distance
                });
            });
            dispatch(receiveNearbyBikeStations(stations))
        }).catch((err)=> {
            dispatch(getNearbyBikeStationsError(err.message));
        });
    }
};

function getAdditionalPropertyValue(properties, key)
{
    return properties.find(s => s.key===key).value;
}
