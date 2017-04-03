import * as types from '../actions/actionTypes'

const initialState = {
    filter: 'BIKES_AVAILABLE'
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILTER_BY_PARKS:
            return {
                filter: action.filter
            };
        case types.FILTER_BY_BIKES:
            return {
                filter: action.filter
            };
        default:
            return state;
    }
};
export default filterReducer;

