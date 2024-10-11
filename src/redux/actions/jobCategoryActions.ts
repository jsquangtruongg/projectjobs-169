import * as types from "../constants/authConstants";
import { getJobALLCategoryAPI } from "../../api/job-category";
import { AppDispatch } from "../store";
import { setError } from "./globalAction";
import { getJob } from "./jobActions";

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
