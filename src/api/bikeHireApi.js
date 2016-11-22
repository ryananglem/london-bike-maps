import { requestAllBikeStations, receiveAllBikeStations, getAllBikeStationsError} from '../actions/getBikeStationsActions'
import { apiConfig } from './apiConfig'

import staticData from './staticData'

export function getAllBikeStations() {
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
            //return response.json();
            return staticData;
        }).then((data) => {
            const stations = data.map(station => {
                return( {
                id: station.id.substring(station.id.indexOf("BikePoints_")+11, station.id.length),
                name: station.commonName,
                coords: {
                    lat: station.lat,
                    lng: station.lon
                },
              //  infoWindowIsOpen: false
                });
            });
            dispatch(receiveAllBikeStations(stations))
        }).catch((err)=> {
            dispatch(getAllBikeStationsError(err.message));
        });
    }
}
