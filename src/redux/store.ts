import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";
import { CellActionTypes } from "./action-types";

export const store = createStore(reducers, applyMiddleware(thunk));

store.dispatch({
  type: CellActionTypes.INSERT_CELL,
  payload: {
    id: null,
    type: "code",
  },
});

store.dispatch({
  type: CellActionTypes.INSERT_CELL,
  payload: {
    id: null,
    type: "text",
  },
});
