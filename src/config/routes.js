import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../App'
import MapContainer from '../containers/mapContainer'

export default (
  <Route path="/" component={App}>
      <IndexRoute component={MapContainer} ></IndexRoute>

  </Route>
);
