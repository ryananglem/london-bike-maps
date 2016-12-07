
export const requestStationSearch = (searchText) => ({
    type: "REQUEST_STATION_SEARCH",
    searchResults: [],
    searchText
});

export const receiveStationSearch= (searchResults) => ({
    type: "RECEIVE_STATION_SEARCH",
    searchResults
});

export const noStationFound = () => ({
    type: "NO_STATION_FOUND",
    searchResults: []
});

export const noSearchTerm = () => ({
    type: "NO_SEARCH_TERM",
    searchResults: []
});

export const stationSearch = (searchText) => {
    return (dispatch, getState) => {
        if (searchText!=="") {
          dispatch(requestStationSearch(searchText));
            const stations = getState().rootReducer.bikeStationReducer.stations;
            let searchResults = [];
            stations.forEach(s => {
                if (s.name.toLowerCase().includes(searchText.toLowerCase()))
                { searchResults.push(s);}
            });
            if (searchResults.length === 0) {
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

