import { BrowserStorage } from "@/config/browser-storage";
import { HttpClient } from "@/config/http-client";
import { Notification } from "@/config/notification";
import { useMountEffect } from "@/hooks";
import { useState } from "react";
import { UserEntity } from "../entities/user.entity";
import { AuthService } from "../services/auth.service";
import { AuthLoginPayload } from "../models/auth.model";

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
        welcomeNotification(user.name);
      })
      .catch((error) => {
        setUser(null);
        setIsAuthenticated(false);
        errorNotification(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const loginUser = async (payload: AuthLoginPayload) => {
    try {
      const user = await authService.loginUser(payload);
      setUser(user);
      setIsAuthenticated(true);
      welcomeNotification(user.name);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      errorNotification(error);
    }
  };

  const logoutUser = async () => {
    try {
      const message = await authService.logoutUser();
      Notification.success(message);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      errorNotification(error);
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

const welcomeNotification = (userName: string) => {
  Notification.success(`Bienvenido ${userName}`);
};
const errorNotification = (error: unknown) => {
  Notification.error(HttpClient.getErrorMessage(error));
};
