import { filterByParks } from '../actions/filterActions';
import filterReducer  from '../reducers/filterReducer';

const initialState = {
    filter: 'BIKES_AVAILABLE'
};

it('filters the map', () => {
    const action = filterByParks();

    const newState = filterReducer(initialState, action);
    expect(newState.filter).toEqual('PARKS_AVAILABLE');
});
