import { filterByParks, filterByBikes } from '../actions/filterActions';
import filterReducer  from '../reducers/filterReducer';

const initialState = {
    filter: 'BIKES_AVAILABLE'
};

it('filters the map for available parks', () => {
    const action = filterByParks();

    const newState = filterReducer(initialState, action);
    expect(newState.filter).toEqual('PARKS_AVAILABLE');
});


it('filters the map for available bikes', () => {
    const action = filterByBikes();

    const newState = filterReducer(initialState, action);
    expect(newState.filter).toEqual('BIKES_AVAILABLE');
});
