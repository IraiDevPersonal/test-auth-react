import { useId, useState } from "react";
import { cn } from "@/config/tailwind-merge.adapter";
import { Label } from "../ui/Label";
import { InputPasswordProps, InputProps } from "./types";
import { Eye, EyeOff } from "lucide-react";

export default function Input({ ref, type, className, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "peer flex h-9 w-full rounded-lg border border-transparent px-3 py-2 bg-muted/60 text-sm text-foreground shadow-sm shadow-shadow/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
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

Input.Password = function InputPassWord({
  label,
  error,
  ...props
}: InputPasswordProps) {
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="space-y-1.5">
      {label && <Label htmlFor={props.id ?? id}>{label}</Label>}

      <div className="relative">
        <Input id={id} type={isVisible ? "text" : "password"} {...props} />

        <button
          type="button"
          aria-controls="password"
          aria-pressed={isVisible}
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isVisible ? (
            <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>

      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-1.5 text-xs text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
};

// {startContent && (
//   <div
//     className={cn(
//       classNames?.startContent || styles.input__start_content
//     )}
//   >
//     {startContent}
//   </div>
// )}

// {endContent && (
//   <div
//     className={cn(classNames?.endContent || styles.input__end_content)}
//   >
//     {endContent}
//   </div>
// )}
