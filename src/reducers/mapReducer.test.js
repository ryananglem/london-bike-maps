import { recenterMap, zoomMap } from '../actions/mapActions'
import reducer from './mapReducer'

const initialState = {
    coords: {
        lat: 51.506451,
        lng: -0.170279,
    },
    zoom: 14,
}

it('recentres the map', () => {
    const action = recenterMap({ lat: 10, lng: 14 })

    const newState = reducer(initialState, action)

    expect(newState.coords).toEqual({ lat: 10, lng: 14 })
})

it('zooms the map', () => {
    const action = zoomMap(12)

    const newState = reducer(initialState, action)

    expect(newState.zoom).toEqual(12)
})
