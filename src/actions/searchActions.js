import * as types from './actionTypes'

export const requestStationSearch = (searchText) => ({
    type: types.REQUEST_STATION_SEARCH,
    searchResults: "",
    searchText
});

export const receiveStationSearch= (searchResults) => ({
    type: types.RECEIVE_STATION_SEARCH,
    searchResults
});

export const noStationFound = () => ({
    type: types.NO_STATION_FOUND,
    searchResults: ""
});

export const noSearchTerm = () => ({
    type: types.NO_SEARCH_TERM,
    searchResults: ""
});

export const stationSearch = (searchText) => {
    return (dispatch, getState) => {
        if (searchText!=="") {
          dispatch(requestStationSearch(searchText));
            const stations = getState().rootReducer.bikeStationReducer.stations;
            let searchResults="";
            if (isNaN(searchText)) {
                searchResults = stations.find(s => s.name.toLowerCase() === searchText.toLowerCase())
            }
            else {
                searchResults = stations.find(s => s.terminalName === searchText)
            }
            if (searchResults === undefined) {
                dispatch(noStationFound())
            }
            else {
                dispatch(receiveStationSearch(searchResults));
            }
        }
        else {
            dispatch(noSearchTerm())
        }
};

};

