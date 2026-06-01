import { z } from "zod";

export const clientSchema = z.object({
  name: z
    .string()
    .min(3, "Nome obrigatório"),

  email: z
    .string()
    .email("E-mail inválido"),

  phone: z
    .string()
    .min(8, "Telefone obrigatório"),

  document: z
    .string()
    .min(11, "Documento obrigatório"),

  city: z
    .string()
    .min(2, "Cidade obrigatória"),

  state: z
    .string()
    .min(2, "Estado obrigatório"),

  address: z
    .string()
    .min(5, "Endereço obrigatório"),

  status: z.enum([
    "lead",
    "client",
    "inactive",
  ]),

  notes: z.string().optional(),
});

export type ClientFormData =
  z.infer<typeof clientSchema>;