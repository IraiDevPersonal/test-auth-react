import { IconChevronDown } from "@/components/icons/IconChevronDown";
import { cn } from "@/config/tailwind-merge.adapter";
import { useId } from "react";
import { InputHelperText, InputRootWrapper } from "../Input";
import { Label } from "../Label";
import { SelectNativeFieldProps, SelectNativeProps } from "./types";

export function SelectNative({
  className,
  children,
  options,
  ref,
  ...props
}: SelectNativeProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "peer inline-flex w-full cursor-pointer appearance-none items-center rounded-lg border text-sm text-foreground shadow-black/5 transition-shadow focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-[option[disabled]:checked]:text-muted-foreground border-transparent bg-muted shadow-none",
          props.multiple
            ? "py-1 [&>*]:px-3 [&>*]:py-1 [&_option:checked]:bg-accent"
            : "h-9 pe-8 ps-3",
          className
        )}
        ref={ref}
        {...props}
      >
        {children ??
          options?.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
      </select>
      {!props.multiple && (
        <span className="absolute inset-y-0 flex items-center justify-center h-full pointer-events-none end-0 w-9 text-muted-foreground/80 peer-disabled:opacity-50">
          <IconChevronDown size={16} strokeWidth={2} aria-hidden="true" />
        </span>
      )}
    </div>
  );
}

function SelectNativeField({
  label,
  error,
  message,
  ...props
}: SelectNativeFieldProps) {
  const id = useId();

  return (
    <InputRootWrapper>
      {label && <Label htmlFor={props.id || id}>{label}</Label>}
      <SelectNative id={id} {...props} />
      <InputHelperText error={error} message={message} />
    </InputRootWrapper>
  );
}

SelectNative.Field = SelectNativeField;
