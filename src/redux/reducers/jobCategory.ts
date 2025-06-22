import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";

export type IJob = {
  id: number;
  title: string;
  img: string;
  content: string;
  salary: string;
  experience: string;
  location: string;
  Grade: string;
  Education: string;
  positions_needed: string;
  work_type: string;
  user_id: number;
  jobCategory_id: number;
};
export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type IJobCategoryData = {
  id: number;
  title: string;
  img: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  userData: IUser;
  jobs: IJob[];
};

export type IJobCategory = {
  isLoading: boolean;
  jobCategoryData: IJobCategoryData | null;
  jobCategoryDataList: IJobCategoryData[];
};

const initialState: IJobCategory = {
  isLoading: false,
  jobCategoryData: null,
  jobCategoryDataList: [],
};

const jobCategoryReducer = (
  state = initialState,
  action: PayloadAction<Partial<IJobCategory>>
) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_JOB_CATEGORY_ALL:
      const newState = {
        ...state,
        jobCategoryDataList: payload.jobCategoryDataList || [],
      };
      return newState;
    case types.GET_JOB_CATEGORY_ID:
      const a = {
        ...state,
        jobCategoryData: payload.jobCategoryData,
      };
      console.log("first", a);
      return a;

    default:
      return state;
  }
};

export default jobCategoryReducer;
