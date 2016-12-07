const initialState = {
    searchText: '',
    searchResults: []
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_STATION_SEARCH':
            return {
                searchText: action.searchText,
                searchResults: []
            };
        case 'RECEIVE_STATION_SEARCH':
            return {
                searchResults: action.searchResults
            };
        case 'NO_STATION_FOUND':
            return {
                searchResults: action.searchResults
            };
        case 'NO_SEARCH_TERM':
            return {
                searchResults: action.searchResults
            };
        default:
            return state;
    }
};
export default searchReducer;
