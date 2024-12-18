import * as React from "react";
import { cn } from "@/config/tailwind-merge.adapter";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
interface Props extends LabelProps {
  ref?: React.Ref<HTMLLabelElement | null>;
}

export const Label: React.FC<Props> = ({ className, ref, ...props }) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-4 text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
};

Label.displayName = "Label";
