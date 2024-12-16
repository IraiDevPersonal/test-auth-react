import { HttpClient } from "../http-client";

const time = 1500;

export const userStoreApi = HttpClient.create({
  baseURL: "http://localhost:3000/api",
});

userStoreApi.interceptors.response.use(
  (response) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(response), time);
    });
  },
  (error) => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(error), time);
    });
  }
);
