import { Notification } from "@/config/notification";
import { formDataToObject } from "@/utils/helpers.util";
import { useActionState, useCallback, useEffect, useState } from "react";
import { ZodError, ZodObject, ZodRawShape } from "zod";

export type UseFormState<T extends object> = {
  errors?: Partial<Record<keyof T, string>>;
  values: T;
};

export type UseFormRegister<T extends object> = (name: keyof T) => {
  error: Partial<Record<keyof T, string>>[keyof T] | undefined;
  onChange: React.ChangeEventHandler<any>;
  defaultValue: T[keyof T];
  disabled: boolean;
  name: keyof T;
};

type Props<T extends object> = {
  fn: (props: T) => Promise<void>;
  schema: ZodObject<ZodRawShape>;
  initialState: UseFormState<T>;
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
    try {
      const { success, data, error } = schema.safeParse(
        formDataToObject(formData)
      );
      if (!success) {
        const entries = Object.entries(
          (error as ZodError).flatten().fieldErrors
        );
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
    } catch (error) {
      Notification.error(`${error}`);
      return initialState;
    }
  }, initialState);
  const [errors, setErrors] = useState<UseFormState<T>["errors"]>(
    formState.errors
  );

  const register: UseFormRegister<T> = useCallback(
    (name) => {
      return {
        name,
        error: errors?.[name],
        disabled: isFormPending,
        defaultValue: formState.values[name],
        onChange: (e) => {
          e.preventDefault();
          if (!errors?.[name]) return;
          setErrors((prev) => ({
            ...prev,
            [name]: "",
          }));
        },
      };
    },
    [formState, errors, isFormPending]
  );

  useEffect(() => {
    setErrors(formState.errors);
  }, [formState.errors]);

  return {
    register,
    formState,
    formAction,
    isFormPending,
  };
}
