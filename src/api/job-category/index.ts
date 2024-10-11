import { IJobCategoryData } from "../../redux/reducers/jobCategory";
import { API } from "../config";

export type IResponse = {
  jobCategoryData: IJobCategoryData;
  mes: "string";
  err: number;
};

export type IResponses = {
  jobCategoryDataList: IJobCategoryData[];
  mes: "string";
  err: number;
};

export type ISignInResponse = {
  mes: string;
};

export const getJobALLCategoryAPI = async (): Promise<IResponses> => {
  const res = await API.get("/job-category");
  return {
    mes: res.data.mes,
    jobCategoryDataList: res.data.data || [],
    err: res.data.err,
  };
};
