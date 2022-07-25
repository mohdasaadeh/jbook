import { CellActionTypes } from "../action-types";
import {
  InsertCellAction,
  MoveCellAction,
  DeleteCellAction,
  UpdateCellAction,
} from "../actions";
import { CellTypes, CellMoveDirections } from "../types";

export const insertCell = (id: number, type: CellTypes): InsertCellAction => {
  return { type: CellActionTypes.INSERT_CELL, payload: { id, type } };
};

export const moveCell = (
  id: string,
  direction: CellMoveDirections
): MoveCellAction => {
  return { type: CellActionTypes.MOVE_CELL, payload: { id, direction } };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return { type: CellActionTypes.DELETE_CELL, payload: id };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return { type: CellActionTypes.UPDATE_CELL, payload: { id, content } };
};
