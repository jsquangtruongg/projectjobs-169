import { Key } from "@mui/icons-material";
import { IUserData } from "../../redux/reducers/user";
import { API } from "../config";

export type IResponse = {
  userData: IUserData;
  mes: "string";
  err: number;
};

export type IResponses = {
  userDataList: IUserData[];
  mes: "string";
  err: number;
};

export type ISignInResponse = {
  mes: string;
};

export const getUserAPI = async (): Promise<IResponse> => {
  const { data } = await API.get("/user");
  return { mes: data.mes, userData: data.userData, err: data.err };
};

export const getAdminInfoAPI = async (): Promise<IResponse> => {
  const { data } = await API.get("/user/info-role-admin");
  return { mes: data.mes, userData: data.userData, err: data.err };
};

export const getUserAllAPI = async (
  firstName?: string,
  lastName?: string,
  role_code?: string
): Promise<IResponses> => {
  const params = new URLSearchParams();
  if (firstName) params.append("firstName", firstName);
  if (lastName) params.append("lastName", lastName);
  if (role_code) params.append("role_code", role_code);

  const { data } = await API.get(`/user/users?${params.toString()}`);

  return {
    mes: data.mes,
    userDataList: data.data || [],
    err: data.err,
  };
};

export const editUser = async (
  userData: IUserData,
  file: File | null
): Promise<IResponse> => {
  const formData = new FormData();
  if (file) {
    formData.append("avatar", file);
  }
  const { firstName, lastName, roleData, avatar, ...restUserData } = userData;
  if (lastName) {
    formData.append("lastName", lastName); // Thêm lastName nếu có
  }

  // Thêm firstName và role_code nếu có
  if (firstName) {
    formData.append("firstName", firstName);
  }

  
  Object.keys(restUserData).forEach((key) => {
    let value = restUserData[key as keyof typeof restUserData];
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  const { data } = await API.put(`/user/users/${userData.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return {
    mes: data.mes,
    userData: data.data || ({} as IUserData),
    err: data.err,
  };
};

export const deleteUserAPI = async (userId: number): Promise<IResponse> => {
  const { data } = await API.delete(`/user/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    mes: data.mes,
    userData: data.data || [],
    err: data.err,
  };
};
