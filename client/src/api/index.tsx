import axios from "axios";

const api = axios.create({
  baseURL:"https://serverts-1-n6b0.onrender.com/api",
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