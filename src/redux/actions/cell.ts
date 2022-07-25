import { CellActionTypes } from "../action-types";
import { CellTypes, CellMoveDirections } from "../types";

export interface InsertCellAction {
  type: CellActionTypes.INSERT_CELL;
  payload: {
    id: number | null;
    type: CellTypes;
  };
}

export interface MoveCellAction {
  type: CellActionTypes.MOVE_CELL;
  payload: {
    id: string;
    direction: CellMoveDirections;
  };
}

export interface DeleteCellAction {
  type: CellActionTypes.DELETE_CELL;
  payload: string;
}

export interface UpdateCellAction {
  type: CellActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export type CellAction =
  | InsertCellAction
  | MoveCellAction
  | DeleteCellAction
  | UpdateCellAction;
