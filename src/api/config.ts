import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
export const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

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
  // Xử lý phản hồi thành công ở đây nếu cần
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
