import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";

export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type ICategory = {
  title: string;
  describe: string;
};

export type IBlogData = {
  id: number;
  title: string;
  content: string;
  img: string;
  user_id: number;
  salary: string;
  blog_category_id: number;
  createdAt: string;
  updatedAt: string;
  userData: IUser;
  categoryData: ICategory;
};

export type IBlog = {
  isLoading: boolean;
  blogData: IBlogData[];
  blogDataList: IBlogData[];
};

const initialState: IBlog = {
  isLoading: false,
  blogData: [],
  blogDataList: [],
};

const blogReducer = (
  state = initialState,
  action: PayloadAction<Partial<IBlog>>
) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_BLOG:
      return {
        ...state,
        blogData: payload.blogData || [],
      };
    case types.GET_BLOG_ALL:
      return {
        ...state,
        blogDataList: payload.blogDataList || [],
      };
    // case types.PUT_UPDATE_BLOG:
    //   return {
    //     ...state,
    //     blogData: action.payload.blogData,
    //   };

    default:
      return state;
  }
};

export default blogReducer;
