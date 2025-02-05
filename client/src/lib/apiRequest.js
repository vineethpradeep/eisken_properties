import axios from "axios";

const apiRequest = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://eiskenproperties-api.vercel.app/api",
  withCredentials: true,
});

apiRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiRequest;
