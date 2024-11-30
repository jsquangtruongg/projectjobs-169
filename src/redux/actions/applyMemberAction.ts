import {
  createApplyMemberAPI,
  deleteApplyMemberAPI,
  getAllApplyMemberAPI,
} from "../../api/ApplyMember";
import { AppDispatch } from "../store";

import * as types from "../constants/authConstants";
import { setError } from "./globalAction";
import { IApplyMemberData } from "../reducers/applyMember";
import { getAllBrowseApplyManager } from "./browseApplyManagerAction";
import { createBrowseApplyManagerAPI } from "../../api/browseApplyManager";
import { deleteApplyAPI } from "../../api/apply";
import { getAllApply } from "./applyAction";

export const getAllApplyMember = () => async (dispatch: AppDispatch) => {
  try {
    const { applyMemberDataList } = await getAllApplyMemberAPI();
    dispatch({
      type: types.GET_ALL_APPLY_MEMBER,
      payload: { applyMemberDataList },
    });
  } catch (error: any) {
    dispatch(setError(error.response?.data.mess));
  }
};

export const createApplyMember =
  (data: IApplyMemberData) => async (dispatch: AppDispatch) => {
    try {
      await createApplyMemberAPI(data);
      const response = await createBrowseApplyManagerAPI(data);
      console.log("Response from createBrowseApplyManagerAPI:", response);

      dispatch(getAllBrowseApplyManager());
      dispatch(getAllApplyMember());
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };

export const deleteApplyMember =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      await deleteApplyMemberAPI(id);
      dispatch(getAllApplyMember());
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };