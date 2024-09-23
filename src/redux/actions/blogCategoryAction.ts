import { getBlogCategoryAPI } from "../../api/blog-category";
import * as types from "../constants/authConstants";
import { AppDispatch } from "../store";
import { setError } from "./globalAction";

export const getBlogCategory = () => async (dispatch: AppDispatch) => {
  try {
    const { blogCategoryData } = await getBlogCategoryAPI();
    dispatch({
      type: types.GET_BLOG_CATEGORY,
      payload: { blogCategoryData },
    });
  } catch (error: any) {
    dispatch(setError(error.response?.data.mess));
  }
};
