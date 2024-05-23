// axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.npoint.io/644e3e9611e9d4c1728d",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt"); // Assuming you store the JWT in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
