import { combineReducers } from 'redux';
import bikeStationReducer from './bikeStationReducer';
import mapReducer from './mapReducer';

export default combineReducers({
    bikeStationReducer,
    mapReducer,
})