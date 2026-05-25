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

  document: z
    .string()
    .min(11, "CPF inválido"),

  city: z
    .string()
    .min(2, "Cidade inválida"),

  state: z
    .string()
    .min(2, "Estado inválido"),

  address: z
    .string()
    .min(5, "Endereço inválido"),

  notes: z
    .string()
    .optional(),

  status: z.enum([
    "lead",
    "service",
    "proposal",
    "closed",
    "lost",
  ]),
});

export type ClientFormData =
  z.infer<typeof clientSchema>;