const initialState = {
    coords: {
        lat: 51.506451,
        lng: -0.170279
    }
};

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RECENTER_MAP':
            return {
                coords: action.coords
            };
        default:
            return state;
    }
};
export default mapReducer;