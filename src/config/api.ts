import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

const apiAuthenticated = axios.create({
  baseURL: "http://localhost:3333",
  headers: { "content-type": "application/json" },
});

apiAuthenticated.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token-todo");
  if (config.headers === undefined) {
    config.headers = {};
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  throw new Error("Auth problem");
});
export { api, apiAuthenticated };
