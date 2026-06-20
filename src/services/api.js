import axios from "axios";

const api = axios.create({
  baseURL: "https://autopilot-elude-ungloved.ngrok-free.dev",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;