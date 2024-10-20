import { IApplyData } from "../../redux/reducers/apply";
import { API } from "../config";

export type IResponse = {
  applyData: IApplyData;
  mes: "string";
  err: number;
};

export type IResponses = {
  applyDataList: IApplyData[];
  mes: "string";
  err: number;
};
export const getApplyAllAPI = async (): Promise<IResponses> => {
  const res = await API.get("/job-apply");
 
  return {
    mes: res.data.mes,
    applyDataList: res.data.data || [],
    err: res.data.err,
  };
};

export const getIdApplyAPI = async (id: number): Promise<IResponse> => {
  const res = await API.get(`/job-apply?id=${id}`);
  console.log("abc", res.data);
  return {
    applyData: res.data.data,
    mes: res.data.mes,
    err: res.data.err,
  };
};

export const createAppLyAPI = async (
  applyData: IApplyData
): Promise<IResponse> => {
  const { data } = await API.post(
    "/job-apply",
    { ...applyData },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("aaaa", data);
  return {
    mes: data.mes,
    applyData: data.data || {},
    err: data.err,
  };
};
