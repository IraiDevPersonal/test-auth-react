import { Root } from "@radix-ui/react-checkbox";

export type CheckboxProps = {
  ref?: React.Ref<HTMLButtonElement>;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof Root>;

export type CheckboxFieldProps = {
  label?: string;
} & CheckboxProps;
