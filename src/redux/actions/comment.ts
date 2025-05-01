import { createCommentJobAPI, getCommentJobAllAPI } from "../../api/comment";
import { ICommentData } from "../reducers/comment";
import * as types from "../constants/authConstants";

import { AppDispatch } from "../store";
import { setError } from "./globalAction";

export const getAllCommentJob =
  (content = "") =>
  async (dispatch: AppDispatch) => {
    try {
      const { commentDataList } = await getCommentJobAllAPI(content);
      dispatch({
        type: types.GET_COMMENT_JOB_ALL,
        payload: { commentDataList },
      });
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };

export const postCreateCommentJob =
  (data: ICommentData) => async (dispatch: AppDispatch) => {
    try {
      await createCommentJobAPI(data);
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };
