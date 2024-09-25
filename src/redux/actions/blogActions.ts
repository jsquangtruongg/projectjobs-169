import { getBlogAPI } from "../../api/blog";
import * as types from "../constants/authConstants";
import { AppDispatch } from "../store";
import { setError } from "./globalAction";

export const getBlog = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const { blogData } = await getBlogAPI(id);
    dispatch({
      type: types.GET_BLOG,
      payload: { blogData },
    });
  } catch (error: any) {
    dispatch(setError(error.response?.data.mess));
  }
};
