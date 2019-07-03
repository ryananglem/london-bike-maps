import * as types from '../actions/actionTypes'

const initialState = {
    coords: {
        lat: 51.506451,
        lng: -0.170279,
    },
}

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RECENTER_MAP:
            return {
                ...state,
                coords: action.coords,
            }
        case types.ZOOM_MAP:
            return {
                ...state,
                zoom: action.zoom,
            }
        default:
            return state
    }
}
export default mapReducer
