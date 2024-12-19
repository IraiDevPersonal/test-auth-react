import { formDataToObject } from "@/utils/helpers.util";
import { useActionState, useCallback } from "react";
import { ZodError, ZodObject, ZodRawShape } from "zod";

export type UseFormState<T extends object> = {
  errors?: Partial<Record<keyof T, string>>;
  values: T;
};

export type UseFormRegister<T extends object> = (name: keyof T) => {
  name: keyof T;
  disabled: boolean;
  error: Partial<Record<keyof T, string>>[keyof T] | undefined;
  defaultValue: T[keyof T];
};

type Props<T extends object> = {
  initialState: UseFormState<T>;
  schema: ZodObject<ZodRawShape>;
  fn: (props: T) => Promise<void>;
};

export function useForm<T extends object>({
  initialState,
  schema,
  fn,
}: Props<T>) {
  const [formState, formAction, isFormPending] = useActionState<
    UseFormState<T>,
    FormData
  >(async (prev, formData): Promise<UseFormState<T>> => {
    const { success, data, error } = schema.safeParse(
      formDataToObject(formData)
    );

    if (!success) {
      const entries = Object.entries((error as ZodError).flatten().fieldErrors);
      const errors = Object.fromEntries(
        entries.map(([key, value = []]) => [key, value.join(", ")])
      );

      return {
        ...prev,
        errors: errors as UseFormState<T>["errors"],
      };
    }

    await fn(data as T);

    return {
      errors: undefined,
      values: data as T,
    };
  }, initialState);

  const register: UseFormRegister<T> = useCallback(
    (name) => ({
      name,
      disabled: isFormPending,
      error: formState.errors?.[name],
      defaultValue: formState.values[name],
    }),
    [formState, isFormPending]
  );

  return {
    register,
    formState,
    formAction,
    isFormPending,
  };
}
