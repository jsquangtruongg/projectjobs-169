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

export type IDeleteApplyData = {
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
  apply_id: string | number;
  userData: IUser;
  userApply: IUser;
  jobs: IJob;
  Applies: IApply;
};

export type IDeleteApply = {
  isLoading: boolean;
  DeleteApplyData: IDeleteApplyData[];
  DeleteApplyDataList: IDeleteApplyData[];
};

const initialState: IDeleteApply = {
  isLoading: false,
  DeleteApplyData: [],
  DeleteApplyDataList: [],
};

const DeleteAppLyReducer = (
  state = initialState,
  action: PayloadAction<Partial<IDeleteApply>>
) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_DELETE_APPLY:
      const newState = {
        ...state,
        DeleteApplyDataList: payload.DeleteApplyDataList || [],
      };
      return newState;

    default:
      return state;
  }
};

export default DeleteAppLyReducer;
