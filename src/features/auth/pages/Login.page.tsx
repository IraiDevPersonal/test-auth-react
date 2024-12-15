import { useActionState } from "react";
import { useAuth } from "../hooks/useAuth";
import { LoginUserPayload } from "../services/auth.service";

const LoginPage = () => {
  const { loginUser } = useAuth();

  const [, formAction] = useActionState(
    async (prev: unknown, queryData: FormData) => {
      const payload = Object.fromEntries(
        queryData.entries()
      ) as unknown as LoginUserPayload;
      await loginUser?.(payload);
      console.log({ prev });
    },
    null
  );

  return (
    <main className="min-h-screen w-full grid place-content-center">
      <form
        className="p-4 border border-black w-max rounded-xl space-y-2 flex flex-col"
        action={formAction}
      >
        <h1 className="text-2xl font-bold">Login Form</h1>

        <label htmlFor="email">Correo</label>
        <input
          id="email"
          type="email"
          name="email"
          className="p-2 rounded-lg bg-neutral-200"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="text"
          id="password"
          name="password"
          className="p-2 rounded-lg bg-neutral-200"
        />

        <button
          type="submit"
          className="p-4 rounded-lg bg-indigo-600 text-white"
        >
          Login
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
