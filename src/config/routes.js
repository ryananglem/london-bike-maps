import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../App';
import MapContainer from '../containers/mapContainer';
import NearbyStations from '../containers/nearbyStations';
import About from '../containers/aboutContainer';

export default (
  <Route path="/" component={App}>
      <Route component={MapContainer} >
          <IndexRoute component={NearbyStations}></IndexRoute>
      </Route>
      <Route path="about" component={About} />
  </Route>
);
