import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";
import { JSX } from "react/jsx-runtime";

export type IJob = {
  map(
    arg0: (jobItem: any, index: any) => JSX.Element
  ): import("react").ReactNode;
  length: number;
  id: number;
  img: string;
  content: string;
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
  user_id: number;
  createdAt: string;
  updatedAt: string;
  userData: IUser;
  Jobs: IJob;
};

export type IJobCategory = {
  isLoading: boolean;
  jobCategoryData: IJobCategoryData[];
  jobCategoryDataList: IJobCategoryData[];
};

const initialState: IJobCategory = {
  isLoading: false,
  jobCategoryData: [],
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

    default:
      return state;
  }
};

export default jobCategoryReducer;
