import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";

export type IRoleDate = {
  id: number;
  code: "R1" | "R2" | "R3";
  value: string;
};
export type IJob = {
  id: number;
  title: string;
  content: string;
  img: string | File;
  salary: string;
  experience: string;
  location: string;
  Grade: string;
  Education: string;
  positions_needed: string;
  work_type: string;
  createdAt: string;
  updatedAt: string;
};
export type IUserData = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  field?: string;
  address?: string;
  description?: string;
  scale?: string;
  education_levels?: string;
  role_code?: string;
  createdAt?: string;
  updatedAt?: string;
  roleData?: IRoleDate;
  Jobs?: IJob[];
};

export type IListUser = IUserData;

type IUser = {
  userData: IUserData | null;
  userApply: IUserData | null;
  userDataList: IUserData[];
  jobDataUser: IUserData[];
  userIdData: IUserData | null;
  isLoading?: boolean;
};

const initialState: IUser = {
  isLoading: false,
  userApply: null,
  userData: null,
  userIdData: null,
  userDataList: [],
  jobDataUser: [],
};

const userReducer = (
  state = initialState,
  action: PayloadAction<Partial<IUser>>
) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        userData: payload.userData,
        isLoading: false,
      };
    case types.SET_USER_INIT:
      return {
        ...state,
        userData: payload.userData,
      };

    case types.GET_ID_DATA_USER:
      const c = {
        ...state,
        userIdData: payload.userIdData, // payload là dữ liệu bạn muốn gán
      };
      console.log("Updated state:", c); // Log state sau khi cập nhật
      return c;

    case types.GET_JOB_USER_ALL:
      const b = {
        ...state,
        jobDataUser: payload.jobDataUser || [],
      };
      return b;
    case types.SET_USER_INIT:
      return {
        ...state,
        userApply: payload.userData,
      };
    case types.USER_CHANGE_LOADING:
      return {
        ...state,
        isLoading: true,
        ...action.payload,
      };
    case types.USER_CHANGE_LOADED:
      return {
        ...state,
        isLoading: false,
      };
    case types.REMOVE_USER:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case types.GET_USER_ALL:
      const newState = {
        ...state,
        userDataList: payload.userDataList || [],
      };
      return newState;
    case types.PUT_UPDATE_USER:
      const newPut = {
        ...state,
        userData: action.payload.userData,
      };
      return newPut;
    default:
      return state;
  }
};

export default userReducer;
