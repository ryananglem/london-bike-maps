import { apiConfig } from './apiConfig'

const getAdditionalPropertyValue=(properties, key)=> {
    return properties.find(s => s.key===key).value;
}

export const getNearbyStations = (coords, radius) => {
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

    return fetch(url, config).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();

    }).then((data) => {
        return data.places.map(station => {
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
    })
};

