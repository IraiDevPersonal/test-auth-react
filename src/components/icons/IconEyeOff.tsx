import { ICON } from "@/config/sizes";
import { EyeOff, LucideProps } from "lucide-react";

type Props = LucideProps & React.RefAttributes<SVGSVGElement>;

export const IconEyeOff: React.FC<Props> = ({
  size = ICON.SIZE,
  strokeWidth = ICON.STROKE_WIDTH,
  ...props
}) => {
  return (
    <EyeOff
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      {...props}
    />
  );
};
