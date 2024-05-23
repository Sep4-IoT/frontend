import axios from "axios";

const generateSessionToken = () => {
  return "12345678";
};

const apiClient = axios.create({
  baseURL: "https://api.npoint.io/97ae39192bbd08b53d31",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = generateSessionToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
