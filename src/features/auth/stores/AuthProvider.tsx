import { createContext, PropsWithChildren, use } from "react";
import { UserEntity } from "../entities/user.entity";
import { useAuth } from "../hooks/useAuth";
import { AuthLoginPayload } from "../models/auth.model";

interface ContextProps {
  isLoading: boolean;
  user: UserEntity | null;
  isAuthenticated: boolean;
  logoutUser(): Promise<void>;
  loginUser(payload: AuthLoginPayload): Promise<void>;
}

const AuthContext = createContext<ContextProps | undefined>(undefined);

export default function AuthProvider({ children }: PropsWithChildren) {
  const value = useAuth();
  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuthContext() {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("Estas queriendo acceder al contexto fuera de su provider");
  }
  return context;
}
