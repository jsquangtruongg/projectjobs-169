import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";

export type IUser = {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
};
export type IJob = {
  id: number;
  img: string;
  content: string;
};

export type IApplyData = {
  id: number | string;
  fullName: string;
  email: string;
  phone: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  user_id: string | number;
  job_id: string | number;
  userApply_id: string | number;
  userData: IUser;
  userApply: IUser;
  jobs: IJob;
};

export type IApply = {
  isLoading: boolean;
  applyData: IApplyData[];
  applyDataList: IApplyData[];
};

const initialState: IApply = {
  isLoading: false,
  applyData: [],
  applyDataList: [],
};

const appLyReducer = (
  state = initialState,
  action: PayloadAction<Partial<IApply>>
) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_APPLY:
      const newState = {
        ...state,
        applyDataList: payload.applyDataList || [],
      };
      return newState;
    case types.GET_ID_APPLY:
      return {
        ...state,
        applyData: payload.applyData || [],
      };
    default:
      return state;
  }
};

export default appLyReducer;
