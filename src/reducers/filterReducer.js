const initialState = {
    filter: 'BIKES_AVAILABLE'
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER_BY_PARKS':
            return {
                filter: action.filter
            };
        case 'FILTER_BY_BIKES':
            return {
                filter: action.filter
            };
        default:
            return state;
    }
};
export default filterReducer;

