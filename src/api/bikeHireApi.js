import { requestAllBikeStations, receiveAllBikeStations, getAllBikeStationsError} from '../actions/getBikeStationsActions'

import { apiConfig } from './apiConfig'
//import stations  from './staticData';

export function getAllBikeStations() {
    let myHeaders = new Headers();
    let config = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: myHeaders
    }
    const url = process.env.REACT_APP_TFL_SERVICE_URL + 'BikePoint' + apiConfig.apiKeyConfig;
    return (dispatch) => {
        dispatch(requestAllBikeStations());
        return fetch(url, config).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then((data) => {
            dispatch(receiveAllBikeStations(data))
        }).catch((err)=> {
            dispatch(getAllBikeStationsError(err));
        });
    }
}
