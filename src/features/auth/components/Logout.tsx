import { useLogout } from "../hooks/useLogout";

export const Logout = () => {
  const { isLoading, handleLogout } = useLogout();
  return (
    <button
      disabled={isLoading}
      className="p-4 hover:bg-gray-200 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
      onClick={handleLogout}
    >
      Cerrar Sesion
    </button>
  );
};
