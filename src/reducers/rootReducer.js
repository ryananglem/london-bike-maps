import { combineReducers } from 'redux';
import bikeStationReducer from './bikeStationReducer';
import mapReducer from './mapReducer';
import zoomReducer from './zoomReducer';
import filterReducer from './filterReducer';
import searchReducer from './searchReducer';
import nearbyStationReducer from './nearbyStationReducer';
import { reducer as formReducer } from 'redux-form';
// import { routerReducer } from 'react-router-redux';

export default combineReducers({
    bikeStation: bikeStationReducer,
    map: mapReducer,
    zoom: zoomReducer,
    filter: filterReducer,
    search: searchReducer,
    nearbyStation: nearbyStationReducer,
    form: formReducer,
    // routing: routerReducer
})