import React from 'react'

import {getAllBikeStations} from './bikeHireApi'

it ('should get bike station data from api', () => {

    const stations = () => {
        return getAllBikeStations().then((stations) => {
            return stations;
        })
    }

    expect(stations.length).toEqual(772)
});
