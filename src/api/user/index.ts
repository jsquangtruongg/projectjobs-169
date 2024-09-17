import { IUserData } from "../../redux/reducers/user";
import { API } from "../config";

export type IResponse = {
  userData: IUserData;
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
