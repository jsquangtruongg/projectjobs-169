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
  applyData: IApplyData,
  file: File | null
): Promise<IResponse> => {
  const formData = new FormData();
  if (file) {
    formData.append("img", file);
  }
  const { updatedAt, createdAt, ...resApplyData } = applyData;

  Object.keys(resApplyData).forEach((key) => {
    let value = resApplyData[key as keyof typeof resApplyData];
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const { data } = await API.post(
    "/job-apply",
    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return {
    mes: data.mes,
    applyData: data.data || ({} as IApplyData),
    err: data.err,
  };
};

export const deleteApplyAPI = async (id: number): Promise<IResponse> => {
  const { data } = await API.delete(`/job-apply?id=${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    mes: data.mes,
    applyData: data.data || [],
    err: data.err,
  };
};
