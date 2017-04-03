import * as types from './actionTypes';
import {recenterMap, zoomMap} from './mapActions'

it('should recenter the map', () => {

    const coords = { lat: 10, lng: 15 };
    const expectedAction = {
        type: types.RECENTER_MAP,
        coords: coords
    };
    expect(recenterMap(coords)).toEqual(expectedAction);
});

it('should request all stations', () => {

    const zoom = 13;
    const expectedAction = {
        type: types.ZOOM_MAP,
        zoom: zoom
    };
    expect(zoomMap(zoom)).toEqual(expectedAction);
});