import { zoomMap } from "../actions/mapActions";
import zoomReducer from "./zoomReducer";

const initialState = {
  zoom: 14
};
it("zooms the map", () => {
  const action = zoomMap(12);

  const newState = zoomReducer(initialState, action);

  expect(newState.level).toEqual(12);
});
