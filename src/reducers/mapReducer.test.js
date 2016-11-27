import { zoomMap, recentreMap } from '../actions/mapActions'
import mapReducer from './mapReducer';

const initialState = {
    zoom: 13,
    coords: {
        lat: 51.506451,
        lng: -0.170279
    }
};
it('zooms the map', () => {
    const action = zoomMap(12);

    const newState = mapReducer(initialState, action);

    expect(newState.zoom).toEqual(12);
})

it('recentres the map', () => {
    const action = recentreMap({ lat: 10, lng: 14});

    const newState = mapReducer(initialState, action);

    expect(newState.coords).toEqual({ lat: 10, lng: 14});

})
