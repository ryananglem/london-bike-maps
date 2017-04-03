import * as types from './actionTypes';
import {filterByParks, filterByBikes} from './filterActions'

it('should filter by parks', () => {
    const filter = "PARKS_AVAILABLE";
    const expectedAction = {
        type: types.FILTER_BY_PARKS,
        filter: filter
    };
    expect(filterByParks()).toEqual(expectedAction);
});

it('should filter by bikes', () => {
    const filter = "BIKES_AVAILABLE";
    const expectedAction = {
        type: types.FILTER_BY_BIKES,
        filter: filter
    };
    expect(filterByBikes()).toEqual(expectedAction);
});