const initialState = {
    zoom: 14,

};

const zoomReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ZOOM_MAP':
            return {
                zoom: action.zoom
            };
        default:
            return state;
    }
};
export default zoomReducer;