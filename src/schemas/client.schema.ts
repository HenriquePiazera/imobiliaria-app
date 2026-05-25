import { z } from "zod";

export const clientSchema =
  z.object({
    name: z
      .string()
      .min(
        3,
        "Nome muito curto"
      ),

    email: z
      .email("Email inválido"),

    phone: z
      .string()
      .min(
        8,
        "Telefone inválido"
      ),

    cpf: z
      .string()
      .optional(),

    city: z
      .string()
      .optional(),

    state: z
      .string()
      .optional(),

    address: z
      .string()
      .optional(),

    notes: z
      .string()
      .optional(),
  });

export type ClientFormData =
  z.infer<typeof clientSchema>;