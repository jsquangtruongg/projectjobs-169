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


export const editUser = async (userData: IUserData): Promise<IResponse> => {
  const { data } = await API.put(
    `/user/users/${userData.id}`,
    { ...userData },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return {
    mes: data.mes,
    userData: data.data || [],
    err: data.err,
  };
};

export const deleteUserAPI = async (userId: number): Promise<IResponse> => {
  const { data } = await API.delete(`/user/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("du lieu tra ve", data);
  return {
    mes: data.mes,
    userData: data.data || [],
    err: data.err,
  };
};