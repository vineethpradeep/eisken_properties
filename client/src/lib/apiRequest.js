import axios from "axios";

const apiRequest = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://eiskenproperties-api.vercel.app/api",
  withCredentials: true,
});

export default apiRequest;
