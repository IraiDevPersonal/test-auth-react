export type InputProps = React.ComponentProps<"input"> & {
  ref?: React.RefObject<HTMLInputElement | null>;
};
export interface InputPasswordProps extends Omit<InputProps, "type"> {
  label?: React.ReactNode;
  error?: string;
}
