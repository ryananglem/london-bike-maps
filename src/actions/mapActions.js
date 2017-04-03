import * as types from './actionTypes'

export const recenterMap = (coords) => ({
    type: types.RECENTER_MAP,
    coords
});

export const zoomMap = (zoom) => ({
    type: types.ZOOM_MAP,
    zoom
});
