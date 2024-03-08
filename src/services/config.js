import axios from "axios";

const api = axios.create({
  baseURL: "https://gifted-headscarf-hare.cyclic.cloud/",
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;
