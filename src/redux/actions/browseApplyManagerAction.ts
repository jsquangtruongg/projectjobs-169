import { AppDispatch } from "../store";
import * as types from "../constants/authConstants";
import {
  createBrowseApplyManagerAPI,
  getAllBrowseApplyManagerAPI,
} from "../../api/browseApplyManager";
import { setError } from "./globalAction";
import { IBrowseApplyManagerData } from "../reducers/browseApplyManager";
import { IApplyMemberData } from "../reducers/applyMember";

export const getAllBrowseApplyManager = () => async (dispatch: AppDispatch) => {
  try {
    const { browseApplyManagerDataList } = await getAllBrowseApplyManagerAPI();
    dispatch({
      type: types.GET_ALL_BROWSE_APPLY,
      payload: { browseApplyManagerDataList },
    });
    console.log(browseApplyManagerDataList);    
  } catch (error: any) {
    dispatch(setError(error.response.data.mess));
  }
};

export const createBrowseApplyManager =
  (data: IApplyMemberData) => async (dispatch: AppDispatch) => {
    try {
      await createBrowseApplyManagerAPI(data);
      dispatch(getAllBrowseApplyManager());
    } catch (error: any) {
      dispatch(setError(error.response.data.mess));
    }
  };
