import { getJobAPI } from "../../api/job";
import * as types from "../constants/authConstants";
import { AppDispatch } from "../store";
import { setError } from "./globalAction";

export const getJob = () => async (dispatch: AppDispatch) => {
  try {
    const { jobData } = await getJobAPI();
    dispatch({
      type: types.GET_JOB,
      payload: { jobData },
    });
  } catch (error: any) {
    dispatch(setError(error.response?.data.mess));
  }
};
