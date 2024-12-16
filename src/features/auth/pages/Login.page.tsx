import { useActionState } from "react";
import { useAuthContext } from "../context/Auth.context";
import { LoginUserPayload } from "../services/auth.service";
import { useFormStatus } from "react-dom";

const LoginPage = () => {
  const { loginUser } = useAuthContext();

  const [, formAction] = useActionState(
    async (_: unknown, queryData: FormData) => {
      const payload = Object.fromEntries(
        queryData.entries()
      ) as unknown as LoginUserPayload;
      await loginUser(payload);
    },
    null
  );
  const status = useFormStatus();

  return (
    <main className="min-h-screen w-full grid place-content-center">
      <form
        className="p-4 border border-black w-max rounded-xl space-y-2 flex flex-col"
        action={formAction}
        method="post"
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
          disabled={status.pending}
          className="p-4 rounded-lg bg-indigo-600 text-white disabled:bg-gray-400"
        >
          Login
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
