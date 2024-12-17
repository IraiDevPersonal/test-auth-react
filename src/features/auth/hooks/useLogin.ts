import { useActionState } from "react";
import { useAuthContext } from "../context/Auth.context";

export function useLogin() {
  const { loginUser } = useAuthContext();

  const [, loginAction] = useActionState(
    async (_: unknown, formData: FormData) => {
      await loginUser(formData);
    },
    null
  );

  return {
    loginAction,
  };
}
