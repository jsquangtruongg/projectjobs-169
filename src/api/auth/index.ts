import { API } from "../config";

export type IAuthUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ISignInResponse = {
  mes: string;
};

export const signIn = async (
  data: IAuthUser
): Promise<ISignInResponse | null> => {
  localStorage.removeItem("profile");
  const res = await API.post("/auth/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  localStorage.setItem(
    "profile",
    JSON.stringify({ accessToken: res.data.access_token })
  );
  return { mes: res.data.mes };
};

export const login = async (
  data: IAuthUser
): Promise<ISignInResponse | null> => {
  localStorage.removeItem("profile");
  const res = await API.post("/auth/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  localStorage.setItem(
    "profile",
    JSON.stringify({ accessToken: res.data.access_token })
  );
  return { mes: res.data.mes };
};
