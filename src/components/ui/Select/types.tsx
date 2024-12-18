import { InputHelperTextProps } from "../Input/types";

export type SelectNativeProps = {
  children?: React.ReactNode;
  options?: SelectNativeOption[];
  ref?: React.Ref<HTMLSelectElement>;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export type SelectNativeFieldProps = {
  label?: React.ReactNode;
} & SelectNativeProps &
  InputHelperTextProps;

export type SelectNativeOption = {
  value: string | number;
  label: string;
};
