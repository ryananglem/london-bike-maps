import staticData from './static-data/nearestStationStaticData'
import fetchMock from 'fetch-mock'
import { getNearbyStations } from './nearestStation'
import { apiConfig } from './apiConfig'

it('should get nearest bike station data from api', () => {
    process.env.REACT_APP_TFL_SERVICE_URL = 'https://api.tfl.gov.uk/'
    process.env.REACT_APP_TFL_APPLICATION_KEY =
        '9bad5c1b4fa4a3971fe0f7b55ebd643b'
    process.env.REACT_APP_TFL_APPLICATION_ID = 'e9264262'
    const coords = { lat: 51.529163, lng: -0.10997 }
    const radius = 500

    fetchMock.mock(
        process.env.REACT_APP_TFL_SERVICE_URL +
            'BikePoint' +
            apiConfig.apiKeyConfig +
            '&lat=' +
            coords.lat.toString() +
            '&lon=' +
            coords.lng.toString() +
            '&radius=' +
            radius.toString(),
        staticData
    )

    getNearbyStations(coords, radius).then(data => {
        // return of async actions
        expect(data).toEqual(stations)
    })
})

const stations = [
    {
        bikes: '15',
        coords: { lat: 51.506451, lng: -0.170279 },
        distance: 53.784502205714475,
        id: '248',
        infoWindowIsOpen: false,
        name: 'Triangle Car Park, Hyde Park',
        spaces: '10',
        terminalName: '001088',
        totalDocks: '27',
    },
    {
        bikes: '6',
        coords: { lat: 51.505013, lng: -0.172729 },
        distance: 218.63885813128283,
        id: '300',
        infoWindowIsOpen: false,
        name: 'Serpentine Car Park, Hyde Park',
        spaces: '10',
        terminalName: '001217',
        totalDocks: '16',
    },
]
