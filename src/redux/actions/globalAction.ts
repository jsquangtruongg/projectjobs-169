import * as types from "../constants/authConstants";
import { AppDispatch } from "../store";

export const setError = (error: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: types.SET_ERROR, payload: { error } });
};
