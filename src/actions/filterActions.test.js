import {filterByParks} from './filterActions'

it('should filter by parks', () => {
    const filter = 'PARKS_AVAILABLE';
    const expectedAction = {
        type: 'FILTER_BY_PARKS',
        filter: filter
    };
    expect(filterByParks('PARKS_AVAILABLE')).toEqual(expectedAction);
});