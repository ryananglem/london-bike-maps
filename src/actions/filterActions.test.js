import * as types from './actionTypes';
import {filterByParks, filterByBikes} from './filterActions'
import * as constants from '../config/constants'

it('should filter by parks', () => {
    const filter = constants.PARKS_AVAILABLE;
    const expectedAction = {
        type: types.FILTER_BY_PARKS,
        filter: filter
    };
    expect(filterByParks()).toEqual(expectedAction);
});

it('should filter by bikes', () => {
    const filter = constants.BIKES_AVAILABLE;
    const expectedAction = {
        type: types.FILTER_BY_BIKES,
        filter: filter
    };
    expect(filterByBikes()).toEqual(expectedAction);
});