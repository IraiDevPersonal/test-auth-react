import { IconMail } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { useFormStatus } from "react-dom";

export const LoginForm = () => {
  const { pending } = useFormStatus();
  console.log({ pending });
  return (
    <>
      <Checkbox.Field name="checkbox" label="Click me" />
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
        Login {pending && "Loading..."}
      </Button>
    </>
  );
};
