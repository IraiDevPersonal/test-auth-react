import { LoginForm } from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const { loginAction } = useLogin();

  return (
    <main className="min-h-screen w-full grid place-content-center">
      <form
        className="p-4 border border-black w-max rounded-xl flex flex-col gap-y-4"
        action={loginAction}
      >
        <h1 className="text-2xl font-bold">Login Form</h1>
        <LoginForm />
      </form>
    </main>
  );
};

export default LoginPage;
