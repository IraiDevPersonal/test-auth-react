import { ICON } from "@/config/sizes";
import { Lock, LucideProps } from "lucide-react";

type Props = LucideProps & React.RefAttributes<SVGSVGElement>;

export const IconLock: React.FC<Props> = ({
  size = ICON.SIZE,
  strokeWidth = ICON.STROKE_WIDTH,
  ...props
}) => {
  return (
    <Lock size={size} strokeWidth={strokeWidth} aria-hidden="true" {...props} />
  );
};
