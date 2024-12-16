import { useFormStatus } from "react-dom";

export const LoginForm = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <label htmlFor="email">Correo</label>
      <input
        id="email"
        type="email"
        name="email"
        disabled={pending}
        className="p-2 rounded-lg bg-neutral-100 disabled:bg-gray-200 disabled:text-gray-400"
      />

      <label htmlFor="password">Contraseña</label>
      <input
        type="text"
        id="password"
        name="password"
        disabled={pending}
        className="p-2 rounded-lg bg-neutral-100 disabled:bg-gray-200 disabled:text-gray-400"
      />

      <button
        type="submit"
        disabled={pending}
        className="p-4 rounded-lg bg-indigo-600 text-white disabled:bg-gray-400"
      >
        Login
      </button>
    </>
  );
};
