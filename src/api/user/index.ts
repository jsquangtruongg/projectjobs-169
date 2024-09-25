import { IListUser, IUserData } from "../../redux/reducers/user";
import { API } from "../config";

export type IResponse = {
  userData: IUserData;
  mes: "string";
  err: number;
};

export type IResponses = {
  userDataList: IListUser[];
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

export const getUserAllAPI = async (): Promise<IResponses> => {
  const { data } = await API.get("/user/users");
  return {
    mes: data.mes,
    userDataList: data.data || [],
    err: data.err,
  };
};
