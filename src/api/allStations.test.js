import staticData from './static-data/staticData';
import fetchMock from 'fetch-mock';
import { getAllStations} from './allStations'
import { apiConfig } from './apiConfig';

it('should get bike station data from api', () => {
    process.env.REACT_APP_TFL_SERVICE_URL='https://api.tfl.gov.uk/';
    process.env.REACT_APP_TFL_APPLICATION_KEY='9bad5c1b4fa4a3971fe0f7b55ebd643b';
    process.env.REACT_APP_TFL_APPLICATION_ID='e9264262';
    fetchMock
        .mock(process.env.REACT_APP_TFL_SERVICE_URL + 'BikePoint' + apiConfig.apiKeyConfig, staticData);

    getAllStations()
        .then((data) => { // return of async actions
            expect(data).toEqual(stations)
        })

});
const stations = [
    {
        "bikes": "1",
        "coords": {
            "lat": 51.529163,
            "lng": -0.10997,
        },
        "id": "1",
        "name": "River Street , Clerkenwell",
        "infoWindowIsOpen": false,
        "spaces": "18",
        "terminalName": "001023",
        "totalDocks": "19",
    },
    {
        "bikes": "28",
        "coords": {
            "lat": 51.499606,
            "lng": -0.197574,
        },
        "id": "2",
        "name": "Phillimore Gardens, Kensington",
        "infoWindowIsOpen": false,
        "spaces": "8",
        "terminalName": "001018",
        "totalDocks": "37",
    }];
