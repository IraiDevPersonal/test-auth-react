import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { LocalStorageAdapter } from "./local-storage.adapter";

export class HttpClient {
  constructor(private readonly localStorage: LocalStorageAdapter) {}

  public static create(config?: CreateAxiosDefaults) {
    return axios.create(config);
  }

  public handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      return `${error.message}`;
    }
    const { message } = error as Error;
    return message;
  }

  static handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      return `${error.message}`;
    }

    const { message } = error as Error;
    return message;
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
