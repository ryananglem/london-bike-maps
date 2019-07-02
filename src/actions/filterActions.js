import * as types from "./actionTypes";
import * as constants from "../config/constants";

export const filterByParks = () => {
  return {
    type: types.FILTER_BY_PARKS,
    filter: constants.PARKS_AVAILABLE
  };
};

export const filterByBikes = () => {
  return {
    type: types.FILTER_BY_BIKES,
    filter: constants.BIKES_AVAILABLE
  };
};
