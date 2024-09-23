import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";

export type IBlog = {
  id: number;
  title: string;
  content: string;
};
export type IBlogCategoryData = {
  id: number;
  title: string;
  describe: string;
  createdAt: string;
  updatedAt: string;
  blogData: IBlog[];
};

export type IBlogCategory = {
  isLoading: boolean;
  blogCategoryData: IBlogCategoryData[];
};

const initialState: IBlogCategory = {
  isLoading: false,
  blogCategoryData: [],
};

const userReducer = (
  state = initialState,
  action: PayloadAction<Partial<IBlogCategory>>
) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_BLOG_CATEGORY:
      return {
        ...state,
        blogCategoryData: payload.blogCategoryData || [],
      };

    default:
      return state;
  }
};

export default userReducer;
