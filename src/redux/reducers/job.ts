import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";
export type IUser = {
  id: number;
  avatar: null;
  firstName: string;
  lastName: string;
  email: string;
};

export type ICategory = {
  title: string;
  describe: string;
};

export type IJobData = {
  id: number | string;
  title: string;
  content: string;
  img: string | File;
  salary: string;
  user_id: number;
  JobCategory_id: number;
  createdAt: string;
  updatedAt: string;
  userData: IUser;
  categoryData: ICategory;
};

export type IJob = {
  isLoading: boolean;
  jobData: IJobData[];
  jobDataList: IJobData[];
};

const initialState: IJob = {
  isLoading: false,
  jobData: [],
  jobDataList: [],
};

const jobReducer = (
  state = initialState,
  action: PayloadAction<Partial<IJob>>
) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_JOB_ALL:
      return {
        ...state,
        jobDataList: payload.jobDataList || [],
      };
    default:
      return state;
  }
};

export default jobReducer;
