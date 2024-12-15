import axios from "axios";

export const userStoreApi = axios.create({
  baseURL: "http://localhost:3000/api",
});
