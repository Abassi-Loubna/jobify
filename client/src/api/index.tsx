import axios from "axios";

const api = axios.create({
  baseURL:"http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // للـ Admin استخدم adminToken
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("token");
    const token = adminToken || userToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;