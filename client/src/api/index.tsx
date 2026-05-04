import axios from "axios";

const api = axios.create({
  baseURL: "https://jobify-server-3.onrender.com/api",
  withCredentials: true,
});
export default api;

