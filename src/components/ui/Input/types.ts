export type InputProps = React.ComponentProps<"input"> & {
  ref?: React.Ref<HTMLInputElement | null>;
};
export type InputPasswordProps = {
  label?: React.ReactNode;
  showIcon?: boolean;
} & Omit<InputProps, "type"> &
  Pick<HelperTextProps, "error">;

export type InputFieldProps = {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  label?: React.ReactNode;
  error?: string;
} & InputProps &
  HelperTextProps;

export type HelperTextProps = {
  error?: string;
  message?: string;
};
