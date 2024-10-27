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

export type IBrowseApplyManagerData = {
  id: number | string;
  createdAt: string;
  updatedAt: string;
  user_id: string | number;
  job_id: string | number;
  applyMember_id: string | number;
  userApply_id: string | number;
  userData: IUser;
  userApply: IUser;
  jobs: IJob;
  Applies: IApply;
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
export type IBrowseApplyManager = {
  isLoading: boolean;
  browseApplyManagerData: IBrowseApplyManagerData[];
  browseApplyManagerDataList: IApplyMemberData[];
};

const initialState: IBrowseApplyManager = {
  isLoading: false,
  browseApplyManagerData: [],
  browseApplyManagerDataList: [],
};

const browseApplyReducer = (
  state = initialState,
  action: PayloadAction<Partial<IBrowseApplyManager>>
) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_BROWSE_APPLY:
      return {
        ...state,
        browseApplyManagerDataList: payload.browseApplyManagerDataList || [],
      };
    default:
      return state;
  }
};

export default browseApplyReducer;
