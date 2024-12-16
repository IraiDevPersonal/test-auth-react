import { useAuthContext } from "../context/Auth.context";

export const Logout = () => {
  const { logoutUser } = useAuthContext();
  return (
    <button
      className="p-4 hover:bg-gray-200 transition-colors"
      onClick={logoutUser}
    >
      Cerrar Sesion
    </button>
  );
};
