
export const filterByParks = () => {
    return {
        type: "FILTER_BY_PARKS",
        filter: "PARKS_AVAILABLE"
    }
};

export const filterByBikes = () => {
    return {
        type: "FILTER_BY_BIKES",
        filter: "BIKES_AVAILABLE"
    }
};