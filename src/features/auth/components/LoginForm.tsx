import { IconMail } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UseFormRegister } from "@/hooks";
import { useFormStatus } from "react-dom";
import { AuthLoginPayload } from "../models/auth.model";

type Props = {
  register: UseFormRegister<AuthLoginPayload>;
};

export const LoginForm: React.FC<Props> = ({ register }) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Input.Field
        label="Correo"
        className="ps-10"
        startContent={<IconMail />}
        {...register("email")}
      />

      <Input.Password showIcon label="Contraseña" {...register("password")} />

      <Button type="submit" disabled={pending}>
        Login {pending && "Loading..."}
      </Button>
    </>
  );
};
