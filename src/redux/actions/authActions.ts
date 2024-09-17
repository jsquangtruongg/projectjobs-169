import { NavigateFunction } from "react-router";
import { IAuthUser, login, signIn } from "../../api/auth";
import * as types from "../constants/authConstants";
import { AppDispatch } from "../store";
import { setError } from "./globalAction";
import { setUser } from "./userAction";

export const initializeAuth = () => async (dispatch: AppDispatch) => {
  const accessToken = JSON.parse(
    localStorage.getItem("profile") || "{}"
  )?.accessToken;

  if (accessToken) {
    dispatch(setAccessToken(accessToken));
  }
};

export const signInAction =
  (data: IAuthUser, navigate: NavigateFunction) =>
  async (dispatch: AppDispatch) => {
    localStorage.removeItem("profile");
    try {
      const { accessToken } = await signIn(data);

      await dispatch({ type: types.SIGN_UP_SUCCESS, payload: { accessToken } });

      localStorage.setItem("profile", JSON.stringify({ accessToken }));

      await dispatch(setUser());

      navigate("/home");
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };

export const loginAction =
  (data: Pick<IAuthUser, "email" | "password">, navigate: NavigateFunction) =>
  async (dispatch: AppDispatch) => {
    localStorage.removeItem("profile");
    try {
      const { accessToken } = await login(data);

      await dispatch({ type: types.SIGN_IN_SUCCESS, payload: { accessToken } });

      localStorage.setItem("profile", JSON.stringify({ accessToken }));

      await dispatch(setUser());

      navigate("/home");
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };

export const setAccessToken =
  (accessToken: string) => async (dispatch: AppDispatch) => {
    dispatch({ type: types.SET_ACCESS_TOKEN, payload: { accessToken } });
  };
