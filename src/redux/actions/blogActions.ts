import {
  createBlogAPI,
  deleteBlogAPI,
  editBlog,
  getBlogAllAPI,
  getBlogAPI,
} from "../../api/blog";
import * as types from "../constants/authConstants";
import { IBlogData } from "../reducers/blog";
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
export const getBlogAll =
  (title = "", content = "", lastName = "") =>
  async (dispatch: AppDispatch) => {
    try {
      const { blogDataList } = await getBlogAllAPI(title, content, lastName);
      dispatch({
        type: types.GET_BLOG_ALL,
        payload: { blogDataList },
      });
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };

export const putUpdateBlog =
  (data: IBlogData) => async (dispatch: AppDispatch) => {
    try {
      await editBlog(data);
      dispatch(getBlogAll());
    } catch (error) {}
  };

export const deleteBlog = (id: number) => async (dispatch: AppDispatch) => {
  try {
    await deleteBlogAPI(id);
    dispatch(getBlogAll());
  } catch (error) {
    console.error(error);
  }
};

export const postCreateBlog =
  (data: IBlogData) => async (dispatch: AppDispatch) => {
    try {
      await createBlogAPI(data);
      dispatch(getBlogAll());
    } catch (error) {
      console.error(error);
    }
  };
