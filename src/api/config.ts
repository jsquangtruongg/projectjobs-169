import axios, { InternalAxiosRequestConfig } from "axios";
export const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

const authInterceptor = (
  req: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  if (localStorage.getItem("profile")) {
    const accessToken = JSON.parse(
      localStorage.getItem("profile") ?? ""
    )?.accessToken;
    if (accessToken) {
      req.headers.Authorization = `${accessToken}`;
    }
  }

  return req;
};

API.interceptors.request.use(authInterceptor);
