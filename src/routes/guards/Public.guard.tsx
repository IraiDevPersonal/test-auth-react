import { AuthFallback } from "@/features/auth/components/AuthFallback";
import { useAuthContext } from "@/features/auth/context/Auth.context";
import { Navigate, Outlet } from "react-router-dom";

export const PublicLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <AuthFallback />;
  }

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};
