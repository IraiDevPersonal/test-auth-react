import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./Auth.context";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const value = useAuth();

  return <AuthContext value={value}>{children}</AuthContext>;
};
