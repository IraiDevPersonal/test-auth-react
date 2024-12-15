import React, { useId } from "react";
import { cn } from "@/config/tailwind-merge.adapter";
import { Label } from "./Label";

type InputProps = React.ComponentProps<"input">;
interface Props extends InputProps {
  ref?: React.RefObject<HTMLInputElement | null>;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  classNames?: Partial<{
    startContent: string;
    endContent: string;
  }>;
  label?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<Props> = ({
  ref,
  type,
  label,
  error,
  className,
  classNames,
  endContent,
  startContent,
  ...props
}) => {
  const id = useId();
  return (
    <div className="space-y-1.5">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        {startContent && (
          <div
            className={cn(
              classNames?.startContent ||
                "pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50"
            )}
          >
            {startContent}
          </div>
        )}
        <input
          id={id}
          type={type}
          className={cn(
            "flex h-9 w-full rounded-lg border border-transparent px-3 py-2 bg-muted/60 text-sm text-foreground shadow-sm shadow-shadow/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 peer",
            type === "search" &&
              "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
            type === "file" &&
              "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground cursor-pointer file:cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        />
        {endContent && (
          <div
            className={cn(
              classNames?.endContent ||
                "pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50"
            )}
          >
            {endContent}
          </div>
        )}
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
Input.displayName = "Input";
