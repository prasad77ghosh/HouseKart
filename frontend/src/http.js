import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.29.21:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
