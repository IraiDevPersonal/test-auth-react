import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Correo no valido").min(5, "Minimo 5 caracteres"),
  password: z.string().min(6, "Minimo 6 caracteres"),
});

export type AuthLoginPayload = z.infer<typeof authSchema>;
