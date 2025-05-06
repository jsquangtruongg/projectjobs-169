import { getAllJobsAPI, getIdJobsAPI } from "../../api/job";
import {
  deleteUserAPI,
  editUser,
  getAdminInfoAPI,
  getUserAPI,
  getUserAllAPI,
} from "../../api/user";
import * as types from "../constants/authConstants";
import { IUserData } from "../reducers/user";
import { AppDispatch } from "../store";
import { setError } from "./globalAction";

export const setUserInit =
  (userData: IUserData) => async (dispatch: AppDispatch) => {
    dispatch({
      type: types.SET_USER_INIT,
      payload: { userData },
    });
  };

export const getUserAll =
  (firstName = "", lastName = "", role_code = "") =>
  async (dispatch: AppDispatch) => {
    try {
      const { userDataList } = await getUserAllAPI(
        firstName,
        lastName,
        role_code
      );
      dispatch({
        type: types.GET_USER_ALL,
        payload: { userDataList },
      });
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
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
export const putUpdateUser =
  (data: IUserData, file: File | null) => async (dispatch: AppDispatch) => {
    try {
      await editUser(data, file);
      dispatch(getUserAll());
    } catch (error) {
      console.error(error);
    }
  };
export const deleteUser = (userId: number) => async (dispatch: AppDispatch) => {
  try {
    await deleteUserAPI(userId);
    dispatch(getUserAll());
  } catch (error) {
    console.error(error);
  }
};
export const getAllJobsAction = () => async (dispatch: AppDispatch) => {
  try {
    const res = await getAllJobsAPI();
    console.log(res, "👉 FULL RES từ API");

    const { jobDataUser } = res;
    console.log(jobDataUser, "👉 DATA jobDataUser");

    dispatch({
      type: types.GET_JOB_USER_ALL,
      payload: { jobDataUser },
    });
  } catch (error: any) {
    console.error("Lỗi khi lấy danh sách công việc:", error);
    dispatch(setError("Không thể lấy danh sách công việc"));
  }
};
export const getIdDataUserAction =
  (userId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await getIdJobsAPI(userId);
      console.log("API response data", response.userIdData);
      if (response.err === 0) {
        dispatch({
          type: types.GET_ID_DATA_USER,
          payload: { userIdData: response.userIdData },
        });
      } else {
        console.error("Lỗi từ API:", response.mes);
      }
    } catch (error) {
      console.error("Lỗi khi gọi getIdJobsAPI:", error);
    }
  };
