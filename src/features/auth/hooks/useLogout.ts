import { useTransition } from "react";
import { useAuthContext } from "../context/Auth.context";

export function useLogout() {
  const { logoutUser } = useAuthContext();
  const [isLoading, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser();
    });
  };

  return {
    isLoading,
    handleLogout,
  };
}
