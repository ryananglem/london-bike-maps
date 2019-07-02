import { recenterMap } from '../actions/mapActions'
import mapReducer from './mapReducer'

const initialState = {
    coords: {
        lat: 51.506451,
        lng: -0.170279,
    },
}

it('recentres the map', () => {
    const action = recenterMap({ lat: 10, lng: 14 })

    const newState = mapReducer(initialState, action)

    expect(newState.coords).toEqual({ lat: 10, lng: 14 })
})
