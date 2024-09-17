import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";

export type IUserData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: null;
  createdAt: string;
  updatedAt: string;
  roleData: null;
};

type IUser = {
  userData: IUserData | null;
  isLoading: boolean;
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
      };
    case types.SET_USER_INIT:
      return {
        ...state,
        userData: payload.userData,
      };

    default:
      return state;
  }
};

export default userReducer;
