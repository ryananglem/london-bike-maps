import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../App';
import MapContainer from '../containers/mapContainer';
import NearbyStations from '../containers/nearbyStations';

export default (
  <Route path="/" component={App}>
      <Route component={MapContainer} >
          <IndexRoute component={NearbyStations}></IndexRoute>
      </Route>

  </Route>
);
