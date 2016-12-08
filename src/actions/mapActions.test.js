import {recenterMap, zoomMap} from './mapActions'

it('should recenter the map', () => {

    const coords = { lat: 10, lng: 15 };
    const expectedAction = {
        type: 'RECENTER_MAP',
        coords: coords
    };
    expect(recenterMap(coords)).toEqual(expectedAction);
});

it('should request all stations', () => {

    const zoom = 13;
    const expectedAction = {
        type: 'ZOOM_MAP',
        zoom: zoom
    };
    expect(zoomMap(zoom)).toEqual(expectedAction);
});