import { ICON } from "@/config/sizes";
import { Eye, LucideProps } from "lucide-react";

type Props = LucideProps & React.RefAttributes<SVGSVGElement>;

export const IconEye: React.FC<Props> = ({
  size = ICON.SIZE,
  strokeWidth = ICON.STROKE_WIDTH,
  ...props
}) => {
  return (
    <Eye size={size} strokeWidth={strokeWidth} aria-hidden="true" {...props} />
  );
};
