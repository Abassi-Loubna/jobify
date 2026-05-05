import axios from "axios";

const api = axios.create({
  // تأكد من إضافة هذا المتغير في إعدادات Vercel (Environment Variables)
  baseURL: "https://serverts-1-n6b0.onrender.com/api",
  withCredentials: true, // ضروري جداً لإرسال الكوكيز إذا كنت تستخدمها
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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