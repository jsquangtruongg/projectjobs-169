import { getApplyAllAPI } from "../../api/apply";
import { getAllDeleteApplyAPI } from "../../api/deleteApply";
import * as types from "../constants/authConstants";
import { AppDispatch } from "../store";
import { setError } from "./globalAction";

export const getAllDelete = () => async (dispatch: AppDispatch) => {
  try {
    const { DeleteApplyDataList } = await getAllDeleteApplyAPI();

    dispatch({
      type: types.GET_ALL_DELETE_APPLY,
      payload: { DeleteApplyDataList },
    });
  } catch (error: any) {
    dispatch(setError(error.response?.data.mess));
  }
};
