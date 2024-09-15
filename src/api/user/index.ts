import { API } from "../config";

export type IUserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: null;
  createdAt: string;
  updatedAt: string;
  roleData: null;
};

export type IResponse = {
  userData: IUserInfo;
  mes: "string";
  err: number;
} | null;

export type ISignInResponse = {
  mes: string;
};

export const getUser = async (): Promise<IResponse> => {
  const { data } = await API.get("/user");

  return { mes: data.mes, userData: data.userData, err: data.err };
};
