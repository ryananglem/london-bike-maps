import * as types from "../actions/actionTypes";

const initialState = {
  value: "BIKES_AVAILABLE"
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILTER_BY_PARKS:
    case types.FILTER_BY_BIKES:
      return {
        value: action.filter
      };
    default:
      return state;
  }
};
export default filterReducer;
