// src/jwt/axiosInstance.js
import axios from "axios";
import { getToken, generateToken } from "./jwtUtils";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://your.api.base.url",
});

axiosInstance.interceptors.request.use(
  (config) => {
    let token = getToken();

    if (!token) {
      token = generateToken();
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
