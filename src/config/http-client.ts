import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { BrowserStorage } from "./browser-storage";

export class HttpClient {
  constructor(private readonly localStorage: BrowserStorage) {}

  public static create(config?: CreateAxiosDefaults) {
    return axios.create(config);
  }

  public static getErrorMessage(error: unknown) {
    return handleError(error);
  }

  public getErrorMessage(error: unknown) {
    return handleError(error);
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

// UTILITY METHODS

function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const defaultError = error.message;
    return error.response?.data?.error ?? defaultError;
  }

  const { message } = error as Error;
  return message;
}
