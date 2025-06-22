import * as types from "../constants/authConstants";
import {
  createJobCategoryAPI,
  deleteJobCategoryAPI,
  getJobALLCategoryAPI,
  getJobCategoryIdAPI,
  updateJobCategoryAPI,
} from "../../api/job-category";
import { AppDispatch } from "../store";
import { setError } from "./globalAction";
import { IJobCategoryData } from "../reducers/jobCategory";

export const getJobALLCategory =
  (title = "") =>
  async (dispatch: AppDispatch) => {
    try {
      const { jobCategoryDataList } = await getJobALLCategoryAPI(title);
      dispatch({
        type: types.GET_JOB_CATEGORY_ALL,
        payload: { jobCategoryDataList },
      });
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };

export const getIdJobCategoryAction =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await getJobCategoryIdAPI(id);
      if (response.err === 0) {
        dispatch({
          type: types.GET_JOB_CATEGORY_ID,
          payload: { jobCategoryData: response.jobCategoryData },
        });
      }
    } catch (error) {}
  };
export const postCreateJobCategory =
  (data: IJobCategoryData, file: File) => async (dispatch: AppDispatch) => {
    try {
      await createJobCategoryAPI(data, file);
      dispatch(getJobALLCategory());
    } catch (error: any) {
      dispatch(setError(error.response?.data.mess));
    }
  };

export const updateJobCategory =
  (data: IJobCategoryData) => async (dispatch: AppDispatch) => {
    try {
      await updateJobCategoryAPI(data);
      dispatch(getJobALLCategory());
    } catch (error) {
      console.log(error);
    }
  };

export const deleteJobCategory =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      await deleteJobCategoryAPI(id);
      dispatch(getJobALLCategory());
    } catch (error: any) {
      dispatch(setError(error.response.data.mess));
    }
  };
