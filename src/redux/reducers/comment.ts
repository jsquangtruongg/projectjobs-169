import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";

export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type IJob = {
  id: number;
  img: string;
  content: string;
};

export type ICommentData = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user_id: string | number;
  job_id: string | number;
  User: IUser;
  Job: IJob;
};

export type ICommentJob = {
  isLoading: boolean;
  commentJobData: ICommentData[];
  commentJobDataList: ICommentData[];
};

const initialState: ICommentJob = {
  isLoading: false,
  commentJobData: [],
  commentJobDataList: [],
};

const commentJobReduce = (
  state = initialState,
  action: PayloadAction<Partial<ICommentJob>>
) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_COMMENT_JOB_ALL:
      return {
        ...state,
        commentJobDataList: payload.commentJobDataList || [],
      };
    default:
      return state;
  }
};
export default commentJobReduce;
