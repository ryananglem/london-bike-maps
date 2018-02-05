import * as types from '../actions/actionTypes'
const initialState = {
    searchText: '001088',
    searchResults: {
        "bikes": "15",
        "coords": {"lat": 51.506451, "lng": -0.170279},
        "distance": 53.784502205714475,
        "id": "248",
        "infoWindowIsOpen": false,
        "name": "Triangle Car Park, Hyde Park",
        "spaces": "10",
        "terminalName": "001088",
        "totalDocks": "27"
    }
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_STATION_SEARCH:
            return {
                searchText: action.searchText,
                searchResults: null
            };
        case types.RECEIVE_STATION_SEARCH:
        case types.NO_STATION_FOUND:
        case types.NO_SEARCH_TERM:
            return {
                searchResults: action.searchResults
            };
        default:
            return state;
    }
};
export default searchReducer;
