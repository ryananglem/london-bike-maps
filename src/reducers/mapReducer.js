const initialState = {
    zoom: 14,
    coords: {
        lat: 51.506451,
        lng: -0.170279
    }
};

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RECENTER_MAP':
            return {
                coords: action.coords,
                zoom: 14 // zoom seems to be removed from the state for an unknown reason
                         // after this action, so maintaining it here
            };
        case 'ZOOM_MAP':
            return {
                zoom: action.zoom
            };
        default:
            return state;
    }
};
export default mapReducer;