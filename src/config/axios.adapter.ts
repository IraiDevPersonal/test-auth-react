import axios, { AxiosInstance } from "axios";
import { LocalStorageAdapter } from "./local-storage.adapter";

export class AxiosAdapter {
  constructor(private readonly localStorage: LocalStorageAdapter) {}

  public handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      return `${error.message}`;
    }

    return `${error}`;
  }

  static handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      return `${error.message}`;
    }

    return `${error}`;
  }

  public appendAuthorizationToken(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.request.use((config) => {
      const token = this.localStorage.getFromStorage();

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    });
  }
}
