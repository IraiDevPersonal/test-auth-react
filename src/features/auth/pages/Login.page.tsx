import { useActionState } from "react";
import { useAuthContext } from "../context/Auth.context";
import { LoginForm } from "../components/LoginForm";

const LoginPage = () => {
  const { loginUser } = useAuthContext();

  const [, formAction] = useActionState(
    async (_: unknown, formData: FormData) => {
      await loginUser(formData);
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
        <LoginForm />
      </form>
    </main>
  );
};

export default LoginPage;
