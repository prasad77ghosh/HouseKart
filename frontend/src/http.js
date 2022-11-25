import axios from "axios";

export default axios.create({
  baseURL: "https://fine-tan-bass-sari.cyclic.app/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
