import { LoginForm } from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const { formAction, register } = useLogin();

  return (
    <main className="grid w-full min-h-screen place-content-center">
      <form
        className="flex flex-col p-4 border border-black w-max rounded-xl gap-y-4"
        action={formAction}
      >
        <h1 className="text-2xl font-bold">Login Form</h1>
        <LoginForm register={register} />
      </form>
    </main>
  );
};

export default LoginPage;
