import axios from "axios";

export const api = axios.create({
  baseURL: "http://ec2-44-196-41-106.compute-1.amazonaws.com",
});
