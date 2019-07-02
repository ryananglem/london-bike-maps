import React from 'react'
import { Route } from 'react-router'

import App from '../App'
import MapContainer from '../containers/mapContainer'
import About from '../containers/aboutContainer'

export default (
    <App>
        <Route exact path={'/'} component={MapContainer} />
        <Route path={'/about'} component={About} />
    </App>
)
