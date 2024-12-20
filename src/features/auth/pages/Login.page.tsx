import { LoginForm } from "../components/LoginForm";

let count = 1;

const LoginPage = () => {
  console.log("render count: ", count++);

  return (
    <main className="grid w-full min-h-screen place-content-center">
      <div className="p-4 border border-black w-max rounded-xl">
        <h1 className="mb-4 text-2xl font-bold">Login Form</h1>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
