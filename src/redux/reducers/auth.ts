import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";

type IAuth = {
  accessToken: string;
  isLoading: boolean;
  message?: string;
  error?: string;
};

const initialState: IAuth = {
  accessToken: "",
  isLoading: false,
};

const authReducer = (
  state = initialState,
  action: PayloadAction<Partial<IAuth>>
) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload.accessToken,
      };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        accessToken: payload.accessToken,
      };

    default:
      return state;
  }
};

export default authReducer;
