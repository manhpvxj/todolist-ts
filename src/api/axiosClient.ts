import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8888",
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error;
  }
);
export default axiosClient;