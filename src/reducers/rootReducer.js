import { combineReducers } from 'redux';
import bikeStationReducer from './bikeStationReducer';
import mapReducer from './mapReducer';
import zoomReducer from './zoomReducer';
import filterReducer from './filterReducer';

export default combineReducers({
    bikeStationReducer,
    mapReducer,
    zoomReducer,
    filterReducer
})