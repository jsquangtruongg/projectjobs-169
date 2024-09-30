import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";

export type IBlog = {
  id: number;
  title: string;
  content: string;
};

export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type IBlogCategoryData = {
  id: number;
  user_id: number;
  title: string;
  describe: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  blogData: IBlog;
  userData: IUser;
};

export type IBlogCategory = {
  isLoading: boolean;
  blogCategoryData: IBlogCategoryData[];
  blogCategoryDataList: IBlogCategoryData[];
};

const initialState: IBlogCategory = {
  isLoading: false,
  blogCategoryData: [],
  blogCategoryDataList: [],
};

const blogCategoryReducer = (
  state = initialState,
  action: PayloadAction<Partial<IBlogCategory>>
) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_BLOG_CATEGORY:
      const newState = {
        ...state,
        blogCategoryDataList: payload.blogCategoryDataList || [],
      };
      console.log("State after:", newState);
      return newState;

    default:
      return state;
  }
};

export default blogCategoryReducer;
