import React from "react";
import { Route } from "react-router";
import { isLocalhost } from "./getServiceUrls";

import App from "../App";
import MapContainer from "../containers/mapContainer";
import About from "../containers/aboutContainer";

const routePrefix = isLocalhost ? "/" : "/london-bike-maps/";

export default (
  <App>
    <Route exact path={routePrefix} component={MapContainer} />
    <Route path={routePrefix + "/about"} component={About} />
  </App>
);
