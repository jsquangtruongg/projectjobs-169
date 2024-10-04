import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";
export type IUser = {
  id: number;
  avatar: null;
  firstName: string;
  lastName: string;
};

export type IJobData = {
  id: number;
  content: string;
  img: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  userData: IUser;
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
    case types.GET_JOB:
      return {
        ...state,
        jobData: payload.jobData || [],
      };
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
