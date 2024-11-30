import { AppDispatch } from "../store";

import {
  createAppLyAPI,
  deleteApplyAPI,
  getApplyAllAPI,
  getIdApplyAPI,
} from "../../api/apply";
import * as types from "../constants/authConstants";
import { setError } from "./globalAction";
import { IApplyData } from "../reducers/apply";
export const getAllApply = () => async (dispatch: AppDispatch) => {
  try {
    const { applyDataList } = await getApplyAllAPI();

    dispatch({
      type: types.GET_APPLY,
      payload: { applyDataList },
    });
  } catch (error: any) {
    dispatch(setError(error.response?.data.mess));
  }
};
export const getIdApply = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const { applyData } = await getIdApplyAPI(id);
    dispatch({
      type: types.GET_ID_APPLY,
      payload: { applyData },
    });
  } catch (error: any) {
    dispatch(
      setError(error.response?.data.mess || "Đã xảy ra lỗi không mong muốn")
    );
  }
};
export const createApply =
  (data: IApplyData, file: File) => async (dispatch: AppDispatch) => {
    try {
      await createAppLyAPI(data, file);
      dispatch(getAllApply());
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };

export const deleteApply = (id: number) => async (dispatch: AppDispatch) => {
  try {
    await deleteApplyAPI(id);
    dispatch(getAllApply());
  } catch (error: any) {
    dispatch(setError(error.response?.data.mess));
  }
};
