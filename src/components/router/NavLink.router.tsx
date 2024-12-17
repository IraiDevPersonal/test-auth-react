import { RoutePaths } from "@/config/routes";
import { routerExpandPath } from "@/utils/helpers.util";
import { NavLink, NavLinkProps } from "react-router-dom";

interface Props extends Omit<NavLinkProps, "to"> {
  to: RoutePaths;
  expand?: string;
  ref?: React.Ref<HTMLAnchorElement>;
}

export const NavLinkRouter: React.FC<Props> = ({
  to,
  ref,
  expand,
  ...props
}) => {
  return <NavLink ref={ref} to={routerExpandPath(to, expand)} {...props} />;
};
