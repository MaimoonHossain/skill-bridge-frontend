import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// Interceptor to add default headers if not provided
axiosInstance.interceptors.request.use((config) => {
  config.headers["Content-Type"] =
    config.headers["Content-Type"] || "application/json";
  return config;
});

export default axiosInstance;
