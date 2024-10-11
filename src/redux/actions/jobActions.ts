import {
  createJobAPI,
  deleteJobAPI,
  getJobAllAPI,
  getJobAPI,
  updateJobAPI,
} from "../../api/job";
import * as types from "../constants/authConstants";
import { IJobData } from "../reducers/job";
import { AppDispatch } from "../store";
import { setError } from "./globalAction";

export const getJob = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const { jobData } = await getJobAPI(id);

    dispatch({
      type: types.GET_JOB,
      payload: { jobData },
    });
  } catch (error: any) {
    dispatch(setError(error.response?.data.mess));
  }
};

export const getJobAll =
  (content = "", createdAt = "", lastName = "") =>
  async (dispatch: AppDispatch) => {
    try {
      const { jobDataList } = await getJobAllAPI(content, createdAt, lastName);
      dispatch({
        type: types.GET_JOB_ALL,
        payload: { jobDataList },
      });
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };

export const updateJob = (data: IJobData) => async (dispatch: AppDispatch) => {
  try {
    await updateJobAPI(data);
    dispatch(getJobAll());
  } catch (error) {}
};

export const deleteJob = (id: number) => async (dispatch: AppDispatch) => {
  try {
    await deleteJobAPI(id);
    dispatch(getJobAll());
  } catch (error) {}
};

export const createJob =
  (data: IJobData, file: File) => async (dispatch: AppDispatch) => {
    try {
      await createJobAPI(data, file);
      dispatch(getJobAll());
    } catch (error) {}
  };
