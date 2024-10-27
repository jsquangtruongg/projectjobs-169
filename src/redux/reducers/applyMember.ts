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

export type IApply = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  img: string;
};

export type IApplyMemberData = {
  id: number | string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user_id: string | number;
  job_id: string | number;
  apply_id: string | number;
  userApply_id: string | number;
  userData: IUser;
  userApply: IUser;
  jobs: IJob;
  Applies: IApply;
};

export type IApplyMember = {
  isLoading: boolean;
  applyMemberData: IApplyMemberData[];
  applyMemberDataList: IApplyMemberData[];
};

const initialState: IApplyMember = {
  isLoading: false,
  applyMemberData: [],
  applyMemberDataList: [],
};

const appLyMemberReducer = (
  state = initialState,
  action: PayloadAction<Partial<IApplyMember>>
) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_APPLY_MEMBER:
      const newState = {
        ...state,
        applyMemberDataList: payload.applyMemberDataList || [],
      };

      return newState;

    default:
      return state;
  }
};

export default appLyMemberReducer;
