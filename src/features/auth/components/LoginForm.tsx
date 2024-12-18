import { IconMail } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useFormStatus } from "react-dom";

export const LoginForm = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <Input.Field
        type="email"
        name="email"
        label="Correo"
        disabled={pending}
        className="ps-10"
        startContent={<IconMail />}
      />

      <Input.Password
        showIcon
        name="password"
        label="Contraseña"
        disabled={pending}
      />

      <Button type="submit" disabled={pending}>
        Login
      </Button>
    </>
  );
};
