import { getAdminInfoAPI, getUserAPI } from "../../api/user";
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
export const getAdminInfo = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({
      type: types.USER_CHANGE_LOADING,
      payload: { userData: null },
    });
    const { userData } = await getAdminInfoAPI();
    dispatch({
      type: types.SET_USER_INFO,
      payload: { userData },
    });
  } catch (error) {}
};

export const setUser = () => async (dispatch: AppDispatch) => {
  try {
    const { userData } = await getUserAPI();
    dispatch({
      type: types.SET_USER_INFO,
      payload: { userData },
    });
  } catch (error) {
    localStorage.removeItem("profile");
  }
};

export const removeUser = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: types.REMOVE_USER,
    payload: { userData: null },
  });
};
