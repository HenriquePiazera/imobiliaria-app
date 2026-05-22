import { z } from "zod";

export const clientSchema = z.object({
  name: z
    .string()
    .min(3, "Nome muito curto"),

  email: z
    .email("Email inválido"),

  phone: z
    .string()
    .min(8, "Telefone inválido"),
});

export type ClientFormData =
  z.infer<typeof clientSchema>;