import { useActionState } from "react";
import { useAuthContext } from "../stores/AuthProvider";

export function useLogin() {
  const { loginUser } = useAuthContext();

  const [, loginAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      await loginUser(formData);
    },
    null
  );

  console.log({ isPending });

  return {
    loginAction,
  };
}
