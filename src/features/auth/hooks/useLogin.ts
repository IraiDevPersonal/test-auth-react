import { useForm } from "@/hooks";
import { AuthLoginPayload, authSchema } from "../models/auth.model";
import { useAuthContext } from "../stores/AuthProvider";

export function useLogin() {
  const { loginUser } = useAuthContext();
  const { formState, formAction, isFormPending, register } =
    useForm<AuthLoginPayload>({
      schema: authSchema,
      initialState: {
        values: {
          email: "",
          password: "",
        },
      },
      fn: loginUser,
      shouldControlledErrors: false,
    });

  return { formAction, register, formState, isFormPending };
}
