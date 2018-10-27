

export const bikeStationAvailabilityPercentages = (filter, station) => {
    return (filter==="BIKES_AVAILABLE")
            ? (parseInt(station.bikes, 10) / parseInt(station.totalDocks, 10)) * 100
            : (parseInt(station.spaces, 10) / parseInt(station.totalDocks, 10)) * 100;
}