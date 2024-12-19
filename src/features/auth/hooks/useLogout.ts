import { useTransition } from "react";
import { useAuthContext } from "../stores/AuthProvider";

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
