import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const PublicLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};
