import { IJobData } from "../../redux/reducers/job";
import { API } from "../config";

export type IResponse = {
  jobData: IJobData;
  mes: "string";
  err: number;
};

export type IJobResponse = {
  mes: string;
};

export const getJobAPI = async (): Promise<IResponse> => {
  const res = await API.get("/job");
  return {
    jobData: res.data.data,
    mes: res.data.mes,
    err: res.data.err,
  };
};
