import { useCallback, useState } from "react";
import { UserEntity } from "../entities/user.entity";
import { AuthContext, SetAuthPayload } from "./Auth.context";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = useCallback((payload: SetAuthPayload) => {
    setUser(payload.user);
    setIsAuthenticated(payload.isAuthenticated);
  }, []);

  return (
    <AuthContext value={{ user, isAuthenticated, setAuth }}>
      {children}
    </AuthContext>
  );
};
