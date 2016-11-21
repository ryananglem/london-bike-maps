import { requestAllBikeStations, receiveAllBikeStations, getAllBikeStationsError} from '../actions/getBikeStationsActions'

//import { apiKeyConfig, header } from './apiConfig'
import stations  from './staticData';

const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const apiKeyConfig =
    '?app_id=' + process.env.REACT_APP_TFL_APPLICATION_ID.toString() + '&app_key=' + process.env.REACT_APP_TFL_APPLICATION_KEY.toString();

export function getAllBikeStations() {
    let config = {
        method: 'GET',
        headers: header
    }
    //console.log(config);
    //console.log(apiKeyConfig);
    const url = process.env.REACT_APP_TFL_SERVICE_URL + 'BikePoint' + apiKeyConfig;
    return (dispatch) => {
        dispatch(requestAllBikeStations());
        /*return fetch(url, config).then(function(response) {
            console.log('response');
            console.log(response);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(function(data) {
            console.log('got data');
            console.log(data);*/
            dispatch(receiveAllBikeStations(stations))
        /*}).catch(function(err) {
            dispatch(getAllBikeStationsError(err));
        });*/
    }
}
