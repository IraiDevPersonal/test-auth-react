import { LoginForm } from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const { loginAction } = useLogin();

  return (
    <main className="grid w-full min-h-screen place-content-center">
      <form
        className="flex flex-col p-4 border border-black w-max rounded-xl gap-y-4"
        action={loginAction}
      >
        <h1 className="text-2xl font-bold">Login Form</h1>
        <LoginForm />
      </form>
    </main>
  );
};

export default LoginPage;
