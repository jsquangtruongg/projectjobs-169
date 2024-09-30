import {
  createBlogCategoryAPI,
  deleteBlogCategoryAPI,
  editBlogCategoryAPI,
  getBlogCategoryAPI,
} from "../../api/blog-category";
import * as types from "../constants/authConstants";
import { IBlogCategoryData } from "../reducers/blogCategory";
import { AppDispatch } from "../store";
import { setError } from "./globalAction";

export const getBlogCategory = () => async (dispatch: AppDispatch) => {
  try {
    const { blogCategoryDataList } = await getBlogCategoryAPI();
    console.log("Blog Category Data:", blogCategoryDataList);
    dispatch({
      type: types.GET_BLOG_CATEGORY,
      payload: { blogCategoryDataList },
    });
  } catch (error: any) {
    dispatch(setError(error.response?.data.mess));
  }
};

export const putUpdateBlogCategory =
  (data: IBlogCategoryData) => async (dispatch: AppDispatch) => {
    try {
      await editBlogCategoryAPI(data);
      dispatch(getBlogCategory());
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };

export const deleteBlogCategory =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      await deleteBlogCategoryAPI(id);
      dispatch(getBlogCategory());
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };

export const postCreateBlogCategory =
  (data: IBlogCategoryData) => async (dispatch: AppDispatch) => {
    try {
      await createBlogCategoryAPI(data);
      dispatch(getBlogCategory());
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };
