import { AuthLoader } from "@/features/auth/components/AuthLoader";
import { useAuthContext } from "@/features/auth/context/Auth.context";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <AuthLoader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
