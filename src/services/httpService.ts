import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

type RetryAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

app.interceptors.request.use(
  (res) => res,
  (err) => Promise.reject(err),
);

app.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    console.log(err);
    const originalConfig = err.config as RetryAxiosRequestConfig;
    // 401 => NOT AUTHORIZED
    if (err.response?.status === 401 && !originalConfig?._retry) {
      originalConfig._retry = true;
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
          {
            withCredentials: true,
          },
        );
        if (data) return app(originalConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  },
);

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;
