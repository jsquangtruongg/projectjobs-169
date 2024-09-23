import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";

export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
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
};

export type IBlog = {
  isLoading: boolean;
  blogData: IBlogData[];
};

const initialState: IBlog = {
  isLoading: false,
  blogData: [],
};

const userReducer = (
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

    default:
      return state;
  }
};

export default userReducer;
