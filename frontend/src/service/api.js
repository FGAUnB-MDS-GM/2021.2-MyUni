import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://ec2-44-196-41-106.compute-1.amazonaws.com",
});
if (token) {
  api.defaults.headers.Authorization = `${token}`;
}

export default api;
