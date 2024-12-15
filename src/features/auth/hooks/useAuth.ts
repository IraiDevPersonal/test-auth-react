import { LocalStorageAdapter } from "@/config/local-storage.adapter";
import { useCallback } from "react";
import { useAuthContext } from "../context/Auth.context";
import { AuthService, LoginUserPayload } from "../services/auth.service";

const ls = new LocalStorageAdapter("token");
const authService = new AuthService(ls);

export function useAuth() {
  const { isAuthenticated, setAuth, user } = useAuthContext();

  const loginUser = useCallback(
    async (payload: LoginUserPayload) => {
      try {
        const user = await authService.loginUser(payload);
        setAuth({
          isAuthenticated: true,
          user,
        });
      } catch (error) {
        alert(`${error}`);
        setAuth({
          isAuthenticated: false,
          user: null,
        });
        return null;
      }
    },
    [setAuth]
  );

  return {
    // states
    user,
    isAuthenticated,
    // functions
    loginUser,
  };
}
