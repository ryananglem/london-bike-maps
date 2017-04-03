import * as types from './actionTypes'

export const filterByParks = () => {
    return {
        type: types.FILTER_BY_PARKS,
        filter: "PARKS_AVAILABLE"
    }
};

export const filterByBikes = () => {
    return {
        type: types.FILTER_BY_BIKES,
        filter: "BIKES_AVAILABLE"
    }
};