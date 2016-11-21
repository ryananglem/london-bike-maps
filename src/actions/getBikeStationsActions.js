
export const requestAllBikeStations = () => ({
    type: "REQUEST_ALL_BIKE_STATIONS",
    isFetchingStations: true
});

export const receiveAllBikeStations = (stations) => ({
    type: "RECEIVE_ALL_BIKE_STATIONS",
    isFetchingStations: false,
    stations
});

export const getAllBikeStationsError = (error) => ({
    type: "GET_ALL_BIKE_STATIONS_ERROR",
    isFetchingStations: false,
    error
});
