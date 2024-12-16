import { HttpClient } from "@/config/http-client";
import { LocalStorageAdapter } from "@/config/local-storage.adapter";
import { useCallback, useEffect, useState } from "react";
import { UserEntity } from "../entities/user.entity";
import { AuthService, LoginUserPayload } from "../services/auth.service";
import { Notification } from "@/config/notification";

const storage = new LocalStorageAdapter("token");
const httpClient = new HttpClient(storage);
const authService = new AuthService(storage, httpClient);

export function useAuth() {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [isLoading, setIsLoading] = useState(storage.hasToken());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!storage.hasToken()) return;

    authService
      .renewUser()
      .then((user) => {
        setUser(user);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setUser(null);
        setIsAuthenticated(false);
        Notification.error(HttpClient.handleError(error));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const loginUser = useCallback(async (payload: LoginUserPayload) => {
    try {
      const user = await authService.loginUser(payload);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      Notification.error(HttpClient.handleError(error));
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    // methods
    loginUser,
  };
}
