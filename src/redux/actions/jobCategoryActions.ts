import * as types from "../constants/authConstants";
import {
  createJobCategoryAPI,
  deleteJobCategoryAPI,
  getJobALLCategoryAPI,
  updateJobCategoryAPI,
} from "../../api/job-category";
import { AppDispatch } from "../store";
import { setError } from "./globalAction";
import { getJob } from "./jobActions";
import { IJobCategoryData } from "../reducers/jobCategory";

export const getJobALLCategory = () => async (dispatch: AppDispatch) => {
  try {
    const { jobCategoryDataList } = await getJobALLCategoryAPI();
    const firstCategoryId = jobCategoryDataList[0]?.id;
    dispatch({
      type: types.GET_JOB_CATEGORY_ALL,
      payload: { jobCategoryDataList },
    });

    dispatch(getJob(Number(firstCategoryId) || 0));
  } catch (error: any) {
    dispatch(setError(error.response?.data.mess));
  }
};

export const postCreateJobCategory =
  (data: IJobCategoryData) => async (dispatch: AppDispatch) => {
    try {
      await createJobCategoryAPI(data);
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
