import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { io } from "socket.io-client";
export const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

export const socket = io("http://localhost:8000");
console.log(socket, "aaa");
const authInterceptorRequest = (
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

const authInterceptorResponse = async (
  response: AxiosResponse
): Promise<AxiosResponse> => {
  return response;
};

const authInterceptorResponseError = async (
  error: AxiosError
): Promise<never> => {
  if (error.response?.status === 401) {
    localStorage.removeItem("profile");
    window.location.href = "/login";
  }
  return Promise.reject(error);
};

export { authInterceptorResponse, authInterceptorResponseError };
API.interceptors.request.use(authInterceptorRequest);
API.interceptors.response.use(
  authInterceptorResponse,
  authInterceptorResponseError
);
