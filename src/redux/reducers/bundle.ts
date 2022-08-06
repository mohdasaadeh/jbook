import { produce } from "immer";

import { BundleActionTypes } from "../action-types";
import { BundleAction } from "../actions";

interface BundleState {
  [cellId: string]: {
    loading: boolean;
    code: string;
    error: string | false;
  };
}

const initialState: BundleState = {};

export const bundleReducer = produce(
  (state: BundleState = initialState, action: BundleAction): BundleState => {
    switch (action.type) {
      case BundleActionTypes.BUNDLE_START:
        return {
          ...state,
          [action.payload.cellId]: {
            loading: true,
            code: "",
            error: false,
          },
        };
      case BundleActionTypes.BUNDLE_COMPLETE:
        return {
          ...state,
          [action.payload.cellId]: {
            loading: false,
            code: action.payload.code,
            error: action.payload.error,
          },
        };
      default:
        return state;
    }
  }
);
