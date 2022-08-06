import { Dispatch } from "redux";

import { BundleAction } from "../actions";
import { BundleActionTypes } from "../action-types";
import bundle from "../../bundler";

export const createBundle =
  (cellId: string, rawCode: string) =>
  async (dispatch: Dispatch<BundleAction>) => {
    dispatch({
      type: BundleActionTypes.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(rawCode);

    dispatch({
      type: BundleActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        ...result,
      },
    });
  };
