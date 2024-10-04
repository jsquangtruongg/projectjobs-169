import { IJobData } from "../../redux/reducers/job";
import { API } from "../config";

export type IResponse = {
  jobData: IJobData;
  mes: "string";
  err: number;
};

export type IResponses = {
  jobDataList: IJobData[];
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

export const getJobAllAPI = async (): Promise<IResponses> => {
  const res = await API.get("/job");
  return {
    jobDataList: res.data.data || [],
    mes: res.data.mes,
    err: res.data.err,
  };
};

export const updateJobAPI = async (jobData: IJobData): Promise<IResponse> => {
  const { data } = await API.put(
    `job/${jobData.id}`,
    { ...jobData },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return {
    mes: data.mes,
    jobData: data.data || [],
    err: data.err,
  };
};

export const deleteJobAPI = async (id: number): Promise<IResponse> => {
  const { data } = await API.delete(`job/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    mes: data.mes,
    jobData: data.data || [],
    err: data.err,
  };
};

export const createJobAPI = async (jobData: IJobData): Promise<IResponse> => {
  const { data } = await API.post(
    "/job",
    { ...jobData },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return {
    mes: data.mes,
    jobData: data.data || [],
    err: data.err,
  };
};
