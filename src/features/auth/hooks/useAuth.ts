import { AxiosAdapter } from "@/config/axios.adapter";
import { LocalStorageAdapter } from "@/config/local-storage.adapter";
import { useCallback, useEffect, useState } from "react";
import { UserEntity } from "../entities/user.entity";
import { AuthService, LoginUserPayload } from "../services/auth.service";

const ls = new LocalStorageAdapter("token");
const axiosAdapter = new AxiosAdapter(ls);
const authService = new AuthService(ls, axiosAdapter);

export function useAuth() {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [isLoading, setIsLoading] = useState(ls.hasToken());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!ls.hasToken()) return;

    authService
      .renewUser()
      .then((user) => {
        setUser(user);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        const errorMessage = `${error}`;
        setUser(null);
        setIsAuthenticated(false);
        alert(errorMessage);
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
      alert(`${error}`);
      setUser(null);
      setIsAuthenticated(false);
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
