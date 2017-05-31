import { apiConfig } from './apiConfig'


const getAdditionalPropertyValue = (properties, key) => {
    return properties.find(s => s.key===key).value;
}

export const getAllStations = () => {
    let myHeaders = new Headers();
    let config = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: myHeaders
    };
    const url = process.env.REACT_APP_TFL_SERVICE_URL + 'BikePoint' + apiConfig.apiKeyConfig;

    return fetch(url, config).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }).then((data) => {
        return data.map(station => {
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
    })
}
