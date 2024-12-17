import { BrowserStorage } from "@/config/browser-storage";
import { HttpClient } from "@/config/http-client";
import { Notification } from "@/config/notification";
import { useMountEffect } from "@/hooks";
import { formDataToObject } from "@/utils/helpers.util";
import { useState } from "react";
import { UserEntity } from "../entities/user.entity";
import { AuthService, LoginUserPayload } from "../services/auth.service";

const storage = new BrowserStorage("token");
const httpClient = new HttpClient(storage);
const authService = new AuthService(storage, httpClient);

export function useAuth() {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [isLoading, setIsLoading] = useState(storage.hasToken());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useMountEffect(() => {
    if (!storage.hasToken()) return;

    authService
      .renewUser()
      .then((user) => {
        setUser(user);
        setIsAuthenticated(true);
        welcomeMessage(user.name);
      })
      .catch((error) => {
        setUser(null);
        setIsAuthenticated(false);
        errorMessage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const loginUser = async (formaData: FormData) => {
    try {
      const payload = formDataToObject<LoginUserPayload>(formaData);
      const user = await authService.loginUser(payload);
      setUser(user);
      setIsAuthenticated(true);
      welcomeMessage(user.name);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      errorMessage(error);
    }
  };

  const logoutUser = async () => {
    try {
      const message = await authService.logoutUser();
      Notification.success(message);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      errorMessage(error);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    // methods
    loginUser,
    logoutUser,
  };
}

const welcomeMessage = (userName: string) => {
  Notification.success(`Bienvenido ${userName}`);
};
const errorMessage = (error: unknown) => {
  Notification.error(HttpClient.handleError(error));
};
