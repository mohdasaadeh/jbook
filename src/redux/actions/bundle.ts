import { BundleActionTypes } from "../action-types";

interface BundleStartAction {
  type: BundleActionTypes.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

interface BundleCompleteAction {
  type: BundleActionTypes.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    code: string;
    error: string | false;
  };
}

export type BundleAction = BundleStartAction | BundleCompleteAction;
