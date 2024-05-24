// axiosInstance.js
import axios from "axios";
import { generateJwt } from "./jwtUtils";

const token = generateJwt({ username: "admin", password: "via" });

const apiClient = axios.create({
  baseURL: "https://api.npoint.io/97ae39192bbd08b53d31",
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
