import { UserEntity } from "@/features/auth/entities/user.entity";
import { useRenew } from "@/features/auth/hooks/useRenew";
import { Outlet } from "react-router-dom";

interface Props {
  renewUser: Promise<UserEntity | null>;
}

let count = 1;

export const AuthValidationLayout: React.FC<Props> = ({ renewUser }) => {
  useRenew(renewUser);
  console.log("render AuthValidationLayout", count++);

  return <Outlet />;
};
