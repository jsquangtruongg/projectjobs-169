import { getUserAPI } from "../../api/user";
import * as types from "../constants/authConstants";
import { IUserData } from "../reducers/user";
import { AppDispatch } from "../store";

export const setUserInit =
  (userData: IUserData) => async (dispatch: AppDispatch) => {
    dispatch({
      type: types.SET_USER_INIT,
      payload: { userData },
    });
  };

export const setUser = () => async (dispatch: AppDispatch) => {
  try {
    const { userData } = await getUserAPI();
    dispatch({
      type: types.SET_USER_INFO,
      payload: { userData },
    });
  } catch (error) {}
};
