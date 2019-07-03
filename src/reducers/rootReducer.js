import { combineReducers } from 'redux'
import bikeStationReducer from './bikeStationReducer'
import mapReducer from './mapReducer'
import filterReducer from './filterReducer'
import searchReducer from './searchReducer'
import nearbyStationReducer from './nearbyStationReducer'

export default combineReducers({
    bikeStation: bikeStationReducer,
    map: mapReducer,
    filter: filterReducer,
    search: searchReducer,
    nearbyStation: nearbyStationReducer,
})
