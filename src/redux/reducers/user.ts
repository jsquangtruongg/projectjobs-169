import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";

export type IRoleDate = {
  id: number;
  code: "R1" | "R2" | "R3";
  value: string;
};

export type IUserData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: null;
  createdAt: string;
  updatedAt: string;
  roleData: IRoleDate;
};

type IUser = {
  userData: IUserData | null;
  isLoading?: boolean;
};

const initialState: IUser = {
  isLoading: false,
  userData: null,
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
    default:
      return state;
  }
};

export default userReducer;
