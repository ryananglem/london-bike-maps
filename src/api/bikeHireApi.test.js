import React from 'react'

import {getAllBikeStations} from './bikeHireApi'

it ('should get bike station data from api', () => {

    const stations = getAllBikeStations();

    console.log(stations);

});
