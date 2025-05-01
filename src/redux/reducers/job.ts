import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";
export type IUser = {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type ICategory = {
  id: number;
  title: string;
  describe: string;
};
export type ILike = {
  id: number;
  user_id: number;
  job_id: number;
};
export type IJobData = {
  id: number;
  title: string;
  content: string;
  img: string | File;
  salary: string;
  experience: string;
  location: string;
  Grade: string;
  Education: string;
  positions_needed: string;
  work_type: string;
  user_id: number;
  jobCategory_id: number;
  createdAt: string;
  updatedAt: string;
  userData: IUser;
  categoryData: ICategory;
  like_count: number;
};

export type IJob = {
  isLoading: boolean;
  jobData: IJobData[];
  jobDataList: IJobData[];
};

const initialState: IJob = {
  isLoading: false,
  jobData: [],
  jobDataList: [],
};

const jobReducer = (
  state = initialState,
  action: PayloadAction<Partial<IJob> & { jobId?: number; likeCount?: number }>
) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_JOB:
      const updatedState = {
        ...state,
        jobData: payload.jobData || [],
      };
      console.log("Reducer GET_JOB:", updatedState);
      return updatedState;
    case types.GET_JOB_ALL:
      const i = {
        ...state,
        jobDataList: payload.jobDataList || [],
      };
      console.log(i, "abc");
      return i;
    case types.UPDATE_JOB_LIKE:
      return {
        ...state,
        jobDataList: state.jobDataList.map((job) =>
          job.id === payload.jobId
            ? {
                ...job,
                like_count: payload.likeCount ?? job.like_count,
              }
            : job
        ),
      };
    default:
      return state;
  }
};

export default jobReducer;
