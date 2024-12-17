import { RoutePaths } from "@/config/routes";
import { routerExpandPath } from "@/utils/helpers.util";
import { Link, LinkProps } from "react-router-dom";

interface Props extends Omit<LinkProps, "to"> {
  to: RoutePaths;
  expand?: string;
  ref?: React.Ref<HTMLAnchorElement>;
}

export const LinkRouter: React.FC<Props> = ({ to, ref, expand, ...props }) => {
  return <Link ref={ref} to={routerExpandPath(to, expand)} {...props} />;
};
