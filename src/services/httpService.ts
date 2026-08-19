import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

type RetryAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let refreshPromise: Promise<unknown> | null = null;

function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`, {
        withCredentials: true,
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

app.interceptors.request.use(
  (res) => res,
  (err) => Promise.reject(err),
);

app.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalConfig = err.config as RetryAxiosRequestConfig;

    // 401 => NOT AUTHORIZED
    if (
      err.response?.status === 401 &&
      originalConfig &&
      !originalConfig._retry &&
      !originalConfig.url?.includes("/user/refresh-token")
    ) {
      originalConfig._retry = true;
      try {
        await refreshAccessToken();
        return app(originalConfig);
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
