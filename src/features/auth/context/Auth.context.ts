import { createContext, use } from "react";
import { UserEntity } from "../entities/user.entity";

export type SetAuthPayload = {
  user: UserEntity | null;
  isAuthenticated: boolean;
};

interface ContextProps {
  user: UserEntity | null;
  isAuthenticated: boolean;
  setAuth: (payload: SetAuthPayload) => void;
}

export const AuthContext = createContext<ContextProps | undefined>(undefined);

export const useAuthContext = () => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("Estas queriendo acceder al contexto fuera de su provider");
  }

  return context;
};
