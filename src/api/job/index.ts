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

export const getJobAPI = async (id: number): Promise<IResponse> => {
  const res = await API.get(`/job/id?jobCategory_id=${id}`);
  return {
    jobData: res.data.data,
    mes: res.data.mes,
    err: res.data.err,
  };
};

export const getJobAllAPI = async (
  content?: string,
  createdAt?: string,
  lastName?: string
): Promise<IResponses> => {
  const params = new URLSearchParams();
  if (content) params.append("content", content);
  if (createdAt) params.append("createdAt", createdAt);
  if (lastName) params.append("lastName", lastName);
  const res = await API.get(`/job?${params.toString()}`);

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

export const createJobAPI = async (
  jobData: IJobData,
  file: File | null
): Promise<IResponse> => {
  const formData = new FormData();

  if (file) {
    formData.append("img", file); // Chỉ thêm ảnh nếu có
  }

  // Loại bỏ `id` trước khi gửi formData
  const { id, img, updatedAt, userData, createdAt, ...restJobData } = jobData;

  Object.keys(restJobData).forEach((key) => {
    let value = restJobData[key as keyof typeof restJobData];

    // Convert `user_id` and `JobCategory_id` to string
    if (key === "user_id" || key === "JobCategory_id") {
      value = String(value); // Chuyển đổi thành chuỗi
    }

    if (value !== undefined && value !== null) {
      formData.append(key, String(value)); // Ép kiểu tất cả về string
    }
  });
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  const { data } = await API.post("/job", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(data.data);
  return {
    mes: data.mes,
    jobData: data.data || ({} as IJobData),
    err: data.err,
  };
};
