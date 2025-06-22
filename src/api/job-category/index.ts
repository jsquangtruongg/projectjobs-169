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

export const getJobALLCategoryAPI = async (
  title?: string
): Promise<IResponses> => {
  const params = new URLSearchParams();
  if (title) params.append("title", title);
  const res = await API.get("/job-category");
  return {
    mes: res.data.mes,
    jobCategoryDataList: res.data.data || [],
    err: res.data.err,
  };
};

export const getJobCategoryIdAPI = async (id: number): Promise<IResponse> => {
  const res = await API.get(`job-category/${id}`);
  console.log(res);
  return {
    jobCategoryData: res.data.data,
    mes: res.data.mes,
    err: res.data.err,
  };
};
export const createJobCategoryAPI = async (
  jobCategoryData: IJobCategoryData,
  file: File | null
): Promise<IResponse> => {
  const formData = new FormData();

  for (const key in jobCategoryData) {
    if (Object.prototype.hasOwnProperty.call(jobCategoryData, key)) {
      if (key === "img" && file) continue;

      const value = (jobCategoryData as any)[key];
      formData.append(
        key,
        typeof value === "object" ? JSON.stringify(value) : String(value)
      );
    }
  }

  if (file) {
    formData.append("img", file);
  }

  console.log("Nội dung formData gửi lên:");
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const { data } = await API.post("/job-category", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return {
    mes: data.mes,
    jobCategoryData: data.data || {},
    err: data.err,
  };
};

export const updateJobCategoryAPI = async (
  jobCategoryData: IJobCategoryData
): Promise<IResponse> => {
  const { data } = await API.put(
    `/job-category/${jobCategoryData.id}`,
    { ...jobCategoryData },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return {
    mes: data.mes,
    jobCategoryData: data.data || [],
    err: data.err,
  };
};

export const deleteJobCategoryAPI = async (id: number): Promise<IResponse> => {
  const { data } = await API.delete(`/job-category/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    mes: data.mes,
    jobCategoryData: data.data || [],
    err: data.err,
  };
};
