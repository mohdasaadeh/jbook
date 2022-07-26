import produce from "immer";

import { CellAction } from "../actions";
import { CellActionTypes } from "../action-types";
import { CellTypes } from "../types";

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: { [key: string]: Cell };
}

const initialState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

export const cellReducer = produce(
  (state: CellState = initialState, action: CellAction) => {
    switch (action.type) {
      case CellActionTypes.INSERT_CELL:
        const { id, type } = action.payload;

        const gRandomId = randomId();

        state.data[gRandomId] = {
          id: gRandomId,
          type,
          content: "",
        };

        if (!id) {
          state.order.unshift(gRandomId);
        } else {
          state.order.splice(state.order.indexOf(id) + 1, 0, gRandomId);
        }

        return state;
      case CellActionTypes.MOVE_CELL:
        const currentIndex = state.order.indexOf(action.payload.id);
        const targetIndex =
          action.payload.direction === "up"
            ? currentIndex - 1
            : currentIndex + 1;

        if (targetIndex > state.order.length - 1 || targetIndex < 0)
          return state;

        [state.order[currentIndex], state.order[targetIndex]] = [
          state.order[targetIndex],
          state.order[currentIndex],
        ];

        return state;
      case CellActionTypes.DELETE_CELL:
        delete state.data[action.payload];

        state.order = state.order.filter((item) => item !== action.payload);

        return state;
      case CellActionTypes.UPDATE_CELL:
        state.data[action.payload.id].content = action.payload.content;

        return state;
      default:
        return state;
    }
  }
);

const randomId = (): string => {
  return Date.now().toString();
};
