const initialState = {
    testZoom: 14,

};

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ZOOM_MAP':
            return {
                testZoom: action.zoom
            };
        default:
            return state;
    }
};
export default testReducer;