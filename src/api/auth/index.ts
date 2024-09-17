import { API } from "../config";

export type IAuthUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ISignInResponse = {
  mes: string;
  accessToken: string;
};

export const signIn = async (data: IAuthUser): Promise<ISignInResponse> => {
  const res = await API.post("/auth/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return { mes: res.data.mes, accessToken: res.data.access_token };
};

export const login = async (
  data: Pick<IAuthUser, "email" | "password">
): Promise<ISignInResponse> => {
  const res = await API.post("/auth/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return { mes: res.data.mes, accessToken: res.data.access_token };
};
