import { useId, useState } from "react";
import { cn } from "@/config/tailwind-merge.adapter";
import { Label } from "../Label";
import {
  InputPasswordProps,
  InputFieldProps,
  HelperTextProps,
  InputProps,
} from "./types";
import { IconEye, IconEyeOff, IconLock } from "../../icons";

export function Input({ ref, type, className, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "peer flex h-9 w-full rounded-lg border border-transparent px-3 py-2 bg-muted text-foreground shadow-sm shadow-shadow/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
        type === "search" &&
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none;",
        type === "file" &&
          "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground cursor-pointer file:cursor-pointer border-input",
        className
      )}
      {...props}
    />
  );
}

function InputField({
  startContent,
  endContent,
  message,
  label,
  error,
  ...props
}: InputFieldProps) {
  const id = useId();
  return (
    <RootWrapper>
      {label && (
        <Label className="block" htmlFor={props.id ?? id}>
          {label}
        </Label>
      )}

      <InputWrapper>
        <ContentWrapper content={startContent} className="start-0 ps-2" />
        <Input id={id} {...props} />
        <ContentWrapper content={endContent} className="end-0 pe-2" />
      </InputWrapper>

      <HelperText error={error} message={message} />
    </RootWrapper>
  );
}

function InputPassword({
  className,
  showIcon,
  label,
  error,
  ...props
}: InputPasswordProps) {
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <RootWrapper>
      {label && (
        <Label className="block" htmlFor={props.id ?? id}>
          {label}
        </Label>
      )}

      <InputWrapper>
        {showIcon && (
          <ContentWrapper className="start-0 ps-2" content={<IconLock />} />
        )}
        <Input
          id={id}
          className={cn("ps-10", className)}
          type={isVisible ? "text" : "password"}
          {...props}
        />

        <button
          type="button"
          aria-controls="password"
          aria-pressed={isVisible}
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isVisible ? <IconEyeOff /> : <IconEye />}
        </button>
      </InputWrapper>

      <HelperText error={error} />
    </RootWrapper>
  );
}

function HelperText({ error, message }: HelperTextProps) {
  return (
    <>
      {(message || error) && (
        <p
          role={error ? "alert" : "textbox"}
          aria-live="polite"
          className={cn("text-xs", error && "text-destructive")}
        >
          {message || error}
        </p>
      )}
    </>
  );
}

function RootWrapper(props: { children: React.ReactNode }) {
  return <div className="space-y-1.5" {...props} />;
}

function InputWrapper(props: { children: React.ReactNode }) {
  return <div className="relative" {...props} />;
}

function ContentWrapper({
  content,
  className,
}: {
  content?: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      {content && (
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 flex items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50",
            className
          )}
        >
          {content}
        </div>
      )}
    </>
  );
}

Input.Field = InputField;
Input.Password = InputPassword;
