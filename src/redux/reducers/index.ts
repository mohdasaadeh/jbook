import { combineReducers } from "redux";

import { cellReducer } from "./cell";
import { bundleReducer } from "./bundle";

const reducers = combineReducers({
  cells: cellReducer,
  bundles: bundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

export * from "./cell";
