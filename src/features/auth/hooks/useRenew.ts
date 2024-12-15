import { use, useEffect } from "react";
import { useAuthContext } from "../context/Auth.context";
import { UserEntity } from "../entities/user.entity";

let initUser: UserEntity | null = null;

export function useRenew(renew: Promise<UserEntity | null>) {
  initUser = use(renew);

  const { setAuth } = useAuthContext();

  useEffect(() => {
    if (initUser) {
      setAuth({
        isAuthenticated: true,
        user: initUser,
      });
    }
  }, [setAuth]);
}
