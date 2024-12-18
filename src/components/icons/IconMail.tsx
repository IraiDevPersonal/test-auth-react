import { ICON } from "@/config/sizes";
import { Mail, LucideProps } from "lucide-react";

type Props = LucideProps & React.RefAttributes<SVGSVGElement>;

export const IconMail: React.FC<Props> = ({
  size = ICON.SIZE,
  strokeWidth = ICON.STROKE_WIDTH,
  ...props
}) => {
  return (
    <Mail size={size} strokeWidth={strokeWidth} aria-hidden="true" {...props} />
  );
};
