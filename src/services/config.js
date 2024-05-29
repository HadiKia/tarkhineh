import axios from "axios";

const api = axios.create({
  baseURL: "https://hadikia.github.io/tarkhineh-api/db.json",
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;
