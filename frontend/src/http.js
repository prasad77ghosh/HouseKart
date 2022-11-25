import axios from "axios";

export default axios.create({
  baseURL: "https://busy-jade-seagull-tutu.cyclic.app/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
