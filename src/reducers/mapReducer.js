import * as types from '../actions/actionTypes';

const initialState = {
    coords: {
        //lat: 51.506451,
        //lng: -0.170279
        lat: 51.5059116,
        lng: -0.0859278
    }
};

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RECENTER_MAP:
            return {
                coords: action.coords
            };
        case types.GET_LOCATION:
            return {
                position: action.position
            }
        default:
            return state;
    }
};
export default mapReducer;