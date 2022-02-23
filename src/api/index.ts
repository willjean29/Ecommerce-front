import axios from "axios";
import { IAuthResponse } from "store/users/interfaces/user.interface";
const baseURL = process.env.REACT_APP_URL_BACKEND as string;
const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("token_refresh");
  if (token) {
    config.headers = {
      Authorization: "Bearer " + token,
      "x-api-refresh-token": refreshToken!,
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    console.log({ ...err });
    if (err.message === "Network Error") {
      return Promise.reject(err);
    }

    const originalRequest = err.config;
    const jwtExpiredMessage = err.response?.data?.detail.name;
    const refreshToken = localStorage.getItem("token_refresh");
    console.log(jwtExpiredMessage);
    console.log(refreshToken);
    console.log(originalRequest._retry);
    if (refreshToken && !originalRequest._retry && jwtExpiredMessage === "TokenExpiredError") {
      originalRequest._retry = true;
      console.log(originalRequest._retry);
      return api
        .post<IAuthResponse>("/auth/refresh", {
          refreshToken,
        })
        .then((response) => {
          console.log("sadasd");
          if (response.status === 200) {
            const {
              data: { token, token_refresh },
            } = response;
            console.log(token);
            localStorage.setItem("token", token);
            localStorage.setItem("token_refresh", token_refresh);
            return api(originalRequest);
          }
        });
    }
    return Promise.reject(err);
  }
);

export default api;
