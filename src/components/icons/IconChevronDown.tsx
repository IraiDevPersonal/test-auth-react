import { ICON } from "@/config/sizes";
import { ChevronDown, LucideProps } from "lucide-react";

type Props = LucideProps & React.RefAttributes<SVGSVGElement>;

export const IconChevronDown: React.FC<Props> = ({
  size = ICON.SIZE,
  strokeWidth = ICON.STROKE_WIDTH,
  ...props
}) => {
  return (
    <ChevronDown
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      {...props}
    />
  );
};
