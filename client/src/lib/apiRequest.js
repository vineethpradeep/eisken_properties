import axios from "axios";

const apiRequest = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8800/api",
  withCredentials: true,
});

export default apiRequest;
