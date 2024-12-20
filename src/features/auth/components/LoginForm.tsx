import { IconMail } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLogin } from "../hooks/useLogin";

let count = 1;

export const LoginForm: React.FC = () => {
  const { formAction, register, isFormPending } = useLogin();
  console.log("render LoginForm: ", count++);
  return (
    <form className="flex flex-col gap-y-4" action={formAction}>
      <Input.Field
        label="Correo"
        className="ps-10"
        startContent={<IconMail />}
        {...register("email")}
      />

      <Input.Password showIcon label="Contraseña" {...register("password")} />

      <Button type="submit" disabled={isFormPending}>
        Login
      </Button>
    </form>
  );
};
