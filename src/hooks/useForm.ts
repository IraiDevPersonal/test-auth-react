import { Notification } from "@/config/notification";
import { formDataToObject } from "@/utils/helpers.util";
import {
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ZodObject, ZodRawShape } from "zod";

type Props<T extends object> = {
  fn: (props: T) => Promise<void>;
  schema: ZodObject<ZodRawShape>;
  initialState: UseFormState<T>;
  shouldResetFields?: boolean;
  shouldControlledErrors?: boolean;
};

export function useForm<T extends object>(props: Props<T>) {
  const { initialState, schema, shouldControlledErrors } = props;

  const [formState, formAction, isFormPending] = useActionState<
    UseFormState<T>,
    FormData
  >((prev, formData) => actionCallback(prev, formData, props), initialState);

  const [errors, setErrors] = useState<UseFormErrors<T>>(formState.errors);

  const memoizedSchemas = useMemo(() => {
    const subSchemas = new Map<keyof T, ReturnType<typeof schema.pick>>();
    return (name: keyof T) => {
      if (!subSchemas.has(name)) {
        subSchemas.set(name, schema.pick({ [name]: true } as const));
      }
      return subSchemas.get(name)!;
    };
  }, [schema]);

  const register: UseFormRegister<T> = useCallback(
    (name, options) => {
      const fieldSchema = memoizedSchemas(name);
      return {
        name,
        error: errors?.[name],
        disabled: isFormPending,
        defaultValue: options?.setValue ? undefined : formState.values[name],
        onChange: (e) => {
          e.preventDefault();

          const value = e.target.value;
          options?.setValue(value);

          if (!shouldControlledErrors) {
            setErrors((prevState) =>
              prevState?.[name]
                ? {
                    ...prevState,
                    [name]: "",
                  }
                : prevState
            );
            return;
          }

          const { success, error } = fieldSchema.safeParse({ [name]: value });

          if (success) {
            setErrors((prevState) =>
              prevState?.[name]
                ? {
                    ...prevState,
                    [name]: "",
                  }
                : prevState
            );
            return;
          }

          const entries = Object.entries(error.flatten().fieldErrors);
          const err = createErrorObject(entries);

          setErrors((prevState) => ({
            ...prevState,
            [name]: err[name as string],
          }));
        },
      };
    },
    [
      errors,
      isFormPending,
      formState.values,
      memoizedSchemas,
      shouldControlledErrors,
    ]
  );

  useEffect(() => {
    if (shouldControlledErrors) return;
    setErrors(formState.errors);
  }, [formState.errors, shouldControlledErrors]);

  return {
    register,
    formState,
    formAction,
    isFormPending,
  };
}

async function actionCallback<T extends object>(
  prev: UseFormState<T>,
  formData: FormData,
  options: Props<T>
): Promise<UseFormState<T>> {
  const { fn, schema, shouldResetFields } = options;
  try {
    const payload = formDataToObject<T>(formData);
    const { success, error } = schema.safeParse(payload);

    if (success) {
      await fn(payload);
      return {
        errors: undefined,
        values: shouldResetFields ? resetFields(payload) : payload,
      };
    }

    const entries = Object.entries(error.flatten().fieldErrors);
    const errors = createErrorObject(entries);
    return {
      values: payload,
      errors: errors as UseFormErrors<T>,
    };
  } catch (error) {
    Notification.error(`${error}`);
    return prev;
  }
}

function createErrorObject(entries: [string, string[] | undefined][]) {
  const errors = Object.fromEntries(
    entries.map(([key, value = []]) => [key, value.join(", ")])
  );

  return errors;
}

function resetFields<T extends object>(payload: T) {
  const obj: Record<string, any> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "boolean") {
      obj[key] = false;
    }

    if (typeof value === "string") {
      obj[key] = "";
    }

    if (typeof value === "number") {
      obj[key] = 0;
    }
  }
  return obj as T;
}

export type UseFormRegister<T extends object> = (
  name: keyof T,
  opts?: RegisterOptions
) => {
  error: Partial<Record<keyof T, string>>[keyof T] | undefined;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  defaultValue: T[keyof T] | undefined;
  disabled: boolean;
  name: keyof T;
};

export type UseFormState<T extends object> = {
  errors?: Partial<Record<keyof T, string>>;
  values: T;
};

type UseFormErrors<T extends object> = UseFormState<T>["errors"];

type RegisterOptions = { setValue: (value: string) => void };
