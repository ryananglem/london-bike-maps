import * as types from './actionTypes'

export const recenterMap = (coords) => ({
    type: types.RECENTER_MAP,
    coords
});

export const zoomMap = (zoom) => ({
    type: types.ZOOM_MAP,
    zoom
});

export const getLocation = () => {
    return dispatch => {
        const geolocation = navigator.geolocation;
        geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            dispatch({
                type: types.GET_LOCATION,
                position
            });
        });
    }
};