import { createContext, use } from "react";
import { UserEntity } from "../entities/user.entity";

interface ContextProps {
  isLoading: boolean;
  user: UserEntity | null;
  isAuthenticated: boolean;
  logoutUser(): Promise<void>;
  loginUser(payload: FormData): Promise<void>;
}

export const AuthContext = createContext<ContextProps | undefined>(undefined);

export const useAuthContext = () => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("Estas queriendo acceder al contexto fuera de su provider");
  }

  return context;
};
